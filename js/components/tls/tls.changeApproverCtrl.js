(function() {
  'use strict';
  angular.module(cartAppObj.id).controller('changeApproverCtrl', changeApproverCtrl);
  changeApproverCtrl.$inject = ['$scope', 'tlsSrv', 'toaster'];

  function changeApproverCtrl($scope, tlsSrv, toaster) {

    $scope.changeApproverModel = {};
    $scope.changeApproverModel.usrRes = {};


    /*sto function */
    $scope.changeApproverModel.getSelectedStatus = getSelectedStatus;
    $scope.changeApproverModel.getPhase = getPhase; //phase
    $scope.changeApproverModel.getActivity = getActivity; // activity
    $scope.changeApproverModel.getTask = getTask;
    $scope.changeApproverModel.checkAll = checkAll;
    $scope.changeApproverModel.check1 = check1;
    $scope.changeApproverModel.getUpdateData = getUpdateData;
    $scope.changeApproverModel.getValue = getValue;
    $scope.changeApproverModel.getAll = getAll;

    /*eno function */


    /*
     *sto activity selection -section
     */
    tlsSrv.getchangeApprover().success(function(data) {

      $scope.changeApproverModel.approverData = data.data;


    }).error(function() {
      //console.log("failed");
    });


    /*
     *eno activity selection
     */

    /*sto
     *function->getSelectedStatus
     *@desc-> this function handled -> based on the activity selection show and hide
     */
    function getSelectedStatus(sel) {

      tlsSrv.getProjectInfo(sel.id).success(function(data) {

        $scope.changeApproverModel.usrOption = sel.name;

        if (sel.name == 'Project') {

          $scope.changeApproverModel.showPrj = true;

          $scope.changeApproverModel.showPhase = false;
          $scope.changeApproverModel.showAct = false;
          $scope.changeApproverModel.showTsk = false;
          $scope.changeApproverModel.sectionOne = true;
          $scope.changeApproverModel.sectionTwo = false;
          $scope.changeApproverModel.title = "Project Edit";
          if (data) {
            $scope.changeApproverModel.projects = data.projects; //project
            $scope.changeApproverModel.empName = data.empName;
          }

        } else if (sel.name == 'Phase') {
          //$scope.changeApproverModel.phase = data.data;
          $scope.changeApproverModel.showPrj = true;
          $scope.changeApproverModel.showPhase = true;
          $scope.changeApproverModel.showAct = false;
          $scope.changeApproverModel.showTsk = false;
          $scope.changeApproverModel.sectionTwo = false;
          $scope.changeApproverModel.sectionOne = true;
          $scope.changeApproverModel.title = "Phase Edit";
          if (data) {
            $scope.changeApproverModel.projects = data.projects; //project
            $scope.changeApproverModel.empName = data.empName;
          }

        } else if (sel.name == 'Activity') {
          $scope.changeApproverModel.showPrj = true;
          $scope.changeApproverModel.showPhase = true;
          $scope.changeApproverModel.showAct = true;
          $scope.changeApproverModel.showTsk = false;
          $scope.changeApproverModel.sectionTwo = false;
          $scope.changeApproverModel.sectionOne = true;
          $scope.changeApproverModel.title = "Activity Edit";
          if (data) {
            $scope.changeApproverModel.projects = data.projects; //project
            $scope.changeApproverModel.empName = data.empName;
          }

        } else if (sel.name == 'Task') {

          $scope.changeApproverModel.showPrj = true;
          $scope.changeApproverModel.showPhase = true;
          $scope.changeApproverModel.showAct = true;
          $scope.changeApproverModel.showTsk = true;
          $scope.changeApproverModel.sectionTwo = false;
          $scope.changeApproverModel.sectionOne = true;
          $scope.changeApproverModel.title = "Task Edit";
          if (data) {
            $scope.changeApproverModel.projects = data.projects; //project
            $scope.changeApproverModel.empName = data.empName;
          }

        } else if (sel.name == 'Approver') {

          //console.log("get approver data", data);
          $scope.changeApproverModel.changeBy = data.approver;
          $scope.changeApproverModel.changeApprover = data.empName;
          $scope.changeApproverModel.showPrj = false;

          $scope.changeApproverModel.showPhase = false;
          $scope.changeApproverModel.showAct = false;
          $scope.changeApproverModel.showTsk = false;
          $scope.changeApproverModel.sectionTwo = true;
          $scope.changeApproverModel.sectionOne = false;
          $scope.changeApproverModel.title = "Approver Edit";

        };

      }).error(function(error) {
        //console.log("failed");
      });

    };

    /*
     *eno  getSelectedStatus function
     */


    /*sto
     *@function ->getPhase
     *@desc-> based on the prj id get phase
     */

    function getPhase(prj) {
      console.log(prj);
      $scope.changeApproverModel.phase = [];
      if (typeof prj == 'undefined' || prj == null) {
        return;
      } else {
        if (typeof prj.prjId == 'undefined') {
          return;
        }
      }
      tlsSrv.getPhaseInfo(prj.prjId).success(function(data) {
        //console.log("get phase", data);
        if (data) {
          $scope.changeApproverModel.phase = data.data;
        }

      }).error(function(err) {
        //console.log("failed");
      });
    };

    /*
     *eno getPhase function
     */

    /*sto
     *@function ->getActivity
     *@desc-> based on the phs id get Activity
     */

    function getActivity(phs) {
      $scope.changeApproverModel.activity = [];
      if (typeof phs == "undefined" || phs == null) {
        return;
      } else {
        if (typeof phs.phsId == "undefined") {
          return;
        }
      }
      tlsSrv.getActInfo(phs.phsId).success(function(data) {
        //console.log("act information", data);
        if (data) {
          $scope.changeApproverModel.activity = data.activities;
        }

      }).error(function(err) {
        //console.log("failed");
      });
    };
    /*
     *eno getActivity function
     */

    /*sto
     *@function ->getTask
     *@desc-> based on the act id get Task
     */

    function getTask(act) {
      $scope.changeApproverModel.task = [];
      if (typeof act == "undefined" || act == null) {
        return;
      } else {
        if (typeof act.id == "undefined") {
          return;
        }
      }
      tlsSrv.getTaskInfo(act.id).success(function(data) {
        //console.log("get task info", data);
        if (data) {
          $scope.changeApproverModel.task = data.tasks;
        }

      }).error(function(error) {
        //console.log("failed");
      });
    };
    /*
     *end getTask function
     */


    /*
     *STO function check all function
     */

    function checkAll() {
      if (typeof $scope.changeApproverModel.usrRes.Approver == 'undefined' || $scope.changeApproverModel.usrRes.Approver == null) {
        return;
      }
      angular.forEach($scope.changeApproverModel.usrRes.Approver.prjDetials, function(prj) {
        prj.selected = $scope.changeApproverModel.check;
      });

    };

    function check1() {

      if (typeof $scope.changeApproverModel.usrRes.Approver == 'undefined' || $scope.changeApproverModel.usrRes.Approver == null) {
        return;
      }
      var found = true;
      angular.forEach($scope.changeApproverModel.usrRes.Approver.prjDetials, function(prj) {
        if (prj.selected == false) {
          found = false;
        }
      });
      $scope.changeApproverModel.check = found;
    };

    /*
     *eno function check all function
     */


    /*
     *sto check box selection function single
     */

    $scope.changeApproverModel.singleCheckedValue = [];

    function getValue(val) {
      var idx = $scope.changeApproverModel.singleCheckedValue.indexOf(val);
      if (idx > -1) {
        $scope.changeApproverModel.singleCheckedValue.splice(idx, 1);
      } else {
        $scope.changeApproverModel.singleCheckedValue.push(val);
        //console.log("single", $scope.changeApproverModel.singleCheckedValue);
      }

    };
    /*
     *eno check box selection function single
     */



    /*
     *sto check box selection function many
     */

    $scope.changeApproverModel.multipleCheckedValue = [];

    function getAll(val) {
      angular.forEach(val, function(itm) {
        //console.log(itm);
        var idx = $scope.changeApproverModel.multipleCheckedValue.indexOf(itm);
        if (idx > -1) {
          $scope.changeApproverModel.multipleCheckedValue.splice(itm, 1);
          $scope.changeApproverModel.check = false;
        } else {
          $scope.changeApproverModel.multipleCheckedValue.push(itm);

        }
      });

    };



    /*
     *update function
     */




    function getUpdateData(res) {

      var performAction = false;
      var serverData = [];

      var currData = {};

      currData.prjId = 0;
      currData.phsId = 0;
      currData.actId = 0;
      currData.prjId = 0;
      currData.pgmId = 0;

      if ((typeof res.project == 'undefined') || (typeof res.changeApprover == 'undefined')) {

        if ($scope.changeApproverModel.usrOption == "Approver") {

          if ((typeof $scope.changeApproverModel.usrRes.change == 'undefined') ||
            (($scope.changeApproverModel.usrRes.change <= 0) ||
              res.Approver.prjDetials == 'undefined' ||
              res.Approver.prjDetials.length <= 0)) {
            alert("Data incomplete");
            return;
          }
          performAction = true;

          angular.forEach($scope.changeApproverModel.usrRes.Approver.prjDetials, function(val) {
            ////console.log(val);
            //	angular.forEach(val, function(val1) {

            if (val.selected) {
              var val1 = val;
              //console.log(val1);

              var lcurrData = {};

              if (typeof val1.prjId != 'undefined') {
                lcurrData.prjId = val1.prjId;
              } else {
                lcurrData.prjId = 0;
              }
              if (typeof val1.phsId != 'undefined') {
                lcurrData.phsId = val1.phsId;
              } else {
                lcurrData.phsId = 0;
              }
              if (typeof val1.actId != 'undefined') {
                lcurrData.actId = val1.actId;
              } else {
                lcurrData.actId = 0;
              }
              if (typeof val1.tskId != 'undefined') {
                lcurrData.tskId = val1.tskId;
              } else {
                lcurrData.tskId = 0;
              }
              if (typeof val1.tskId != 'undefined') {
                lcurrData.pgmId = val1.pgmId;
              } else {
                lcurrData.pgmId = 0;
              }
              //currData.actId = val1.actID;
              //currData.tskId = val1.tskID;
              lcurrData.approver = $scope.changeApproverModel.usrRes.change.id;
              serverData.push(lcurrData);
              console.log(lcurrData);
              ////console.log(val1.prjName);
              ////console.log("sorted data....", val1.prjName);
            }

            //	});
          });
        } else {
          alert("Data incomplete");
          return;
        }
      } else {
        if ($scope.changeApproverModel.usrOption == "Project") {
          performAction = true;
          currData.prjId = res.project.prjId;
          currData.phsId = 0;
          currData.actId = 0;
          currData.tskId = 0;
        } else if ($scope.changeApproverModel.usrOption == "Phase") {
          performAction = true;
          currData.prjId = res.project.prjId;
          currData.phsId = res.pha.phsId;
          currData.actId = 0;
          currData.tskId = 0;
        } else if ($scope.changeApproverModel.usrOption == "Activity") {
          performAction = true;
          currData.prjId = res.project.prjId;
          currData.phsId = res.pha.phsId;
          currData.actId = res.act.id;
          currData.tskId = 0;
        } else if ($scope.changeApproverModel.usrOption == "Task") {
          performAction = true;
          currData.prjId = res.project.prjId;
          currData.phsId = res.pha.phsId;
          currData.actId = res.act.id;
          currData.tskId = res.tsk.id;
        }
      }

      if (performAction == true) {
        if ($scope.changeApproverModel.usrOption != "Approver") {
          currData.approver = res.changeApprover.id
          serverData.push(currData);
          //serverData.push(currData);
        }
        //console.log("Will be submitting the data to the server...");
        //console.log(serverData);
        alert("Sent data to server");
      } else {
        alert("No action taken...");
      }



      var data = [];

      angular.forEach(serverData, function(val, key) {
        console.log(val, key);
        data[key] = {
          "prjId": val.prjId,
          "phsId": val.phsId,
          "actId": val.actId,
          "tskId": val.tskId,
          "appId": val.approver,
          "pgmId": val.pgmId
        }

      });
      console.log(data);

      tlsSrv.update(data).success(function(data) {
        //console.log("success");
        $scope.changeApproverModel.multipleCheckedValue = [];
        toaster.pop("success", "success");
      }).error(function(err) {
        //console.log("failed");
        toaster.pop("error", "failed to update,please try again");

      });
    };
  }

})();
