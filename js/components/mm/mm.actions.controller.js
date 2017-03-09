/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .controller('mmActionCtrl', mmActionCtrl);


    mmActionCtrl.$inject = ['$rootScope', '$scope', 'toaster', '$timeout', 'mmSrv'];

    function mmActionCtrl($rootScope, $scope, toaster, $timeout, mmSrv) {
        $scope.mmActionModel = {};
        $scope.mmActionModel.loadDept = loadData;
        $scope.mmActionModel.editAction = editAction;
        $scope.mmActionModel.updateAction = updateAction;
        //$scope.mmActionModel.editDept = editDept;
        //$scope.mmActionModel.updateDept = updateDept;

        //$scope.mmActionModel.createDept = createDept;

        loadData();

        function loadData() {
            $scope.mmActionModel.title = "Update Satus";
            mmSrv.getMeetingActions().success(function (data, status) {
                $scope.mmActionModel.actions = data.actions;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                toaster.pop("error", "Server Problem");
            });

        }
        

        function editAction(action) {
            $scope.mmActionModel.action = "";
            $timeout(function () {
                $scope.mmActionModel.action = action;
            }, 500);
        }

        function  updateAction(data) {
            var jsonData = {
                action : {
                    id: data.actId,
                    revisedDate: data.revDueDate,
                    actionTaken: data.actTaken
                }
            };
            mmSrv.updateMeetingActions(jsonData).success(function (data, status) {
                $scope.mmActionModel.action = '';
                toaster.pop("success", "Action updated successfully");
                loadData();
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                toaster.pop("error", "Server Problem");
            });
        }
    }
    

})();