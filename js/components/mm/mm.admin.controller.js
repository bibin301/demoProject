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

/* CartApp Meeting Minutes Admin Categoty  controller : js/components/Hdk/hdk.admin.category.tpl.html */
(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .controller('mmAdminDeptCtrl', mmAdminDeptCtrl)
            .controller('mmAdminExtAttCtrl', mmAdminExtAttCtrl);


    mmAdminDeptCtrl.$inject = ['$rootScope', '$scope', '$modal', 'toaster', 'mmSrv', '$timeout'];

    function mmAdminDeptCtrl($rootScope, $scope, $modal, toaster, mmSrv, $timeout) {
        $scope.mmAdminDeptModel = {};
        $scope.mmAdminDeptModel.loadDept = loadDept;
        $scope.mmAdminDeptModel.editDept = editDept;
        $scope.mmAdminDeptModel.updateDept = updateDept;
        //$scope.mmAdminDeptModel.createDept = createDept;
        loadDept();
        function loadDept() {
            $scope.mmAdminDeptModel.title = "";
            $timeout(function () {
                $scope.mmAdminDeptModel.title = "Create";
            }, 500);
            
            $scope.mmAdminDeptModel.categories = '';
            mmSrv.getAdminDept().success(function (data, status) {
                $scope.mmAdminDeptModel.departments = data.departments;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });
        }
        function editDept(dept) {

            // mmAdminDeptModel.dept.mDepCategory = dept.mdpDepCategory;
            $scope.mmAdminDeptModel.title = "";
            $scope.mmAdminDeptModel.dept = {};
            $timeout(function () {
                $scope.mmAdminDeptModel.title = "Edit";
            }, 500);
            $scope.mmAdminDeptModel.dept.deptId = dept.id;
            $scope.mmAdminDeptModel.dept.deptCategory = dept.category;
            $scope.mmAdminDeptModel.dept.deptName = dept.name;

        }

        function updateDept(dept) {
            if (dept) {
                if (dept.deptCategory && dept.deptName) {
                    dept.deptId = (dept.deptId ? dept.deptId : "new");
                    var jsonData = {
                        "departments": {
                            0: dept
                        }
                    };

                    mmSrv.updateAdminDept(jsonData).success(function (data, status) {
                        $scope.mmAdminDeptModel.dept = "";
                        $scope.mmAdminDeptModel.userForm.$setPristine();
                        $scope.mmAdminDeptModel.userForm.$setUntouched();
                        loadDept();
                        toaster.pop("success", "Data updated Successfully");

                    }).error(function (data, status) {
                        console.log(status);
                        console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                        toaster.pop("error", "Please try again later");
                    });
                } else {
                    toaster.pop("error", "Please fill neccessary feilds");
                }

            } else {
                toaster.pop("error", "Please fill neccessary feilds");
            }



        }

    }






    mmAdminExtAttCtrl.$inject = ['$rootScope', '$scope', '$modal', 'toaster', 'mmSrv','$timeout'];

    function mmAdminExtAttCtrl($rootScope, $scope, $modal, toaster, mmSrv,$timeout) {

        $scope.mmAdminExtAttModel = {};

        $scope.mmAdminExtAttModel.loadExtAtt = loadExtAtt;
        $scope.mmAdminExtAttModel.editExtAtt = editExtAtt;
        $scope.mmAdminExtAttModel.updateExtAtt = updateExtAtt;

        //$scope.mmAdminDeptModel.createDept = createDept;

        loadExtAtt();

        function loadExtAtt() {
            
            $timeout(function () {
                $scope.mmAdminExtAttModel.title = "Create";
            }, 500);
            $scope.mmAdminExtAttModel.categories = '';
            mmSrv.getAdminExtAtt().success(function (data, status) {
                $scope.mmAdminExtAttModel.externalAttendees = data.extAttendees;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });

        }

        function editExtAtt(extAtt) {
            $scope.mmAdminExtAttModel.title = "";
            $timeout(function () {
                $scope.mmAdminExtAttModel.title = "Update";
            }, 500);
            $scope.mmAdminExtAttModel.extAtt = {};
            $scope.mmAdminExtAttModel.extAtt.extAttId = extAtt.id;

            $scope.mmAdminExtAttModel.extAtt.extAttName = extAtt.name;
            $scope.mmAdminExtAttModel.extAtt.extAttEmail = extAtt.email;


        }


        function updateExtAtt(data) {
            if (data) {
                if (data.extAttName && data.extAttEmail) {
                    data.extAttId = (data.extAttId ? data.extAttId : "new");
                    var jsonData = {
                        "extAttendees": {
                            0: data
                        }
                    };
                    mmSrv.updateAdminExtAtt(jsonData).success(function (data, status) {
                        $scope.mmAdminExtAttModel.extAtt = "";
                        $scope.mmAdminExtAttModel.userForm.$setPristine();
                        $scope.mmAdminExtAttModel.userForm.$setUntouched();
                        loadExtAtt();
                        toaster.pop("success", "Data updated Successfully");

                    }).error(function (data, status) {
                        console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                        toaster.pop("error", "Please try again later");
                    });
                } else {
                    toaster.pop("error", "Please fill Neccessary feilds");
                }

            } else {
                toaster.pop("error", "Please fill Neccessary feilds");
            }


        }

    }

})();
