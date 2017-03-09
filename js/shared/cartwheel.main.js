/**
 * Cartwheel app initialisation
 */
(function() {
	'use strict';

	angular
		.module(cartAppObj.id)
		.run(cartRun);


		cartRun.$inject = ['$rootScope', '$state', '$stateParams', '$window' , '$location'];
		function cartRun (  $rootScope,   $state,   $stateParams,   $window  ,  $location) {

			console.log("CARTAPP.run: started ...");
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;

			$rootScope.cartAppObj 	= {
				id                   : cartAppObj.id,
				name                 : cartAppObj.name,
				version              : cartAppObj.version,
				defaultTheme         : cartAppObj.defaultTheme,
				themeKey             : cartAppObj.themeKey,
				defaultLang          : cartAppObj.defaultLang,
				langKey              : cartAppObj.langKey,
				tokenKey             : cartAppObj.tokenKey,
				httpTimeout          : cartAppObj.httpTimeout,
				veryslowInterval     : cartAppObj.veryslowInterval,
				slowSlideInterval    : cartAppObj.slowSlideInterval,
				mediumSlideInterval  : cartAppObj.mediumSlideInterval,
				urlVersion           : cartAppObj.urlVersion,
				sharedBasePath       : "js/shared/",
				componentBasePath    : "js/components/",
				notFoundImg          : "images/404.jpg",
				noAccessImg          : "images/403.png",
				serverBasePath       : cartAppObj.serverBasePath

			};

			$rootScope.coreModel                   = {};
			$rootScope.coreModel.modal             = {};
			$rootScope.coreModel.userData          = {};
			$rootScope.coreModel.modal.count       = 0;
			$rootScope.coreModel.modal.loginModal  = false;
			$rootScope.coreModel.isDirty           = false;

			// Extract the session data on page refresh
			if (angular.isDefined(cartAppObj.userStorage.getItem(cartAppObj.userKey)) &&
				cartAppObj.userStorage.getItem(cartAppObj.userKey) != null) {
				var userData = JSON.parse(cartAppObj.userStorage.getItem(cartAppObj.userKey));
				$rootScope.coreModel.userData.empWindowsId 	= userData.empWindowsId;
                                $rootScope.coreModel.userData.id                = userData.id;
				$rootScope.coreModel.userData.empFname 		= userData.empFname;
				$rootScope.coreModel.userData.empLname 		= userData.empLname;
				$rootScope.coreModel.userData.empEmailId 	= userData.empEmailId;
				$rootScope.coreModel.userData.empHomeLocName= userData.empHomeLocName;
			}

			var smartDevice;
			// Adapted from http://www.detectmobilebrowsers.com
			var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
			// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
			smartDevice = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

			// add 'ie' classes to html
			var isIE = !!navigator.userAgent.match(/MSIE/i);
			isIE && angular.element($window.document.body).addClass('ie');
			smartDevice && angular.element($window.document.body).addClass('smart');

			//navigationManagement($location, $rootScope);

			// TODO: Add translation related code
			console.log("CARTAPP.run: Completed");



			/*
			// This is already been handled at module run state
			function isSmartDevice( $window ) {
			// Adapted from http://www.detectmobilebrowsers.com
			var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
			// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
			return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
			}
			*/

			/* Navigation management */
			function navigationManagement ($location, $rootScope) {
				var _preventNavigation = false;
				var _preventNavigationUrl = null;

				$rootScope.allowNavigation = function() {
					_preventNavigation = false;
				};

				$rootScope.preventNavigation = function() {
					_preventNavigation = true;
					_preventNavigationUrl = $location.absUrl();
				}

				$rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
					// Allow navigation if our old url wasn't where we prevented navigation from
					if (_preventNavigationUrl != oldUrl || _preventNavigationUrl == null) {
						$rootScope.allowNavigation();
						return;
					}

					if (_preventNavigation && !confirm("You have unsaved changes, do you want to continue?")) {
						event.preventDefault();
					}
					else {
						$rootScope.allowNavigation();
					}
				});
			}
		}

})();
