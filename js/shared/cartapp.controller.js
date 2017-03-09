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
    .controller('CartAppCtrl', CartAppCtrl);


  CartAppCtrl.$inject = ['$rootScope', '$scope', '$state', '$modal', '$location', '$translate', '$window', 'toaster', 'anchorSmoothScroll', 'CART_AUTH_EVENT', 'CartAuthSrv', '$timeout'];

  function CartAppCtrl($rootScope, $scope, $state, $modal, $location, $translate, $window, toaster, anchorSmoothScroll, CART_AUTH_EVENT, CartAuthSrv, $timeout) {

    /*
     * Section: Server PATHs
     */
    var serverURls = {};
    var serverURls = {
      'LOGIN_FORM': $rootScope.cartAppObj.sharedBasePath + "login/login.modal.tpl.html?t=",
      'NOTFOUND_FORM': $rootScope.cartAppObj.sharedBasePath + "login/404.modal.tpl.html",
      'NOACCESS_FORM': $rootScope.cartAppObj.sharedBasePath + "login/403.modal.tpl.html"
    };

    //var appModel = this;
    $scope.appModel = {};

    $scope.appModel.cartapp = {}; // Application configuration

    // config
    $scope.appModel.cartapp = {
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
        notifyInterval: cartAppObj.veryslowInterval,
        sliderInterval: cartAppObj.slowSlideInterval /* Slider timer */
      },
      translate: {
        langOpen: false,
        langs: {
          en: 'English',
          de_DE: 'German',
          it_IT: 'Italian'
        },
        selectLang: "English"
      }
    };

    $scope.appModel.sectiondata = {};
    $scope.appModel.sectiondata.application = [{
      appName: 'Hosts of Assystem Apps',
      iconName: 'Cartwheel',
      desc: 'TLS - MINUTESTRACKER - APPRAISAL - HELPDESK - QMS - STARS - STARS+'
    }, {
      appName: 'Welcome to Cartwheel - Appraisal',
      iconName: 'Appsys',
      desc: 'Appraisal - Where you stand and what is expected'
    }, {
      appName: 'Welcome to Cartwheel - MM',
      iconName: 'MM',
      desc: 'Minutes - Capture minutes of meeting and track your actions'
    }, {
      appName: 'Welcome to Cartwheel - STARS',
      iconName: 'STARS',
      desc: 'STARS - Software for Tracking And Reporting'
    }, {
      appName: 'Welcome to Cartwheel - STARS+',
      iconName: 'STARS',
      desc: 'STARS+ - Managing work with Collabration and Effectiveness'
    }, {
      appName: 'Welcome to Cartwheel - TLS',
      iconName: 'TLS',
      desc: 'Timesheet - Collect and manage timesheet'
    }, {
      appName: 'Welcome to Cartwheel',
      iconName: 'QMS',
      desc: 'QMS - Bible reference for Policy and process'
    }];


    $scope.appModel.menus = [{
      menuName: 'Dashboard',
      className: 'dashboard',
      menuType: 'link',
      menuLink: 'app.dashboard',
      menuClass: 'fa fa-paper-plane-o'
    }, {
      menuName: 'Meeting Minutes',
      className: 'meetingminutes',
      menuType: 'toggle',
      menuLink: 'app.mm',
      menuClass: 'fa fa-calendar',
      subItems: [{
        menuName: 'Meeting List',
        className: 'meetinglist',
        menuType: 'link',
        menuLink: 'app.mm.list',
        menuClass: '',
        subItems: []
      }, {
        menuName: 'My Actions',
        className: 'meetinglist',
        menuType: 'link',
        menuLink: 'app.mm.actions',
        menuClass: '',
        subItems: []
      }, {
        menuName: 'MM Admin',
        className: 'meetingadmin',
        menuType: 'toggle',
        menuLink: 'app.mm.admin',
        menuClass: 'fa fa-caret-right',
        subItems: [{
          menuName: 'Departments',
          className: 'meetingdept',
          menuType: 'link',
          menuLink: 'app.mm.admin.dept',
          menuClass: '',
          subItems: []
        }, {
          menuName: 'External Attendees',
          className: 'meetingext',
          menuType: 'link',
          menuLink: 'app.mm.admin.extAtt',
          menuClass: '',
          subItems: []
        }]
      }, {
        menuName: 'Help',
        className: 'meetinghelp',
        menuType: 'link',
        menuLink: 'app.mm.help',
        menuClass: '',
        subItems: []
      }]
    }, {
      menuName: 'Help Desk',
      className: 'helpdesk',
      menuType: 'toggle',
      menuLink: 'app.hdk',
      menuClass: 'fa fa-header',
      subItems: [{
        menuName: 'My Ticket',
        className: 'helpdeskmyticket',
        menuType: 'link',
        menuLink: 'app.hdk.mytickets',
        menuClass: '',
        subItems: []
      }, {
        menuName: 'Manage Tickets',
        className: 'meetinglist',
        menuType: 'link',
        menuLink: 'app.hdk.manage',
        menuClass: '',
        subItems: []
      }, {
        menuName: 'Tickets Admin',
        className: 'meetingadmin',
        menuType: 'toggle',
        menuLink: 'app.hdk.admin',
        menuClass: 'fa fa-caret-right',
        subItems: [{
          menuName: 'Categories',
          className: 'helpdeskcategories',
          menuType: 'link',
          menuLink: 'app.hdk.admin.category',
          menuClass: '',
          subItems: []
        }, {
          menuName: 'Area',
          className: 'helpdeskarea',
          menuType: 'link',
          menuLink: 'app.hdk.admin.area',
          menuClass: '',
          subItems: []
        }]
      }, {
        menuName: 'Help',
        className: 'helpdeskhelp',
        menuType: 'link',
        menuLink: 'app.hdk.help',
        menuClass: '',
        subItems: []
      }]
    }, {
      menuName: 'User Management',
      className: 'usermanagement',
      menuType: 'toggle',
      menuLink: 'app.um',
      menuClass: 'fa fa-users',
      subItems: [{
        menuName: 'List',
        className: 'usermanagementlist',
        menuType: 'link',
        menuLink: 'app.um.list',
        menuClass: '',
        subItems: []
      }, {
        menuName: 'Help',
        className: 'usermanagementhelp',
        menuType: 'link',
        menuLink: 'app.um.help',
        menuClass: '',
        subItems: []
      }]
    }, {
      menuName: 'TLS',
      className: 'tls',
      menuType: 'toggle',
      menuLink: 'app.tls',
      menuClass: 'fa fa-clock-o',
      subItems: [{
        menuName: 'Timelog',
        className: 'tlstimelog',
        menuType: 'toggle',
        menuLink: 'app.tls.timelog',
        menuClass: '',
        subItems: [{
          menuName: 'Submission',
          className: 'tlstimelogsubmission',
          menuType: 'link',
          menuLink: 'app.tls.timelog.submission',
          menuClass: '',
          subItems: []
        }, {
          menuName: 'Approval',
          className: 'tlstimelogapproval',
          menuType: 'link',
          menuLink: 'app.tls.timelog.approval',
          menuClass: '',
          subItems: []
        }, {
          menuName: 'Reports',
          className: 'tlstimelogtimereports',
          menuType: 'link',
          menuLink: 'app.tls.timelog.reports',
          menuClass: '',
          subItems: []
        }, {
          menuName: 'Templates',
          className: 'tlstimelogTemplates',
          menuType: 'link',
          menuLink: 'app.tls.timelog.templates',
          menuClass: '',
          subItems: []
        }]
      }, {
        menuName: 'Admin',
        className: 'tlsadmin',
        menuType: 'toggle',
        menuLink: 'app.tls.admin',
        menuClass: '',
        subItems: []
      }, {
        menuName: 'Project',
        className: 'tlsproject',
        menuType: 'toggle',
        menuLink: 'app.tls.project',
        menuClass: '',
        subItems: [{
            menuName: 'WRI',
            className: 'tlsprojectwri',
            menuType: 'link',
            menuLink: 'app.tls.project.wri',
            menuClass: '',
            subItems: []
          }, {
            menuName: 'Modify WBS',
            className: 'tlsprojectwbs',
            menuType: 'link',
            menuLink: 'app.tls.project.wbs',
            menuClass: '',
            subItems: []
          }, {
            menuName: 'Assign Resources',
            className: 'tlsprojectassign',
            menuType: 'link',
            menuLink: 'app.tls.project.resources',
            menuClass: '',
            subItems: []
          }, {
            menuName: 'Change Approver',
            className: 'tlsprojectapprover',
            menuType: 'link',
            menuLink: 'app.tls.project.approver',
            menuClass: '',
            subItems: []
          }, {
            menuName: 'Enable/Disable Codes',
            className: 'tlsprojectenable',
            menuType: 'link',
            menuLink: 'app.tls.project.enable',
            menuClass: '',
            subItems: []
          }, {
            menuName: 'Imports',
            className: 'tlsprojectImports',
            menuType: 'toggle',
            menuLink: 'app.tls.project.imports',
            menuClass: '',
            subItems: [{
              menuName: 'Import TLS',
              className: 'tlsprojectImportsTls',
              menuType: 'link',
              menuLink: 'app.tls.project.imports.tls',
              menuClass: '',
              subItems: []
            }, {
              menuName: 'Import WBS',
              className: 'tlsprojectImportsWbs',
              menuType: 'link',
              menuLink: 'app.tls.project.imports.wbs',
              menuClass: '',
              subItems: []
            }]
          }

        ]
      }]
    }];


    $scope.appModel.gotoSection = gotoSection;
    /**
     // We are storing this in the sessionService. So this can be removed
     $scope.appModel.user	= {
     fname	: '',
     lname	: '',
     id		: '',
     token	: ''
     };
     */
    //$rootScope.coreModel                 = {};
    /*	$rootScope.coreModel.modal             = {};
     $rootScope.coreModel.modal.count       = 0;
     $rootScope.coreModel.modal.loginModal  = false;
     $rootScope.coreModel.isDirty           = false;*/

    $scope.appModel.showLoginModal = showLoginModal;
    $scope.appModel.loginSuccess = loginSuccess;
    $scope.appModel.showNotAuthorizedDialog = showNotAuthorizedDialog;
    $scope.appModel.showNotFoundModal = showNotFoundModal;
    $scope.appModel.setThemeColor = setThemeColor;
    $scope.appModel.logoutUser = logoutUser;
    $scope.appModel.locked = showLockedPage;
    $scope.appModel.stateChangeCheck = stateChangeCheck;
    $scope.appModel.displayNotifications = displayNotifications;
    $scope.appModel.closeNotification = closeNotification;
    $scope.appModel.themeExpand = false;
    $scope.appModel.tableFullWidth = false;
    $scope.appModel.tinymceOptions = {
      statusbar: false,
      menubar: false
    };


    $scope.appModel.priority = {}; // Holds the notification priorities

    // Theme color
    if (angular.isDefined(cartAppObj.settingsStorage.getItem(cartAppObj.themeKey)) &&
      cartAppObj.settingsStorage.getItem(cartAppObj.themeKey) != null) {
      $scope.appModel.cartapp.config.theme = cartAppObj.settingsStorage.getItem(cartAppObj.themeKey);
    }

    // Language
    if (angular.isDefined(cartAppObj.settingsStorage.getItem(cartAppObj.langKey)) &&
      cartAppObj.settingsStorage.getItem(cartAppObj.langKey) != null) {
      $scope.appModel.cartapp.config.lang = cartAppObj.settingsStorage.getItem(cartAppObj.langKey);
    }

    /*
     //TODO: Define the all watches so that changes on cookie related changes are handled
     // save settings to local storage
     $scope.$watch('appModel.cartapp.config', function() {
     if ($scope.appModel.cartapp.config.theme === "null") {$scope.appModel.cartapp.config.theme = cartAppObj.defaultTheme;}
     if ($scope.appModel.cartapp.config.lang === "null") {$scope.appModel.cartapp.config.lang = cartAppObj.defaultLang;}
     //                console.log($scope.appModel.cartapp);
     //                console.log(cartAppObj.defaultTheme);
     localStorage.setItem(cartAppObj.themeKey, $scope.appModel.cartapp.config.theme);
     localStorage.setItem(cartAppObj.langKey,  $scope.appModel.cartapp.config.lang);
     }, true);
     */

    // angular translate
    $scope.appModel.cartapp.translate.selectLang = $scope.appModel.cartapp.translate.langs[$translate.proposedLanguage()] || "English";
    $scope.appModel.cartapp.translate.setLang = function(langKey, $event) {
      // set the current lang
      $scope.appModel.cartapp.translate.selectLang = $scope.appModel.cartapp.translate.langs[langKey];
      // You can change the language during runtime
      $translate.use(langKey);
      $scope.appModel.cartapp.translate.langOpen = !$scope.appModel.cartapp.translate.langOpen;
    };

    // State change check to see if the user is authenaticated and authorised
    $rootScope.$on('$stateChangeStart', $scope.appModel.stateChangeCheck);


    //listen to events of unsuccessful logins, to run the login dialog
    $rootScope.$on(CART_AUTH_EVENT.authNotAuthorized, $scope.appModel.showNotAuthorizedDialog);
    $rootScope.$on(CART_AUTH_EVENT.authNotAuthenticated, $scope.appModel.showLoginModal);
    $rootScope.$on(CART_AUTH_EVENT.authSessionTimeout, $scope.appModel.showLoginModal);
    $rootScope.$on(CART_AUTH_EVENT.authLogoutSuccess, showHomePage);
    $rootScope.$on(CART_AUTH_EVENT.authLoginSuccess, $scope.appModel.loginSuccess);
    $rootScope.$on(CART_AUTH_EVENT.authNotFound, $scope.appModel.showNotFoundModal);

    function gotoSection(secid) {
      // set the location.hash to the id of
      // the element you wish to scroll to
      // call $anchorScroll()
      console.log("called with " + secid);
      if (typeof secid == "string")
        anchorSmoothScroll.scrollTo(secid);
    }

    /* Function to set the theme of the application  called when */
    function setThemeColor(themeColor) {
      $scope.appModel.cartapp.config.theme = themeColor;
      cartAppObj.settingsStorage.setItem(cartAppObj.themeKey, themeColor);
    }

    function showHomePage() {
      $location.path("/");
      showLoginModal();
    }

    function showLockedPage() {
      $location.path("/locked");
    };


    function showLoginModal() {
      var d = new Date();
      if (!$rootScope.coreModel.modal.loginModal) {
        $rootScope.coreModel.modal.loginModal = true;
        var modalInstance = $modal.open({
          templateUrl: serverURls['LOGIN_FORM'] + d.getTime(),
          controller: "LoginCtrl",
          backdrop: "static",
          keyboard: false
        });

        modalInstance.result.then(function() {
          $rootScope.coreModel.modal.loginModal = false;
        });
      }
    }


    function showNotFoundModal() {
      console.log("Not found");
      if (!$rootScope.coreModel.modal.loginModal) {
        $rootScope.coreModel.modal.loginModal = true;
        var modalInstance = $modal.open({
          templateUrl: serverURls['NOTFOUND_FORM'],
          controller: "LoginCtrl",
          backdrop: "static"
        });

        modalInstance.result.then(
          function() { /* On Success */
            $rootScope.coreModel.modal.loginModal = false;
          },
          function() { /* On error */
            $rootScope.coreModel.modal.loginModal = false;
          });
      }
    }


    function logoutUser() {
      CartAuthSrv.logout();
      $location.path("/");
    }

    //TODO: We need to see if any of the data related to the user
    //      needs to be loaded
    function loginSuccess() {}

    //TODO: To display an alert modal window so that user is provided of the failure
    function showNotAuthorizedDialog() {
      console.log("Not authorised");
      if (!$rootScope.coreModel.modal.loginModal) {
        $rootScope.coreModel.modal.loginModal = true;
        var modalInstance = $modal.open({
          templateUrl: serverURls['NOACCESS_FORM'],
          controller: "LoginCtrl",
          backdrop: "static"
        });

        modalInstance.result.then(
          function() { /* On Success */
            $rootScope.coreModel.modal.loginModal = false;
          },
          function() { /* On error */
            $rootScope.coreModel.modal.loginModal = false;
          });
      }
    }





    //before each state change, check if the user is logged in
    //and authorized to move onto the next state
    function stateChangeCheck(event, next) {

      console.log("Iam in state change");

      //var routeData = next.data || {};
    //  var authorisedRoles = routeData.authorisedRoles;
      console.log("nxt = " + next.url);

      if ($scope.appModel.tableFullWidth == true) {

        $scope.appModel.tableFullWidth = false;

        $timeout(function() {
          $scope.appModel.tableFullWidth = true;
        }, 1500);
      }

      /*
       if (next.url == "/home") {
       return true;
       }

       if (!CartAuthSrv.isAuthenticated()) {
       event.preventDefault();
       // user is not allowed
       console.log("Not authenmticated");
       $rootScope.$broadcast(CART_AUTH_EVENT.authNotAuthenticated);
       //next.url = "/home";
       //showHomePage();
       return false;
       }
       */

      if (!CartAuthSrv.isAuthorised(authorisedRoles)) {
        event.preventDefault();
        console.log("CARTAPP CONTROLLER: stateChange: Not authorised");
        if (CartAuthSrv.isAuthenticated()) {
          // user is not allowed
          $rootScope.$broadcast(CART_AUTH_EVENT.authNotAuthorized);
        } else {
          // user is not logged in
          console.log("CARTAPP CONTROLLER: stateChange: Not AUTH!!!!");
          $rootScope.$broadcast(CART_AUTH_EVENT.authNotAuthenticated);
        }
      }
    }



    $scope.appModel.priority = {
      1: "info",
      2: "success",
      3: "warning",
      4: "error"
    }



    /*for notification flash message*/
    function displayNotifications() {
      if ($scope.appModel.sectiondata.flash)
        $scope.appModel.sectiondata.notifi_count = $scope.appModel.sectiondata.flash.length;
      $scope.appModel.closeNotification();
      angular.forEach($scope.appModel.sectiondata.flash, function(value, key) {
        //var sticky = $rootScope.cartapp.config.notifyInterval;

        toaster.pop($scope.appModel.priority[value.priority], value.title, value.message, cartAppObj.slowSlideInterval);
        /*toaster.pop(value.type, value.title, value.message, sticky, 'trustedHtml', "", value['@unid']);*/
      });
    }

    function closeNotification() {
      toaster.clear();
    }


  }
})();
