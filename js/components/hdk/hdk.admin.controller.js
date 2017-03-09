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

/* CartApp HDK Admin Categoty  controller : js/components/Hdk/hdk.admin.category.tpl.html */
(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .controller('hdkAdminCategoryCtrl', hdkAdminCategoryCtrl)
            .controller('hdkAdminAreaCtrl', hdkAdminAreaCtrl);

    hdkAdminCategoryCtrl.$inject = ['$rootScope', '$scope', '$modal', '$location', '$stateParams', 'toaster', 'hdkSrv', '$timeout'];
    function hdkAdminCategoryCtrl($rootScope, $scope, $modal, $location, $stateParams, toaster, hdkSrv, $timeout) {

        $scope.hdkAdminCategoryModel = {};

        $scope.hdkAdminCategoryModel.loadCategory = loadCategory;
        $scope.hdkAdminCategoryModel.editCat = editCat;
        $scope.hdkAdminCategoryModel.createCat = createCat;

        loadCategory();
        function loadCategory() {

            $scope.hdkAdminCategoryModel.title = "";
            $timeout(function () {
                $scope.hdkAdminCategoryModel.title = "Create";
            }, 500);

            hdkSrv.getCategoryDetails().success(function (data, status) {
                $scope.hdkAdminCategoryModel.categories = data.categories;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });
            hdkSrv.getCategoryList().success(function (data, status) {
                $scope.hdkAdminCategoryModel.catLocations = data.locations;
                $scope.hdkAdminCategoryModel.catUsers = data.users;

            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");

            });

        }
        function editCat(cat) {
            $scope.hdkAdminCategoryModel.cat = cat;
            $scope.hdkAdminCategoryModel.title = "";
            $timeout(function () {
                $scope.hdkAdminCategoryModel.title = "Update";
            }, 500);
            //$scope.hdkAdminCategoryModel.response = cat;

            $scope.hdkAdminCategoryModel.response.catId = cat.depId;
            $scope.hdkAdminCategoryModel.response.name = cat.depName;
            $scope.hdkAdminCategoryModel.response.comment = cat.cmt;
            $scope.hdkAdminCategoryModel.response.managerid = {
                "empName": cat.mgrName,
                "id": cat.mgrId,
                "homeLocId": cat.locId

            };
            $scope.hdkAdminCategoryModel.response.ownerid = {
                "empName": cat.ownName,
                "id": cat.ownid,
                "homeLocId": cat.locId

            };
            $scope.hdkAdminCategoryModel.response.locid = {
                "locName": cat.locName,
                "id": cat.locId,
            };
        }

        function createCat(res) {

            // if(res){

            if (!res.catId) {
                if (!res.name || !res.locid || !res.managerid || !res.ownerid) {
                    toaster.pop("error", "Please check the data you have filled");
                } else if (res) {
                    if (res.name && res.locid && res.managerid && res.ownerid) {
                        hdkSrv.createCat(res).success(function (data, status) {
                            $scope.hdkAdminCategoryModel.response = '';
                            $scope.hdkAdminCategoryModel.userForm.$setPristine();
                            $scope.hdkAdminCategoryModel.userForm.$setUntouched();
                            loadCategory();
                            toaster.pop("success", "New Cateogry Created Successfully");
                        }).error(function (data, status) {
                            console.log(status);
                            if (data.msg) {
                                toaster.pop("error", data.msg);
                            } else if (!data.msg) {
                                toaster.pop("error", "Please fill the required feilds");
                            }
                            console.log(data, "Failed to retrieve data from backend... Please try after sometime");

                        });
                    } else {
                        toaster.pop("error", "Please check the data you have filled");
                    }
                }
            } else if (res.catId) {
                if (res.name && res.locid && res.managerid && res.ownerid) {
                    var data = {
                        "locid": (!res.locid.id ? res.locid : res.locid.id),
                        "ownerid": (!res.ownerid.id ? res.ownerid : res.ownerid.id),
                        "managerid": (!res.managerid.id ? res.managerid : res.managerid.id),
                        "id": res.catId,
                        "name": res.name,
                        "comment": res.comment
                    }
                    hdkSrv.updateCat(data).success(function (data, status) {
                        $scope.hdkAdminCategoryModel.response = '';
                        $scope.hdkAdminCategoryModel.userForm.$setPristine();
                        $scope.hdkAdminCategoryModel.userForm.$setUntouched();
                        loadCategory();
                        toaster.pop("success", "Cateogry Updated Successfully");

                    }).error(function (data, status) {
                        console.log(status);
                        toaster.pop("error", data.msg);
                        console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                    });
                } else {
                    toaster.pop("error", "Please check the data you have filled");
                }

            } else {
                toaster.pop("error", "Please check the data you have filled");
            }
        }
    }




    hdkAdminAreaCtrl.$inject = ['$rootScope', '$scope', '$location', '$stateParams', 'toaster', 'hdkSrv'];
    function hdkAdminAreaCtrl($rootScope, $scope, $location, $stateParams, toaster, hdkSrv) {

        $scope.hdkAdminAreaModel = {};

        $scope.hdkAdminAreaModel.loadArea = loadArea;
        $scope.hdkAdminAreaModel.editArea = editArea;
        $scope.hdkAdminAreaModel.updateArea = updateArea;
        $scope.hdkAdminAreaModel.response = {};
        $scope.hdkAdminAreaModel.SLA = {
            "0": {
                "name": 1
            },
            "1": {
                "name": 2
            },
            "2": {
                "name": 3
            },
            "3": {
                "name": 4
            },
            "4": {
                "name": 5
            }
        };


        loadArea();
        function loadArea() {

            $scope.hdkAdminAreaModel.categories = '';
            hdkSrv.getAreaDetails().success(function (data, status) {
                $scope.hdkAdminAreaModel.areaList = data.data;

            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });


        }

        function editArea(id, type, depName, area) {

            if (type === "add") {
                //For Add new Area details
                $scope.hdkAdminAreaModel.response = {
                    departmentid: id,
                    department: depName,
                    name: ""
                };

                $scope.hdkAdminAreaModel.title = "Create";
                hdkSrv.getAddAreaDetails().success(function (data, status) {
                    $scope.hdkAdminAreaModel.users = data.users;
                    $scope.hdkAdminAreaModel.locations = data.locations;

                }).error(function (data, status) {
                    console.log(status);
                    console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                });
            } else if (type === "edit") {
                $scope.hdkAdminAreaModel.response = {
                    departmentid: id,
                    department: depName,
                    id: area.catId,
                    name: area.catName,
                    sladays: ''
                };
                $scope.hdkAdminAreaModel.title = "Update";
                hdkSrv.getAreaEditDetails(area.catId).success(function (data, status) {
                    $scope.hdkAdminAreaModel.users = data.users;
                    $scope.hdkAdminAreaModel.locations = data.locations;
                    $scope.hdkAdminAreaModel.response.sladays = Math.round(data.area.slaDay);
                    $scope.hdkAdminAreaModel.response.ownerid = data.area.ownId;
                    $scope.hdkAdminAreaModel.response.managerid = data.area.mgrId;
                    $scope.hdkAdminAreaModel.response.locid = data.area.locId;

                }).error(function (data, status) {
                    console.log(status);
                    console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                });
            }

        }

        function updateArea(data) {
            if (data.id) {
                hdkSrv.updateArea(data).success(function (data, status) {
                    $scope.hdkAdminAreaModel.response = '';
                    loadArea();
                    $scope.hdkAdminAreaModel.response = {
                        departmentid: '',
                        department: '',
                        id: '',
                        name: '',
                        sladays: ''
                    };
                    toaster.pop("success", "Area updated successfully");
                }).error(function (data, status) {
                    console.log(status);
                    console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                });

            } else {
                hdkSrv.addArea(data).success(function (data, status) {
                    $scope.hdkAdminAreaModel.response = {
                        departmentid: '',
                        department: '',
                        id: '',
                        name: ''
                    };
                    loadArea();
                    toaster.pop("success", "New Area Added successfully");
                }).error(function (data, status) {
                    toaster.pop("error", "Please check the data you have filled");
                    console.log(status);
                    console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                });

            }
        }
    }
})();


