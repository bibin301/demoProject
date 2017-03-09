/* Cartwheel App creation:
 *  This defines the Angular application which defines the dependent modules.
 *  This app depends on the following:
 *  -
 * Dependencies: This needs to be called after angular.js is included and first
 *               js of the cartwheel specific js code
 *               jquery.js
 *               angular.js
 *               cartwheel_app.js
 */

/* Home controller : index.html */

(function() {
    'use strict';

    angular.module(cartAppObj.id)
        .controller('CartHomeCtrl', CartHomeCtrl);


    CartHomeCtrl.$inject = ['$rootScope', '$scope', '$modal', '$timeout', '$location', 'CartAuthSrv', 'CartHomeSrv'];
    function CartHomeCtrl  ( $rootScope,   $scope,   $modal,   $timeout,   $location,   CartAuthSrv,   CartHomeSrv) {

        var homeModel = this;
        var basepath  = $rootScope.cartAppObj.componentBasePath + "/home/";
		var commonpath = $rootScope.cartAppObj.sharedBasePath;


        $scope.homeModel = {};
        $scope.homeModel.cartapp     = {}; // Application configuration
        $scope.homeModel.status      = {}; // Holds the status of page
        $scope.homeModel.sectiondata = {}; // Data for each section of home page
        $scope.homeModel.template    = {}; // Holds the template page filenames


        // Methods to support HomeController Functionalities
        //$scope.homeModel.gotoSection      = gotoSection;
        $scope.homeModel.setTheme         = setTheme;
        //$scope.homeModel.showModalLogin   = showModalLogin;
        $scope.homeModel.showModalApp     = showModalApp;
        $scope.homeModel.showModalDept    = showModalDept;
        $scope.homeModel.showModalAlbum   = showModalAlbum;
        $scope.homeModel.showModalStories = showModalStories;
        $scope.homeModel.logout           = logout;
        $scope.homeModel.isAuth           = isAuth;
        $scope.homeModel.isLogged         = isLogged;
        $scope.homeModel.loadData         = loadData;
        $scope.homeModel.hideLoading      = hideLoading;
        $scope.homeModel.stripNews        = stripNews;
        $scope.homeModel.locationStrip    = locationStrip;


        // config
        $scope.homeModel.cartapp = {
            name: cartAppObj.name,
            version: '1.0',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            config: {
                theme: cartAppObj.defaultTheme,
                lang: cartAppObj.defaultLang,
                sliderInterval: cartAppObj.slowSlideInterval /* Slider timer */
            },
            user: {
                fname: '',
                lname: '',
                id: '',
                token: ''
            }
        }

        $scope.homeModel.status = {
            flash         : '',
            flashEnable   : '',
            menuShow      : false,
            loadComplete  : false,
            notificount   : 0
        }

        $scope.homeModel.sectiondata = {

            /* Sec 0: flash */
            flash: '',
            /* Main Slider image array */

            /* Sec 1: Slides */
            slides: '',
            /* Main Slider image array */

            /* Sec 2: Birthday, Newbies and  */
            newbie: '',
            club: '',
            birthdays: '',

            /* Sec 3: Cartwheel apps list */
            apps: '',

            /* Sec 4: Departments */
            departments: '',

            /* Sec 5: News */
            news: '',
            newsInterval: cartAppObj.mediumSlideInterval,

            /* Sec 6: Timeline */
            timeline: ''
        }



        $scope.homeModel.template = {
            slider: basepath   + "home.slider.tpl.html"       + cartAppObj.urlVersion,
            events: basepath   + "home.events.tpl.html"       + cartAppObj.urlVersion,
            menu: basepath     + "home.menu.tpl.html"         + cartAppObj.urlVersion,
            apps: basepath     + "home.apps.tpl.html"         + cartAppObj.urlVersion,
            dept: basepath     + "home.dept.tpl.html"         + cartAppObj.urlVersion,
            stories: basepath  + "home.stories.tpl.html"      + cartAppObj.urlVersion,
            timeline: basepath + "home.timeline.tpl.html"     + cartAppObj.urlVersion,
            about: basepath    + "home.about.tpl.html"        + cartAppObj.urlVersion,
            footer: commonpath + "section/common.footer.tpl.html" + cartAppObj.urlVersion,
            color: basepath    + "home.color-palete.tpl.html" + cartAppObj.urlVersion
        }

/*
        function gotoSection(secid) {
            // set the location.hash to the id of
            // the element you wish to scroll to
            // call $anchorScroll()
            anchorSmoothScroll.scrollTo(secid);
        }
*/
        function setTheme(color) {
            $scope.appModel.cartapp.config.theme = color;
        }

       /*  function showModalLogin() {
		    $scope.appModel.modalShown = true;
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: $rootScope.cartAppObj.sharedBasePath + 'login/login.modal.tpl.html',
                controller: 'LoginCtrl'
            });
        } */


        function showModalApp(app) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: basepath + 'home.app.modal.tpl.html',
                controller: 'AppModalCtrl',
                resolve: {
                    application: function() {
                        return $scope.homeModel.sectiondata.apps;
                    },
                    app: function() {
                        return app;
                    }
                }
            });
        }

        /**/
        function showModalDept(department) {
            console.log(department);
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: basepath + 'home.dept.modal.tpl.html',
                controller: 'DeptModalCtrl',
                resolve: {
                    departments: function() {
                        return $scope.homeModel.sectiondata.departments;
                    },
                    department: function() {
                        return department;
                    }
                }
            });
        }


        /**/
        function showModalAlbum(fun) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: basepath + 'home.fun.modal.tpl.html',
                controller: 'AlbumModalCtrl',
                resolve: {
                    club: function() {
                        return $scope.homeModel.sectiondata.club;
                    },
                    fun: function() {
                        return fun;
                    }
                }
            });
        }

        /*for TOP Stories modal*/
        function showModalStories(news) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: basepath + 'home.story.modal.tpl.html',
                controller: 'StoryModalCtrl',
                size: 'lg',
                resolve: {
                    news: function() {
                        return $scope.homeModel.sectiondata.news;
                    }
                }
            });
        }

        /**/
        /*for login/home botton in header in ladding page*/
        function logout() {

            CartAuthSrv.logout();
            $location.path("/home");
        }


        function isAuth() {
            var token = CartAuthSrv.isAuthenticated();
            if (token == null || token == "") {
                $location.path("/home");
            }
        }

        function isLogged() {
            var token = CartAuthSrv.isAuthenticated();
            if (token == null || token == "") {
                return false;
            } else {
                return true;
            }
        }

        function loadData() {
            var color = cartAppObj.defaultTheme;
			if (angular.isDefined(cartAppObj.settingsStorage.getItem(cartAppObj.themeKey)) &&
				cartAppObj.settingsStorage.getItem(cartAppObj.themeKey) != null) {
				color = cartAppObj.settingsStorage.getItem(cartAppObj.themeKey);
			}

            $scope.appModel.cartapp.config.theme = color;

            CartHomeSrv.getUrl().success(function(data, status) {
                var emp = data.employees;
                $scope.homeModel.sectiondata.slides       = data.banners;
                $scope.homeModel.sectiondata.timeline     = data.histories;
                $scope.homeModel.sectiondata.newbie       = emp.new;
                $scope.homeModel.sectiondata.birthdays    = emp.birthdays;
                $scope.homeModel.sectiondata.news         = data.stories;
                $scope.homeModel.sectiondata.application  = data.applications;
                $scope.homeModel.sectiondata.departments  = data.departments;
                $scope.homeModel.sectiondata.club         = data.events;
                $scope.appModel.sectiondata.flash         = data.flashMsgs.reverse();

                $scope.homeModel.hideLoading();
            }).error(function(data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                $scope.homeModel.hideLoading();
            });

        }



        function hideLoading() {
            $scope.homeModel.status.loadComplete = true;
            var timeout = $timeout(function() {
                $scope.appModel.displayNotifications();
            }, 1000);
        }

        /*for news slider strip content*/
        function stripNews(news) {
            return news.substring(0, 480);
        }

        function locationStrip(location) {
            var location = location.split(',');
            return location[1];
        }
    }
})();
