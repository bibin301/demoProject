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

/* CartApp HDK Manage Ticket controller : js/components/Hdk/hdk.manage-ticker.tpl.html */

(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .factory('hdkSrv', hdkSrv);

    hdkSrv.$inject = ['$http', '$timeout'];

    function hdkSrv($http, $timeout) {
        return {
            getTickets: function () {
                return $http.get(cartAppObj.serverBasePath + "/helpdesk/manage/tickets", {
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            getTicketsDsc: function (tktId) {
                return $http.get(cartAppObj.serverBasePath + "/helpdesk/manage/ticket/" + tktId + "/edit", {
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            getMyTickets: function () {
                return $http.get(cartAppObj.serverBasePath + "/helpdesk/mytickets", {
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            getMyTicketsDsc: function (tktId) {
                return $http.get(cartAppObj.serverBasePath + "/helpdesk/ticket/" + tktId + "/edit", {
                    header: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
            },
            myticketUpdate: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/myticket/update",
                    method: "PUT",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })

            },
            updateManageTicket: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/manage/ticket/update",
                    method: "PUT",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            },
            getCategory: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/ticket/new",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            creatNewTkt: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/ticket/create",
                    method: "POST",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            getCategoryDetails: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/categories",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            getCategoryList: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/new",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            createCat: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/create",
                    method: "POST",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            updateCat: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/update",
                    method: "PUT",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            getAreaDetails: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/arealist",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            getAddAreaDetails: function () {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/area/new",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getAreaEditDetails: function (id) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/area/" + id + "/edit",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            getAreaCategory: function (id) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/new",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            addArea: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/area/create",
                    method: "POST",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            },
            updateArea: function (data) {
                return $http({
                    url: cartAppObj.serverBasePath + "/helpdesk/category/area/update",
                    method: "PUT",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            }
        }
    }
})();
