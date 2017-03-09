/**
 * Cartwheel auth management
 */

(function() {
	'use strict';

	angular
		.module(cartAppObj.id)
		.constant('CART_AUTH_EVENT', {
			authLoginSuccess       : 'auth-login-success',
			authLoginFailed        : 'auth-login-failed',
			authLogoutSuccess      : 'auth-logout-success',
			authSessionTimeout     : 'auth-session-timeout',
			authNotAuthenticated   : 'auth-not-authenticated',
			authNotAuthorised      : 'auth-not-authorised',
			authNotFound           : 'auth-not-found'
		})
		.constant('CART_USER_ROLES', {
			superadmin  : '0',
			logged_in   : '*',
			all         : '1',
			mm_view     : 'a1',
			mm_admin    : 'a2',
			mm_deptadm  : 'a3',

		})
		.service('CartSessionSrv',      CartSessionSrv)
		.factory('CartAuthReqQueue',       CartAuthReqQueue)
		.factory('CartAuthInterceptor', CartAuthInterceptor)
		.factory('CartAuthSrv',         CartAuthSrv)
		.config(cartAuthConfig);


	//////////////////////////  Authentication Interceptor /////////////////////////////////
	/*
	* This section defines the logic to handle the following:
	* - Add the token for every request if logged in
	* - If we receive a authentication failure error, then
	*   this will help in raising an appropriate login before continuing
	* TODO: If a sessionTimeout happens, we need to defer the previous request so that
	*       user data of the previous request is continued after successful login
	*/

	CartAuthInterceptor.$inject = ['$rootScope', '$q', 'CartSessionSrv', 'CartAuthReqQueue', 'CART_AUTH_EVENT'];
	function CartAuthInterceptor  ( $rootScope,   $q,   CartSessionSrv,   CartAuthReqQueue,   CART_AUTH_EVENT) {
		console.log("CARTAPP.authInterceptor: Configured");
		return {
			request: requestInject,
			responseError: responseAuthManage
		};

		function requestInject(config) {
			console.log("CARTAPP.authInterceptor.request: " + config.url + "(Anonymous:" + CartSessionSrv.anonymous + ")");
			if ((!CartSessionSrv.anonymous) && (CartSessionSrv.userData.token != "")) {
				config.headers = config.headers || {};
				config.headers[cartAppObj.tokenKey] = CartSessionSrv.userData.token;
			}
			return config || $q.when(config);
		}

		//TODO: Add the $q.defer later on to handle resending of previous request which
		//      results in a 401, 419, 420
		function responseAuthManage(response) {
			console.log("22CARTAPP.authInterceptor.response: " + response.config.url + "(" + response.status + ")");
			$rootScope.$broadcast({
				400: CART_AUTH_EVENT.authNotAuthenticated,
				401: CART_AUTH_EVENT.authNotAuthenticated,
				403: CART_AUTH_EVENT.authNotAuthorized,
				404: CART_AUTH_EVENT.authNotFound,
				419: CART_AUTH_EVENT.authSessionTimeout,
				440: CART_AUTH_EVENT.authSessionTimeout
			}[response.status], response);
			return $q.reject(response);
		}
	}

	cartAuthConfig.$inject = ['$httpProvider'];
	function cartAuthConfig (  $httpProvider ) {
		$httpProvider.interceptors.push(['$injector',
			function($injector) {
				return $injector.get('CartAuthInterceptor');
			}
		]);
	}

	////////////////// END OF Authentication Interceptor /////////////////////////////////

	//////////////////////////  Authentication Service /////////////////////////////////
	/*
	* This section provides the service to perform the actual authentication
	*  - This sends the authentication request to the backend and gets the
	*    appropriate token
	*  All the modules (sub systems) which needs Authentication needs to use this service
	*  injected
	*  API to use:
	*    - login(user, successCallback, errorCallback)
	*       user : has the credential info user has provided to login
	*    - wasLogged()
	*    - isAuthenticated()
	*    - isAuthorised(roleid)
	*    - logout()
	*/
	CartAuthSrv.$inject = ['$http', '$rootScope', '$window', 'CartSessionSrv', 'CART_AUTH_EVENT', 'CART_USER_ROLES'];
	function CartAuthSrv (  $http,   $rootScope,   $window,   CartSessionSrv,   CART_AUTH_EVENT,   CART_USER_ROLES) {

		/*
		 * Section: Server PATHs
		 */
		var serverURls  = {};
		var serverURls  = {
			'LOGIN'    : cartAppObj.serverBasePath + "/secured/login",
			'LOGOUT'   : cartAppObj.serverBasePath + "/logout"
		};

		var authService = {};
		authService.login           = loginCart;
		authService.wasLogged       = wasLogged;
		authService.isAuthenticated = isAuthenticated;
		authService.isAuthorised    = isAuthorised;
		authService.logout          = logoutCart;

		return authService;


		//the login function
		function loginCart(user, successCall, errorCall) {
			var loginData 			= {};
			loginData.id 			= '';
			loginData.roles 		= '';
			loginData.empWindowsId 	= '';
			loginData.empid 		= '';
			loginData.empFname 		= '';
			loginData.empLname 		= '';
			loginData.empEmailId 	= '';
			loginData.empDesgName 	= '';
			loginData.token 		= '';

			$http.post(serverURls['LOGIN'], user)
			.success(function(data) {
				console.log(data);
				loginData.id 			= data.user.id;
				//loginData.roles = data.;
				loginData.empWindowsId          = data.user.empWindowsId;
				loginData.empid 		= data.user.empNo;
				loginData.empFname 		= data.user.empFname;
				loginData.empLname 		= data.user.empLname;
				loginData.empEmailId            = data.user.empEmailId;
				loginData.empDesgName           = data.user.empDesgName;
				loginData.empHomeLocName 	= data.user.empHomeLocName;
				loginData.token 		= data.token;

				console.log(loginData);
				//update current user into the Session service
				CartSessionSrv.create(loginData);

				//fire event of successful login
				$rootScope.$broadcast(CART_AUTH_EVENT.authLoginSuccess);
				//run success function
				successCall(loginData);
			})
			.error(function(data) {
				//OR ELSE
				//unsuccessful login, fire login failed event for
				//the according functions to run
				$rootScope.$broadcast(CART_AUTH_EVENT.authLoginFailed);
				errorCall();
			});
		}

		//check if the user is authenticated
		function isAuthenticated() {
			return !!CartSessionSrv.userData.token;
		}

		//Was the user previously logged in
		function wasLogged() {
			return !!CartSessionSrv.userData.id;
		}


		//check if the user is authorized to access the next route
		//this function can be also used on element level
		//e.g. <p ng-if="isAuthorised(authorisedRoles)">show this only to admins</p>
		function isAuthorised(authorisedRoles) {
			var retStatus = false;
			var i, j;
			if (!angular.isArray(authorisedRoles)) {
				authorisedRoles = [authorisedRoles];
			}
			console.log(typeof authorisedRoles[0] + " " + authorisedRoles[0] + ":" + authorisedRoles.length);
			//Empty array or if the user roles match
			if ((typeof authorisedRoles[0] === 'undefined') ||
				(authorisedRoles.length == 1 && authorisedRoles[0] == "")){
				retStatus = true;
			}
			else {
				if (isAuthenticated()) {
					console.log("Autghen");
					if (!angular.isArray(CartSessionSrv.userData.roles)) {
						CartSessionSrv.userData.roles = [CartSessionSrv.userData.roles];
					}
					for (i = 0; i < CartSessionSrv.userData.roles.length; i++) {
						if (CartSessionSrv.userData.roles[i] == CART_USER_ROLES.superadmin) { return true; }
						for (j = 0; j < authorisedRoles.length; j++) {
							if (authorisedRoles[j] == CartSessionSrv.userData.roles[i]) {
							console.log("Found " + authorisedRoles[j]);
								return true;
							}
						}
					}
				}
			}
			return retStatus;
		}

		//log out the user and broadcast the logoutSuccess event
		function logoutCart() {
			$http.get(serverURls['LOGOUT'])
			.success(function(data) {
				CartSessionSrv.destroy();
			})
			.error(function(data) {
				//OR ELSE
				//unsuccessful logout failed event
				console.log("Failed to logout. Still we are clearning locally" + data);
				CartSessionSrv.destroy();
			});

			$rootScope.$broadcast(CART_AUTH_EVENT.authLogoutSuccess);
		}

	}

	////////////////// END OF Authentication Service /////////////////////////////////

	//////////////////////////  Session Service /////////////////////////////////
	/*
	* This section provides the session service for user
	* - Stores the currently logged in user details including token
	* - Loads from localstorage incase of any page refresh after login
	* This service is local and need to be exposed to the outside world
	*/

	CartSessionSrv.$inject = ['$rootScope', '$localStorage', 'CART_USER_ROLES'];
	function CartSessionSrv (  $rootScope,   $localStorage,   CART_USER_ROLES) {
		var sessObj = this;
		sessObj.anonymous  = true;
		sessObj.userData   = {};
		sessObj.create     = createObj;
		sessObj.destroy    = destroyObj;

		// Extract the session data on page refresh
		if (angular.isDefined(localStorage.getItem(cartAppObj.userKey)) &&
			localStorage.getItem(cartAppObj.userKey) != null) {
			sessObj.userData = JSON.parse(localStorage.getItem(cartAppObj.userKey));
			console.log("I am here: CartSess");
			if (sessObj.userData == null) sessObj.userData = {};
			if (sessObj.userData.token != null) {
				sessObj.anonymous = false;
			}
		}

		return sessObj;

		function createObj(userData) {
			console.log(userData);
			sessObj.userData.id 		= userData.id;
			sessObj.userData.roles 		= userData.roles;
			sessObj.userData.empDesgName    = userData.empDesgName;
			sessObj.userData.empWindowsId   = userData.empWindowsId;
			sessObj.userData.empid		= userData.empid;
			sessObj.userData.empFname 	= userData.empFname;
			sessObj.userData.empLname 	= userData.empLname;
			sessObj.userData.empEmailId     = userData.empEmailId;
			sessObj.userData.empHomeLocName = userData.empHomeLocName;
			sessObj.userData.token 		= userData.token;
			if (!angular.isArray(sessObj.userData.roles)) {
				if (sessObj.userData.roles == null) {
					sessObj.userData.roles = [ CART_USER_ROLES.logged_in ];
				}
				else {
					sessObj.userData.roles = [sessObj.userData.roles];
					sessObj.userData.roles.push(CART_USER_ROLES.logged_in);
				}
			}
			$rootScope.coreModel.userData.empWindowsId = userData.empWindowsId;
                        $rootScope.coreModel.userData.empid = sessObj.userData.empid;
			$rootScope.coreModel.userData.empFname = userData.empFname;
			$rootScope.coreModel.userData.empLname = userData.empLname;
			$rootScope.coreModel.userData.empEmailId = userData.empEmailId;
			$rootScope.coreModel.userData.empHomeLocName = userData.empHomeLocName;

			sessObj.anonymous = false;
			if (angular.isDefined(localStorage.getItem(cartAppObj.userKey))) {
				//set the browser session, to avoid relogin on refresh
				localStorage.setItem(cartAppObj.userKey, JSON.stringify(sessObj.userData));

				if (angular.isDefined(localStorage.getItem(cartAppObj.userKey))) {
					sessObj.userData = JSON.parse(localStorage.getItem(cartAppObj.userKey));
//					console.log(sessObj.userData);
					$rootScope.coreModel.userData.empWindowsId = sessObj.userData.empWindowsId;
                                        $rootScope.coreModel.userData.empid = sessObj.userData.empid;
					$rootScope.coreModel.userData.empFname = sessObj.userData.empFname;
					$rootScope.coreModel.userData.empLname = sessObj.userData.empLname;
					$rootScope.coreModel.userData.empEmailId = sessObj.userData.empEmailId;
					$rootScope.coreModel.userData.empHomeLocName = sessObj.userData.empHomeLocName;

				}
			}
		}

		function destroyObj() {
			sessObj.userData.id   = null;
			sessObj.userData.roles = null;
			sessObj.userData.empWindowsId = null;
			sessObj.userData.empid = null;
			sessObj.userData.empFname = null;
			sessObj.userData.empLname = null;
			sessObj.userData.empEmailId = null;
			sessObj.userData.token = null;
			sessObj.userData.empHomeLocName = null;
			sessObj.userData.empDesgName   = null;
			sessObj.anonymous      = true;
			// Clear the browser session, to avoid session availability
			localStorage.removeItem(cartAppObj.userKey);
		}

	}

	////////////////// END OF Authentication Session Service /////////////////////////////////

})();
