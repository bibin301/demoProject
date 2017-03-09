/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    'use strict';
    angular.module(cartAppObj.id)
            .controller('mmListCtrl', mmListCtrl);
    mmListCtrl.$inject = ['$rootScope', '$scope', 'toaster', '$modal', 'mmSrv'];
    function mmListCtrl($rootScope, $scope, toaster, $modal, mmSrv) {
        $scope.mmListModel = {};
        $scope.mmListModel.loadDept = loadList;
        $scope.mmListModel.checkTitle = checkTitle;
        $scope.mmListModel.removeDistributorList = removeDistributorList;
        $scope.mmListModel.createMeeting = createMeeting;
        $scope.mmListModel.timelineModal = timelineModal;
        $scope.mmListModel.create = {};
        $scope.mmListModel.create.mmAttendee = [];
        $scope.mmListModel.create.mmAdditionalAttendee = [];
        $scope.mmListModel.create.mmDistribution = [];
        $scope.mmListModel.isAuthorized = [];
        $scope.mmListModel.isAuthorized.create =
                $scope.mmListModel.isAuthorized.edit = true;
        $scope.mmListModel.editMetting = editMetting;
        loadList();
        function loadList() {
            $scope.mmListModel.title = "Create New";
            $scope.mmListModel.btn = "Create";
            mmSrv.getMeetingList().success(function (data, status) {
                $scope.mmListModel.mmList = $scope.appArray = data.mmlist;
            }).error(function (data, status) {
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                toaster.pop("error", "Server Problem");
            });
            mmSrv.getDeptList().success(function (data, status) {
                if (data.data) {
                    var data = data.data;
                    $scope.mmListModel.deptList = data.departments;
                    $scope.mmListModel.empList = data.employees;
                    $scope.mmListModel.extAttList = data.attendees;
                    $scope.mmListModel.titles = data.titles;
                    $scope.mmListModel.venues = data.venues;
                } else {
                    toaster.pop("error", "Server Problem");
                }
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                toaster.pop("error", "Server Problem");
            });
        }
        function removeDistributorList(emp) {
            for (var i = $scope.mmListModel.dsbtList - 1;i >= 0;i--) {
                if ($scope.mmListModel.dsbtList[i].email == emp.email) {
                    $scope.mmListModel.dsbtList.splice(i, 1);
                }
            }
        }
        function checkTitle(title) {
            function search(nameKey, myArray) {
                for (var i = 0;i < myArray.length;i++) {
                    if (myArray[i].title === nameKey) {
                        return myArray[i];
                    }
                }
            }
            var result = search(title, $scope.mmListModel.titles);
            if (result == null && result == undefined) {
                $scope.mmListModel.tittleError =
                        $scope.mmListModel.step1.$invalid = false;
            } else {
                $scope.mmListModel.tittleError =
                        $scope.mmListModel.step1.$invalid = true;
            }
            result = null;
            return false;
        }

        function createMeeting(data, condition) {
            if (data.id) {
                toaster.pop("info", "Work in progress");
            } else {
                var jsonData = {};
                jsonData.mmTitle = {
                    "type": "new",
                    "deptId": data.deptId,
                    "title": data.title
                };
                jsonData.data = {
                    "id": "new",
                    "deligate": "",
                    "mmNo": "1",
                    "mmDate": data.mmDate,
                    "mmStarttime": (data.mmStarttime ? data.mmStarttime.getHours() + ":" + data.mmStarttime.getMinutes() + ":" + data.mmStarttime.getSeconds() : ""),
                    "mmEndtime": (data.mmEndtime ? data.mmEndtime.getHours() + ":" + data.mmEndtime.getMinutes() + ":" + data.mmEndtime.getSeconds() : ""),
                    "mmVenue": data.mmVenue,
                    "mmAgenda": data.mmAgenda,
                    "mmDesc": data.mmDesc,
                    "anyOtherBusiness": data.anyOtherBusiness,
                    "nxtMmTime": "",
                    "mmSaved": (condition === "save" ? "y" : "n"),
                    "mmSent": (condition === "send" ? "y" : "n"),
                    "mmLocked": "n",
                    "mmAttendee": {
                        "ids": data.mmAttendee
                    },
                    "mmAdditionalAttendee": {
                        "ids": data.mmAdditionalAttendee
                    },
                    "mmDistribution": {
                        "ids": data.mmDistribution
                    },
                    "mmActions": {
                        "0": {
                            "id": "new",
                            "actId": 1,
                            "assignee": data.assignee,
                            "actDueDate": data.actDueDate,
                            "desc": data.desc,
                            "actStatus": "s"
                        }
                    }
                };
                mmSrv.createMeeting(jsonData).success(function (data, status) {
                    toaster.pop("success", "Created Successfully");
                    $scope.mmListModel.create = '';
                    $scope.mmListModel.showActionBtn = false;
                    loadList();
                }).error(function (data, status) {
                    console.log(status);
                    console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                    toaster.pop("error", "Server Problem");
                });
            }
        }
        //        set Time
        function toDateTimeObject(time) {
            var d = new Date();
            if (time) {
                var time = time.split(':');
                // creates a Date Object using the clients current time
                d.setHours(+time[0]);// set Time accordingly, using implicit type coercion
                d.setMinutes(time[1]);// you can pass Number or String, it doesn't matter
                d.setSeconds(time[2]);
            }
            return d;
        }
        function editMetting(id) {
            mmSrv.editMeeting(id).success(function (data, status) {
                var jsonData = data.data.mmdata;
                $scope.mmListModel.create = {
                    "type": "create",
                    "deptId": jsonData.mm.deptId,
                    "title": jsonData.mm.title,
                    "id": jsonData.mm.id,
                    "deligate": "",
                    "mmNo": jsonData.mm.meetingNumber,
                    "mmDate": jsonData.mm.createDate,
                    "mmStarttime": toDateTimeObject(jsonData.mm.CreateTime),
                    "mmEndtime": toDateTimeObject(jsonData.mm.endTime),
                    "mmVenue": jsonData.mm.meetingVenue,
                    "mmAgenda": jsonData.mm.agenda,
                    "mmDesc": jsonData.mm.minutesDesc,
                    "anyOtherBusiness": jsonData.mm.anyOtherBusiness,
                    "nxtMmTime": jsonData.mm.meetingNumber,
                    "mmSaved": jsonData.mm.meetingSaved,
                    "mmSent": jsonData.mm.meetingSent,
                    "mmLocked": jsonData.mm.meetingLocked,
                    "mmActions": jsonData.action
                };
                $scope.mmListModel.mmActions = jsonData.action;
                //for getting employee id
                function loadEmp(val1) {
                    var v2 = [];
                    angular.forEach(val1, function (value, key) {
                        if (value.attendeeId)
                            v2.push(value.attendeeId);
                        else if (value.distributionId)
                            v2.push(value.distributionId);
                    }, v2);
                    return v2;
                }

                function isAuthorizedToEdit() {
                    console.log(jsonData.mm.meetingSaved, jsonData.mm.meetingSent, jsonData.mm.meetingLocked, jsonData.mm.authorId, $rootScope.coreModel.userData.id);
                    if (jsonData.mm.meetingLocked.toLowerCase() === 'y') {
                        $scope.mmListModel.isAuthorized.edit = $scope.mmListModel.isAuthorized.create = false;
                        console.log("Not Authorized to edit and create !!");
                    } else if (jsonData.mm.meetingSaved.toLowerCase() === 'y' && jsonData.mm.meetingSent.toLowerCase() === 'y') {
                        console.log("Any one can edit  and create!");
                        $scope.mmListModel.isAuthorized.edit = true;
                        $scope.mmListModel.isAuthorized.create = true;
                    } else if (jsonData.mm.meetingSent.toLowerCase() === 'n') {
                        if ($rootScope.coreModel.userData.id === jsonData.mm.authorId) {
                            console.log("Author can create and edit   !");
                            $scope.mmListModel.isAuthorized.edit = true;
                            $scope.mmListModel.isAuthorized.create = true;
                        } else if (jsonData.mm.meetingSaved.toLowerCase() === 'y') {
                            console.log("User can Edit not Create");
                            $scope.mmListModel.isAuthorized.edit = true;
                            $scope.mmListModel.isAuthorized.create = false;
                        } else {
                            console.log("Not Authorized for edit only view 2");
                            $scope.mmListModel.isAuthorized.edit = false;
                            $scope.mmListModel.isAuthorized.create = false;
                        }
                    } else {
                        $scope.mmListModel.isAuthorized.edit = false;
                        $scope.mmListModel.isAuthorized.create = false;
                        console.log("Not Authorized for edit only view 4");
                    }
                }

                isAuthorizedToEdit();
                $scope.mmListModel.create.mmAttendee = loadEmp(jsonData.attendee);
                $scope.mmListModel.create.mmAdditionalAttendee = loadEmp(jsonData.externalattendee);
                $scope.mmListModel.create.mmDistribution = loadEmp(jsonData.distribution);
            }).error(function (data, status) {
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
                toaster.pop("error", "Server Problem");
            });
        }
        function timelineModal(data) {
            $scope.mmListModel.data = data;

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: $rootScope.cartAppObj.componentBasePath + 'mm/mm.action.modal.tpl.html',
                controller: 'mmMoadalActionListCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return $scope.mmListModel.data;
                    }
                }
            });
        }
    }


    angular.module(cartAppObj.id)
            .controller('mmMoadalActionListCtrl', mmMoadalActionListCtrl);
    /*StoryModal Controller Defenition*/
    mmMoadalActionListCtrl.$inject = ['$scope', '$modalInstance', 'data'];

    function mmMoadalActionListCtrl($scope, $modalInstance, data) {
        $scope.mmModalActionModel = {};
        $scope.mmModalActionModel.list = [];

        var a = data.match(/[^\r\n]+/g);
        $scope.mmModalActionModel.data = a;
        angular.forEach(a, function (val) {
            var data1 = val.split(":");
            $scope.mmModalActionModel.list.push({"date": data1[0], "value": data1[1]});

        });
        console.log($scope.mmModalActionModel.list);
        $scope.mmModalActionModel.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
    ;



})();