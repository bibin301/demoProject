/* Cartwheel App creation:
 *  This defines the Angular application which defines the dependent modules.
 *  This app depends on the following:
 *  -
 * Dependencies: This needs to be called after angular.js is included and first
 *               js of the cartwheel specific js code
 *               jquery.js
 *               angular.js
 *               cartwheel_app.js
 *               HDK service
 */

/* CartApp HDK Manage Ticket controller : js/components/Hdk/hdk.My-ticker.tpl.html */
(function () {
    'use strict';
    angular.module(cartAppObj.id)
            .controller('hdkMyTicketListCtrl', hdkMyTicketListCtrl)
            .filter('secondDropdown', function () {
                return function (TicketArea, TicketCategory) {
                    var filtered = [];
                    if (TicketCategory === null) {
                        return filtered;
                    }
                    angular.forEach(TicketArea, function (s2) {
                        if (s2.catId == TicketCategory) {
                            filtered.push(s2);
                        }
                    });
                    return filtered;
                };
            });
    hdkMyTicketListCtrl.$inject = ['$rootScope', '$scope', '$modal', '$location', 'toaster', 'hdkSrv'];
    function hdkMyTicketListCtrl($rootScope, $scope, $modal, $location, toaster, hdkSrv) {
        $scope.hdkMyTktModel = {};
        $scope.hdkMyTktModel.tktDetails = {};
        $scope.hdkMyTktModel.close = close;
        $scope.hdkMyTktModel.loadTicket = loadTicket;
        $scope.hdkMyTktModel.ticketTimeline = ticketTimeline;
        $scope.hdkMyTktModel.openAddTicketModal = openAddTicketModal;
        $scope.hdkMyTktModel.creatTkt = creatTkt;
        $scope.hdkMyTktModel.tktResponse = tktResponse;
        loadTicket();
        function loadTicket() {
            hdkSrv.getMyTickets().success(function (data, status) {

                $scope.hdkMyTktModel.tickets = data.mytickets;
                openAddTicketModal();
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });
        }

        function ticketTimeline(tktId) {
            //$location.path("/app/hdk/myticket/" + tktId);
            $scope.hdkMyTktModel.title = "Ticket Tracker";
            $scope.hdkMyTktModel.include = $rootScope.cartAppObj.componentBasePath + "hdk/hdk.my-ticket.timeline.tpl.html";
            hdkSrv.getMyTicketsDsc(tktId).success(function (data, status) {
                $scope.hdkMyTktModel.tktDetails = data.ticketdetails;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });
        }

        function openAddTicketModal() {
            $scope.hdkMyTktModel.include = $rootScope.cartAppObj.componentBasePath + "hdk/hdk.my-ticket.add.tpl.html";
            $scope.hdkMyTktModel.title = "Create New";
            hdkSrv.getCategory().success(function (data, status) {
                $scope.hdkMyTktModel.tktDetails.category = data.data.category;
                $scope.hdkMyTktModel.tktDetails.area = data.data.area;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });
        }

        function creatTkt(newTkt) {
            if (newTkt) {
                if (newTkt.areaid && newTkt.categoryid && newTkt.title) {
                    hdkSrv.creatNewTkt(newTkt).success(function (data, status) {
                        loadTicket();
                        $scope.hdkMyTktModel.newTkt = {};
                        $scope.hdkMyTktModel.createForm.$setPristine();
                        $scope.hdkMyTktModel.createForm.$setUntouched();
                        toaster.pop("success", "Ticket Created Successfully");
                    }).error(function (data, status) {
                        console.log(status);
                        console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                    });
                } else {
                    toaster.pop("error", "Please fill the neccessary details");
                }

            } else {
                toaster.pop("error", "Please fill the neccessary details");
            }
        }

        function tktResponse(res, id) {
            if (res) {
                if (res.description.length < 35 && res.SLA) {
                    var data = {
                        "ticketid": id,
                        "status": (res.SLA === 0 ? usrStatus = 'C' : usrStatus = 'R'),
                        "description": res.description
                    };
                    hdkSrv.myticketUpdate(data).success(function (data, status) {
                        loadTicket();
                        $scope.hdkMyTktModel.userForm.$setPristine();
                        $scope.hdkMyTktModel.userForm.$setUntouched();
                        toaster.pop("success", "Ticket Status Updated Successfully");
                    }).error(function (data, status) {
                        toaster.pop("success", "failed to update ,Please try again");
                    });
                } else {
                    toaster.pop("error", "Please fill the neccessary details");

                }


            } else {
                toaster.pop("error", "Please fill the neccessary details");
            }



        }
    }
})();
