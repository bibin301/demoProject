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
        .factory('CartAppDashSrv', CartAppDashSrv);

    CartAppDashSrv.$inject = ['$http', '$timeout'];

    function CartAppDashSrv($http, $timeout) {
        return {
            getCards: function(scope) {
                return $http.get(cartAppObj.serverBasePath +"/dash/jsonData", {
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
})();
