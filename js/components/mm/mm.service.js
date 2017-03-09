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

/* CartApp Meeting Minutes Service : js/components/mm/ */

(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .factory('mmSrv', mmSrv);

    mmSrv.$inject = ['$http', '$timeout'];

    function mmSrv($http, $timeout) {
        return {
            getMeetingList: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/list",
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            getDeptList: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/new",
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            createMeeting: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/create",
                    data: data,
                    method: "POST",
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            
            getMeetingActions: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/actions",
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
             updateMeetingActions: function (action) {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/action/update",
                    method: "PUT",
                    data : action,
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            
            getAdminDept: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/dept/list",
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            addAdminDept: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/dept/create-update",
                    method: "PUT",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            },
            updateAdminDept: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/dept/create-update",
                    method: "POST",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            },
            getAdminExtAtt: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/ext/attendees/list",
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
             updateAdminExtAtt: function (data) {
                 console.log(data)
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/ext/attendees/create-update",
                    method: "POST",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            },
            editMeeting: function (id) {
                return $http({
                    url: cartAppObj.serverBasePath + "/mm/"+id+"/add-edit/create",
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
})();
