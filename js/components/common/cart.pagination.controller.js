/* Cartwheel App creation:
 *  This defines the Angular application which defines the dependent modules.
 *  This app depends on the following:
 */

/* Pagenation controller : for pagination purpose
 * For dashboard Cards and also data table tree view
 *
 */
(function () {
    'use strict';
    angular.module(cartAppObj.id)

            .directive('ripple', function () {
                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        var parent, ink, d, x, y;

                        angular.element(element).find('>li>a').click(function (e) {
                            parent = angular.element(this).parent();

                            if (parent.find('.ink').length === 0) {
                                parent.prepend('<span class="ink"></span>');
                            }

                            ink = parent.find('.ink');
                            //incase of quick double clicks stop the previous animation
                            ink.removeClass('animate');

                            //set size of .ink
                            if (!ink.height() && !ink.width())
                            {
                                //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
                                d = Math.max(parent.outerWidth(), parent.outerHeight());
                                ink.css({height: d, width: d});
                            }

                            //get click coordinates
                            //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
                            x = e.pageX - parent.offset().left - ink.width() / 2;
                            y = e.pageY - parent.offset().top - ink.height() / 2;

                            //set the position and add class .animate
                            ink.css({top: y + 'px', left: x + 'px'}).addClass('animate');

                            setTimeout(function () {
                                angular.element('.ink').remove();
                            }, 600);
                        });
                    }
                };
            })
            .directive('navCollapse', function ($timeout) {
                return {
                    restrict: 'A',
                    link: function ($scope, $el) {

                        $timeout(function () {

                            var $dropdowns = $el.find('ul').parent('li'),
                                    $a = $dropdowns.children('a'),
                                    $notDropdowns = $el.children('li').not($dropdowns),
                                    $notDropdownsLinks = $notDropdowns.children('a'),
                                    app = angular.element('.appWrapper'),
                                    sidebar = angular.element('#sidebar'),
                                    controls = angular.element('#controls');

                            $dropdowns.addClass('dropdown');

                            var $submenus = $dropdowns.find('ul >.dropdown');
                            $submenus.addClass('submenu');

                            $a.append('<i class="fa fa-plus"></i>');

                            $a.on('click', function (event) {
                                if (app.hasClass('sidebar-sm') || app.hasClass('sidebar-xs') || app.hasClass('hz-menu')) {
                                    return false;
                                }

                                var $this = angular.element(this),
                                        $parent = $this.parent('li'),
                                        $openSubmenu = angular.element('.submenu.open');

                                if (!$parent.hasClass('submenu')) {
                                    $dropdowns.not($parent).removeClass('open').find('ul').slideUp();
                                }

                                $openSubmenu.not($this.parents('.submenu')).removeClass('open').find('ul').slideUp();
                                $parent.toggleClass('open').find('>ul').stop().slideToggle();
                                event.preventDefault();
                            });

                            $dropdowns.on('mouseenter', function () {
                                sidebar.addClass('dropdown-open');
                                controls.addClass('dropdown-open');
                            });

                            $dropdowns.on('mouseleave', function () {
                                sidebar.removeClass('dropdown-open');
                                controls.removeClass('dropdown-open');
                            });

                            $notDropdownsLinks.on('click', function () {
                                $dropdowns.removeClass('open').find('ul').slideUp();
                            });

                            var $activeDropdown = angular.element('.dropdown>ul>.active').parent();

                            $activeDropdown.css('display', 'block');
                        });

                    }
                };
            })
            .directive('collapseSidebar', function ($rootScope) {
                return {
                    restrict: 'A',
                    link: function postLink(scope, element) {

                        var app = angular.element('.appWrapper'),
                                $window = angular.element(window),
                                width = $window.width();

                        var removeRipple = function () {
                            angular.element('#sidebar').find('.ink').remove();
                        };

                        var collapse = function () {

                            width = $window.width();

                            if (width < 992) {
                                app.addClass('sidebar-sm');
                            } else {
                                app.removeClass('sidebar-sm sidebar-xs');
                            }

                            if (width < 768) {
                                app.removeClass('sidebar-sm').addClass('sidebar-xs');
                            } else if (width > 992) {
                                app.removeClass('sidebar-sm sidebar-xs');
                            } else {
                                app.removeClass('sidebar-xs').addClass('sidebar-sm');
                            }

                            if (app.hasClass('sidebar-sm-forced')) {
                                app.addClass('sidebar-sm');
                            }

                            if (app.hasClass('sidebar-xs-forced')) {
                                app.addClass('sidebar-xs');
                            }

                        };

                        collapse();

                        $window.resize(function () {
                            if (width !== $window.width()) {
                                var t;
                                clearTimeout(t);
                                t = setTimeout(collapse, 300);
                                removeRipple();
                            }
                        });

                        element.on('click', function (e) {
                            if (app.hasClass('sidebar-sm')) {
                                app.removeClass('sidebar-sm');
                                element.find('.fa').removeClass('fa-indent').addClass('fa-dedent');
//                        } else if (app.hasClass('sidebar-xs')) {
//                            app.removeClass('sidebar-xs');
                            } else {
                                app.addClass('sidebar-sm');
                                element.find('.fa').removeClass('fa-dedent').addClass('fa-indent');

                            }

                            app.removeClass('sidebar-sm-forced sidebar-xs-forced');
                            // app.parent().removeClass('sidebar-sm');
                            removeRipple();
                            e.preventDefault();
                        });

                    }
                };
            })

            .directive('slimscroll', function () {
                return {
                    restrict: 'A',
                    link: function ($scope, $elem, $attr) {
                        var off = [];
                        var option = {};

                        var refresh = function () {
                            if ($attr.slimscroll) {
                                option = $scope.$eval($attr.slimscroll);
                            } else if ($attr.slimscrollOption) {
                                option = $scope.$eval($attr.slimscrollOption);
                            }

                            angular.element($elem).slimScroll({destroy: true});

                            angular.element($elem).slimScroll(option);
                        };

                        var registerWatch = function () {
                            if ($attr.slimscroll && !option.noWatch) {
                                off.push($scope.$watchCollection($attr.slimscroll, refresh));
                            }

                            if ($attr.slimscrollWatch) {
                                off.push($scope.$watchCollection($attr.slimscrollWatch, refresh));
                            }

                            if ($attr.slimscrolllistento) {
                                off.push($scope.$on($attr.slimscrolllistento, refresh));
                            }
                        };

                        var destructor = function () {
                            angular.element($elem).slimScroll({destroy: true});
                            off.forEach(function (unbind) {
                                unbind();
                            });
                            off = null;
                        };

                        off.push($scope.$on('$destroy', destructor));

                        registerWatch();
                    }
                };
            })

            .controller('PagenationCtrl', PagenationCtrl)
            .filter('myLimitTo', [function () {
                    return function (obj, limit) {
                        if (obj) {
                            var keys = Object.keys(obj);
                            if (keys.length < 1) {
                                return [];
                            }

                            var ret = new Object,
                                    count = 0;
                            angular.forEach(keys, function (key, arrayIndex) {
                                if (count >= limit) {
                                    return false;
                                }
                                ret[key] = obj[key];
                                count++;
                            });
                            return ret;
                        }
                    };
                }])
            .filter('pagination', function () {
                return function (input, start) {
                    start = +start;
                    if (input) {
                        // console.log(input);
                        var array = $.map(input, function (value, index) {
                            return [value];
                        });
                        return array.slice(start);
                    }
                }
            })
            .filter('cardFilter', function () {
                return function (objects, criteria) {
                    var filterResult = new Array();
                    if (!criteria)
                        return objects;
                    criteria = criteria.toLowerCase();
                    angular.forEach(objects, function (value, key) {
                        var keepGoing = true;
                        angular.forEach(value, function (value2, key2) {
                            if (keepGoing) {
                                if (value2.toString().toLowerCase().indexOf(criteria) != -1) {
                                    //console.log(key2, value2, criteria);
                                    filterResult.push(value);
                                    keepGoing = false;
                                }
                            }
                        })
                    });
                    // console.log(filterResult);
                    return filterResult;
                }
            });
    PagenationCtrl.$inject = ['$scope', '$timeout'];
    function PagenationCtrl($scope, $timeout) {
        var pageModel = this;
        $scope.pageModel = {};
        $scope.pageModel.dataLength = {};
        $scope.pageModel.itemsPerPage = 5;
        $scope.pageModel.currentPage = 0;
        $scope.pageModel.panelFliped = false;
        $scope.pageModel.dataLengthCount = dataLengthCount;
//for dashboard page
        $scope.pageModel.activeCard = setActiveCard;
        $scope.isActiveCard = activeCard;
        $scope.pageModel.viewed = new Array;

        Object.size = function (obj) {
            var size = 0,
                    key;
            for (key in obj) {
                if (obj.hasOwnProperty(key))
                    size++;
            }
            return size;
        };


        function setActiveCard(cardId) {
            this.cardId = true;
        }


        function activeCard(activeCard) {
            return activeCard == $scope.currentTab;
        }
        // Get the size of an object

        dataLengthCount($scope.appArray);

        function dataLengthCount(data) {
            $scope.pageModel.dataLength = Object.size(data);
            if ($scope.pageModel.dataLength > 2)
                countTotalPage();
        }
        $scope.pageModel.alertData = function (data, cardId) {
            $scope.stickyCard = '';
            $scope.pageModel.currentCard = cardId;
            $scope.pageModel.viewed[cardId] = true;
            $timeout(function () {
                $scope.stickyCard = data;
            }, 500);

        };
        function countTotalPage() {

            $scope.pageModel.totalPage = Math.ceil($scope.pageModel.dataLength / $scope.pageModel.itemsPerPage);
            $scope.pageModel.numberOfPages = function () {

                window.setTimeout(function () { //wait for 'filtered' to be changed
                    /* change pagination with $scope.filtered */
                    $scope.pageModel.totalPage = Math.ceil($scope.pageModel.dataLength / $scope.pageModel.itemsPerPage);
                }, 500);

            }
        }



    };

})();
