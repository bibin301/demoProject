/* all common directives shared across the projectec listed here */

/**
 * @desc scroll directive
 * @example <div scroll></div> used in home.menu.tpl.html
 */
angular
        .module(cartAppObj.id)
        .directive('scroll', scroll);


function scroll($window) {
    /* implementation details */

    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            var lastId,
                    topMenu = $("#menu"),
                    topMenuHeight = topMenu.outerHeight(),
                    // All list items
                    menuItems = topMenu.find("a"),
                    // Anchors corresponding to menu items
                    scrollItems = menuItems.map(function () {
                        var item = $($(this).attr("href"));
                        if (item.length) {
                            return item;
                        }
                    });

            $(window).scroll(function () {
                // Get container scroll position
                var fromTop = $(this).scrollTop() + 350;

                // Get id of current scroll item
                var cur = scrollItems.map(function () {
                    if ($(this).offset().top < fromTop)
                        return this;
                });
                // Get the id of the current element
                cur = cur[cur.length - 1];
                var id = cur && cur.length ? cur[0].id : "";

                if (lastId !== id) {
                    lastId = id;
                    // Set/remove active class
                    menuItems
                            .parent().removeClass("menu-active")
                            .end().filter("[href=#" + id + "]").parent().addClass("menu-active");
                }
            });

            scope.$apply();
        });
    };
}


/* all common directives shared across the projectec listed here */

/**
 * @desc LockScreen Directive
 * @example <div lock-screen></div> used in home.menu.tpl.html
 */
angular
        .module(cartAppObj.id)
        .directive('lockScreen', lockScreen);


function lockScreen() {
    return {
        restrict: 'A',
        replace: true,
        scope: true,
        link: function postLink(scope, iElement, iAttrs) {
            console.log(scope.appModel);
            $(document).on('keypress', function (e) {
                if (e.which === 76)
                    scope.$apply(scope.appModel.locked());
            });
        }
    };
}

/**
 * @desc Focus Directive
 * @example <input ui-focus /> used in login.modal.tpl.html
 *          <input ui-focus focus-delay="500" />
 */

angular
        .module(cartAppObj.id)
        .directive('uiFocus', uiFocus);

uiFocus.$inject = ['$timeout'];
function uiFocus($timeout) {

    return {
        restrict: 'A',
        link: link
    };


    function link($scope, $element, $attrs) {

        var dom = $element[0];
        if ($attrs.uiFocus) {
            $scope.$watch($attrs.uiFocus, focus);
        } else {
            focus(true);
        }

        function focus(condition) {
            if (condition) {
                $timeout(function () {
                    dom.focus();
                }, $scope.$eval($attrs.focusDelay) || 0);
            }
        }
    }
}


/**
 * @desc Focus Directive
 * @example <input ui-focus /> used in login.modal.tpl.html
 *          <input ui-focus focus-delay="500" />
 */

angular
        .module(cartAppObj.id)
        .directive('animateOnChange', animateOnChange);

animateOnChange.$inject = ['$animate', '$timeout'];
function animateOnChange($animate, $timeout) {

    return {
        restrict: 'A',
        link: animateFunc
    };

    function animateFunc(scope, elem, attr) {
        scope.$watch(attr.animateOnChange, function (nv, ov) {
            var c = "animate-show";
            if (nv != ov) {
                //alert(c);
                $animate.addClass(elem, c).then(function () {
                    $timeout(function () {
                        $animate.removeClass(elem, c)
                    });
                });
            }
        })
    }
}
;


/**
 * @desc Focus Directive
 * @example <div panel-control /> used in login.modal.tpl.html
 *          <div panel-control />
 * Author:Muthu
 * @Desc : Trail and error need some changes for panels 
 */
/**
 angular
 .module(cartAppObj.id)
 .directive('panelControl', panelControl);
 
 panelControl.$inject = ['$animate', '$timeout'];
 function panelControl($animate, $timeout) {
 
 return {
 restrict: 'A',
 link: controlFunc
 };
 
 function controlFunc(scope, elem, attr) {
 
 
 
 elem.on('click', ':first', function () {
 
 var el = $(this).parent(".panel").children(".panel-body");
 if ($(this).children(".glyphicon").hasClass("glyphicon-chevron-up")) {
 
 $(this).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
 el.slideUp(200);
 
 } else {
 $(this).children(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
 
 }
 
 
 
 });
 
 }
 }
 
 */

angular.module(cartAppObj.id)
        .controller('panelCtrl', panelCtrl);
panelCtrl.$inject = ['$scope', '$timeout'];
function panelCtrl($scope, $timeout) {
    $scope.panelModel = {};
}
 