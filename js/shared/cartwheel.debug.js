/**
 * Cartwheel debug management
 */
 
(function () {
    'use strict';

	angular
		.module(cartAppObj.id)
		.factory('CartDebugMgr', CartDebugMgr)
		.config(['$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push(CartDebugMgr)
		}]);

		CartDebugMgr.$inject = ['$q'] ;
		function CartDebugMgr (  $q ) {
			var cartDbgObj = {
				request : httpRequest,
				response: httpResponse
			};
			return cartDbgObj;
			
			function httpRequest(config) {
					//weed out loading of views - we just want service requests.
					if (config.url.indexOf('html') == -1) {
						config.requestTimestamp = new Date().getTime();
						// console.log(config); // Contains the data about the request before it is sent.
						console.log("HTTP " + config.method + " request: " + config.url);
					}
					// Return the config or wrap it in a promise if blank.
					return config || $q.when(config);
			}
				
			function httpResponse(response) {
					//weed out loading of views - we just want service requests.
					if (response.config.url.indexOf('html') == -1) {
						response.config.responseTimestamp = new Date().getTime();
						 console.log(response); // Contains the data from the response
					}
					return response || $q.when(response);
			}
		}

})();