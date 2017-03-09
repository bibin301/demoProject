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

/* CartApp HDK Manage Ticket controller : js/components/Hdk/hdk.manage-ticker.tpl.html */
(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .controller('hdkManageCtrl', hdkManageCtrl);

    hdkManageCtrl.$inject = ['$rootScope', '$scope', '$modal', '$location', 'toaster', 'hdkSrv'];

    function hdkManageCtrl($rootScope, $scope, $modal, $location, toaster, hdkSrv) {
        console.log("Hdk manage ticket controller initiated");
        $scope.hdkManageModel = {};
        $scope.hdkManageModel.loadTicket = loadTicket;
        $scope.hdkManageModel.ticketTimeline = ticketTimeline;
        $scope.hdkManageModel.ticketResponse = ticketResponse;
        //$scope.hdkManageModel.include = $rootScope.cartAppObj.componentBasePath+"hdk/hdk.manage-ticket.add.tpl.html";


        $scope.hdkManageModel.statusDrop = {
            1: "Resolved",
            5: "5-Minutes",
            10: "10-Minutes",
            15: "15-Minutes",
            30: "30-Minutes",
            45: "45-Minutes",
            60: "1-Hour",
            1440: "1-Day",
            10080: '1-Week'
        };
        loadTicket();

        function loadTicket() {
            hdkSrv.getTickets().success(function (data, status) {

                $scope.hdkManageModel.tickets = data.tickets;
                //console.log($scope.hdkModel.tickets);

            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");

            });
        }

        function ticketTimeline(tktId) {
            //$location.path("/app/hdk/manageticket/" + tktId);
            hdkSrv.getTicketsDsc(tktId).success(function (data, status) {
                $scope.hdkManageModel.response = {
                    ticketid: tktId
                };
                $scope.hdkManageModel.tktDetails = data.ticketdetails;

            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");

            });


        }

        function ticketResponse(resDetail, tktId) {
            if (!resDetail || !tktId) {
                toaster.pop("error", "Please fill the details");
                return false;
            } else {
                resDetail.ticketid = tktId;
                resDetail.SLA = (resDetail.SLA == "0" ? "I" : (resDetail.SLA == "1" ? "R" : resDetail.SLA));
                resDetail.description = resDetail.description;
                resDetail.ticketstatus = resDetail.ticketstatus.replace(" ", "");
                /*resDetail*/
                hdkSrv.updateManageTicket(resDetail).success(function (data, status) {
                    toaster.pop("success", "Updated Successfully");
                    $scope.hdkManageModel.response = {
                        description: '',
                        SLA: '',
                        ticketid: '',
                        ticketstatus: ''
                    };
                    if ($scope.hdkManageModel.userForm) {
                        $scope.hdkManageModel.userForm.$setPristine();
                        $scope.hdkManageModel.userForm.$setUntouched();
                    }


                    ticketTimeline(tktId);
                    loadTicket();
                }).error(function (data, status) {
                    toaster.pop("error", " Please try again later");
                    console.log(status);
                    console.log(data, "Failed to retrieve data from backend... Please try after sometime");

                });
            }

        }
    }
})();



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

/* CartApp HDK Manage Ticket controller : js/components/Hdk/hdk.myticker.tpl.html */
(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .controller('hdkTicketCtrl', hdkTicketCtrl);

    hdkTicketCtrl.$inject = ['$rootScope', '$scope', '$modal', '$location', '$stateParams', 'hdkSrv', 'toaster'];

    function hdkTicketCtrl($rootScope, $scope, $modal, $location, $stateParams, hdkSrv, toaster) {
        ticketTimeline();
        $scope.hdkTktModel = {};
        $scope.hdkTktModel.ticketResponse = ticketResponse;
        $scope.hdkTktModel.statusDrop = {
            1: "Resolved",
            5: "5-Minutes",
            10: "10-Minutes",
            15: "15-Minutes",
            30: "30-Minutes",
            45: "45-Minutes",
            60: "1-Hour",
            1440: "1-Day",
            10080: '1-Week'
        };

        $scope.hdkTktModel.ticketTimeline = ticketTimeline;

        function ticketTimeline() {
            hdkSrv.getTicketsDsc($stateParams.tktId).success(function (data, status) {
                $scope.hdkTktModel.tktDetails = data.ticketdetails;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");

            });
        }

        function ticketResponse(resDetail) {
            resDetail.ticketid = $stateParams.tktId;

            resDetail.SLA = (resDetail.SLA == "0" ? "I" : "R");
            hdkSrv.updateManageTicket(resDetail).success(function (data, status) {
                toaster.pop("success", data, "Updated Successfully");
                ticketTimeline();
            }).error(function (data, status) {
                toaster.pop("error", " Please try again later");
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");

            });

        }
    }
})();
