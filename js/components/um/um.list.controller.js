/*
 *umListController->this controller handle the view is um.list.tpl.html
 */


(function() {
  'use strict';
  angular.module(cartAppObj.id)
    .controller('umListCtrl', umListCtrl);

  umListCtrl.$inject = ['$scope', 'umSrv', '$modal', '$rootScope', 'toaster'];


  function umListCtrl($scope, umSrv, $modal, $rootScope, toaster) {

    $scope.umListModel = {}; //module name specification

    //STO method for object conversion
    $scope.umListModel.empStatus = {
      "y": "Yes",
      "n": "No"
    }

    $scope.umListModel.empType = {
      "P": "Permanent",
      "C": "Contract",
      "F": "Full Time",
      "X": "Others"
    }

    //ENO method for object conversion

    //STO function image upload
    // $scope.hoverIn = function() {
    //   this.hoverEdit = true;
    // };
    //
    // $scope.hoverOut = function() {
    //   this.hoverEdit = false;
    // };
    //ENO function image upload


    //STO function initialization

    $scope.umListModel.getEmpByLoc = getEmpByLoc;
    $scope.umListModel.umListEdit = umListEdit;
    $scope.umListModel.getempDepID = getempDepID;
    $scope.umListModel.createUm = createUm;
    $scope.umListModel.umReload = umReload; // inner page reload function
    $scope.umListModel.umAdd = umAdd;
    $scope.umListModel.hoverIn = hoverIn;
    $scope.umListModel.hoverOut = hoverOut;
    $scope.umListModel.usrRes = [];

    function hoverIn() {
      $scope.umListModel.hoverEdit = true;
    };

    function hoverOut() {
      $scope.umListModel.hoverEdit = false;
    };


    umReload();
    //ENO function initialization

    /* --sto add function--*/
    function umAdd() {
      $scope.umListModel.usrRes = '';
    }
    /* --eno add function--*/
    //STO function get userlist info

    function umReload() {

      $scope.umListModel.title = "Add new user";
      $scope.umListModel.btn = "Create";
      umSrv.getList().success(function(data, status) {
        if (data.users) {
          $scope.umListModel.empList = data.users;

          //sto predefined dropdown assign value

          $scope.umListModel.umUserlocation = data; //assign rest data
          var empLocName = $scope.umListModel.umUserlocation.homeLocId - 1;
          $scope.umListModel.empLoc = data.locations;
          $scope.umListModel.userlocations = $scope.umListModel.empLoc[empLocName];

          //eno predefined dropdown assign value
        }


      }).error(function(data, status) {
        console.log(status);
        console.log(data, "Failed to retrieve data from backend... Please try after sometime");

      });

    }
    //ENO function get userlist info



    //STO add function

    umSrv.getEmpListAddData().success(function(data, status) {
      if (data.locations) {
        $scope.umListModel.empLocations = data.locations;
      }
      if (data.departments) {
        $scope.umListModel.departments = data.departments;
      }


    }).error(function(data, status) {

      console.log(data, "Failed to retrieve data from backend... Please try after sometime");
    })

    function getempDepID(depId) {
      umSrv.getEmpDesgName(depId).success(function(data, status) {
        if (data.designations) {
          $scope.umListModel.empDesignations = data.designations;

        }
      }).error(function(status) {
        console.log(status);
      })
    }


    //STO function to get userlist info based on selected location


    function getEmpByLoc(empLocId) {

      umSrv.getEmpByLoc(empLocId).success(function(data, status) {
        if (data.users) {
          $scope.umListModel.empList = data.users;
        }


      }).error(function(data, status) {
        console.log(status);
        console.log(data, "Failed to retrieve data from backend... Please try after sometime");

      });
    };



    //ENO function to get userlist info based on selected location

    //ENO add function

    /* ------------STO method for view and Edit operation----------*/
    function umListEdit(usrList) {
      console.log("edited data", usrList);
      //$scope.umListModel.usrRes = usrList;
      $scope.umListModel.title = "Edit";
      $scope.umListModel.btn = "update";
      $scope.umListModel.usrRes.usrName = usrList.empWindowsId;
      $scope.umListModel.usrRes.empId = usrList.empNo;
      $scope.umListModel.usrRes.firstName = usrList.empFname;
      $scope.umListModel.usrRes.middleName = usrList.empMname;
      $scope.umListModel.usrRes.lastName = usrList.empLname;
      $scope.umListModel.usrRes.emailId = usrList.empEmailId
      $scope.umListModel.usrRes.phoneNo = usrList.empPhNo;
      $scope.umListModel.usrRes.desg = usrList.empDesgName;


      $scope.umListModel.usrRes.homeLoc = {
        "locName": usrList.empCurrentLocName,
        "id": usrList.empCurrentLocId
      }

      $scope.umListModel.usrRes.CurrentLoc = {
        "locName": usrList.empCurrentLocName,
        "id": usrList.empCurrentLocId
      }

      $scope.umListModel.usrRes.depName = {
        "depName": usrList.empDepName,
        "id": usrList.empDepId
      }

      $scope.umListModel.usrRes.desg = {
        "desgName": usrList.empDesgName,
        "id": usrList.empDesgId
      }

      $scope.umListModel.usrRes.gender = usrList.empGender;
      $scope.umListModel.getempDepID($scope.umListModel.usrRes.depName); //function para
      $scope.umListModel.usrRes.dob = usrList.empDob;
      $scope.umListModel.usrRes.doj = usrList.empDoj;
      $scope.umListModel.usrRes.status = usrList.empStatus;
      $scope.umListModel.usrRes.type = usrList.empType;
      $scope.umListModel.usrRes.gender = usrList.empGender.charAt(0);


      umSrv.getEmpWorkLoc(usrList).success(function(data, status) {
        if (data.locations) {
          $scope.umListModel.empLocations = data.locations;
        }
        if (data.departments) {
          $scope.umListModel.departments = data.departments;
        }

      }).error(function(status) {
        console.log(status);
      });


      function getempDepID(depId) {
        umSrv.getEmpDesgName(depId).success(function(data, status) {
          if (data.designations) {
            $scope.umListModel.empDesignations = data.designations;
          }


        }).error(function(status) {
          console.log(status);
        })
      }


    };

    //ajax process
    var imguL = '';

    function createUm(um) {
      console.log("um", um);


      if (um && !um.id) {

        var data = {
          "user": {
            "empPic": um.empPic,
            "active": um.status,
            "type": um.type,
            "novellid": um.usrName,
            "imanageid": um.empId,
            "emailid": um.emailId,
            "firstname": um.firstName,
            "middlename": um.middleName,
            "lastname": um.lastName,
            "phonenumber": um.phoneNo,
            "joiningdate": um.doj,
            "leavingdate": "",
            "dateofbirth": um.dob,
            "homelocation": um.homeLoc.id,
            "currentlocation": um.CurrentLoc.id,
            "department": um.depName.id,
            "gender": um.gender,
            "designation": um.desg.id
          }

        }

        umSrv.umCreate(data).success(function(data, status) {

          $scope.umListModel.usrRes = '';
          $scope.umListModel.userForm.$setPristine();
          $scope.umListModel.userForm.$setUntouched();
          umReload();
          toaster.pop("success", "user created successfully");
        }).error(function(status, data) {

          if (data.msg) {
            toaster.pop("error", data.msg);
          } else if (!data.msg) {
            toaster.pop("error", "Please fill the required feilds");
          }

        })

      } else if (um && um.id) {
        var data = {
          "user": {
            "id": um.id,
            "empPic": um.empPic,
            "active": um.status,
            "type": um.type,
            "novellid": um.usrName,
            "imanageid": um.empId,
            "emailid": um.emailId,
            "firstname": um.firstName,
            "middlename": um.middleName,
            "lastname": um.lastName,
            "phonenumber": um.phoneNo,
            "joiningdate": um.doj,
            "leavingdate": "",
            "dateofbirth": um.dob,
            "homelocation": um.homeLoc.id,
            "currentlocation": um.CurrentLoc.id,
            "department": um.depName.id,
            "gender": um.gender,
            "designation": um.desg.id
          }

        }

        umSrv.umUpdate(data).success(function(data, status) {
          $scope.umListModel.usrRes = '';
          $scope.umListModel.userForm.$setPristine();
          $scope.umListModel.userForm.$setUntouched();
          umReload();
          toaster.pop("success", "data updated successfully");

        }).error(function(status, data) {
          if (data.msg) {
            toaster.pop("error", "Session Timed Out");
          } else if (!data.msg) {
            toaster.pop("error", "Please fill the required feilds");
          }

        })
      }

    }

    /* $scope.$watch('userForm', function(theForm) {
     if(userForm) {
     //console.log(user)
     CheckStateChangeService.checkFormOnStateChange(userForm);
     }

     }); */

    /* ------------ENO method for view and Edit operation----------*/

    $scope.photoChanged = function(files) {
      $scope.files = files;
      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.umListModel.usrRes.empPic = e.target.result;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      };
      reader.readAsDataURL(files[0]);

    };

  }


  //ENO function get umlist

  //validation unit



})();
//-------------------------STO charactor validation function----------------


var isCharacter = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;
  // console.log(e)
  if (([9, 13, 27, 61, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) ||
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey))
    ))
    e.preventDefault();
}

//-------------------------ENO charactor validation function----------------

//----------------STO number validation function----------------------------
/*function isNumber(evt) {
 evt = (evt) ? evt : window.event;
 var charCode = (evt.which) ? evt.which : evt.keyCode;
 if (charCode > 31 && (charCode < 48 || charCode > 57)) {
 return false;
 }
 return true;
 }*/
/*function isNumberKey(evt)
 {
 var charCode = (evt.which) ? evt.which : event.keyCode
 console.log("charcode" ,charCode );
 if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
 return false;
 return true;
 }*/


function isNumberKey(evt) {

  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
    if (charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
      if (charCode != 32 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

  return true;

}




//----------------ENO number validation function----------------------------
