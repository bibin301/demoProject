/*
 *
 *
 */


(function() {
  'use strict';
  angular.module(cartAppObj.id).controller('wriListCtl', wriListCtl);
  wriListCtl.$inject = ['$scope', 'tlsSrv', 'toaster'];

  function wriListCtl($scope, tlsSrv, toaster) {
    $scope.wriListModel = {};
    $scope.wriListModel.title = "Add new Wri";
    $scope.wriListModel.btn = "Create";
    /*--sto function initilization--*/
    $scope.wriListModel.wriListDelete = wriListDelete;
    $scope.wriListModel.wriListEdit = wriListEdit;
    $scope.wriListModel.wriListUpdate = wriListUpdate;
    $scope.wriListModel.wriReload = wriReload;
    /*--eno function initilization--*/
    wriReload();


    /*sto wrt list get function*/
    function wriReload() {
      tlsSrv.getWriList().success(function(data) {
        $scope.wriListModel.wriList = data.wri;
        console.log("wrilist", $scope.wriListModel.wriList);

      }).error(function(status, headers, data) {
        console.log("failed to retrive wrilist from backend");

      });
    };
    /*eno wrt list get function*/


    /*--sto wrilist delete function*/
    function wriListDelete(listObj) {
      alert("would you like to delete");

      tlsSrv.wriListDelete(listObj).success(function(data) {

      }).error(function(data, status) {

      })
    };
    /*--eno wrilist delete function*/

    /*--sto wri add function--*/
    tlsSrv.getWriListNewdata().success(function(data) {
      console.log("new wri", data);

      $scope.wriListModel.wriClients = data.clients;
      $scope.wriListModel.Locations = data.locations;
      $scope.wriListModel.Employees = data.users;
      $scope.wriListModel.currencyDetials = data.currency;
      $scope.wriListModel.ProjectTypes = data.prjType;
      $scope.wriListModel.ProjectAreas = data.prjArea;
    }).error(function(data, status) {
      console.log("failed");
    });
    /*--eno wri add function--*/

    /*--sto wrilist edit function--*/

    function wriListEdit(wriListObj) {


      console.log("edit obj", wriListObj);
      $scope.wriListModel.title = "Edit Wri";
      $scope.wriListModel.btn = "update";


      $scope.wriListModel.usrRes = wriListObj;
      $scope.wriListModel.usrRes.wriNo = wriListObj.wriNo;
      $scope.wriListModel.usrRes.wriCNo = '';

      $scope.wriListModel.usrRes.prjLoc = {
        "locName": wriListObj.locName,
        "id": wriListObj.locId
      }
      $scope.wriListModel.usrRes.client = {
        "clientName": wriListObj.clientName,
        "clientId": wriListObj.clientId
      }

      $scope.wriListModel.usrRes.wrkListNo = '';
      $scope.wriListModel.usrRes.prjCode = wriListObj.prjCode;
      $scope.wriListModel.usrRes.prjTitle = '';

      $scope.wriListModel.usrRes.prjtype = {

      }

      $scope.wriListModel.usrRes.prjarea = {

      }
      $scope.wriListModel.usrRes.prjMgr = {
        "empName": wriListObj.prjMgrName,
        "id": wriListObj.prjMgrId
      }

      $scope.wriListModel.usrRes.pgmMgr = {
        "empName": wriListObj.prjMgrName,
        "id": wriListObj.prjMgrId
      }

      $scope.wriListModel.usrRes.prjSt = wriListObj.prjStatus;

      $scope.wriListModel.usrRes.prjtype = {

      }
      $scope.wriListModel.usrRes.estimate = '';

      tlsSrv.getWriListEditData(wriListObj).success(function(data) {
        console.log("get wri edit data", data);

      }).error(function(data, status) {

      })

    };

    /*--eno wrilist edit function--*/

    function wriListUpdate(cre) {
      console.log("add mwri", cre);
      if (!cre.wriId) {


        var data = {
          "wri": {
            "wriNo": cre.wriNo,
            "clientId": cre.client.clientId,
            "prjLoc": cre.prjLoc.id,
            "workListNo": cre.wrkListNo,
            "contractNo": cre.wriCNo,
            "prjTitle": cre.prjTitle,
            "prjCode": cre.prjCode,
            "prjTypeId": cre.prjtype.prjTypeId,
            "prjAreaId": cre.prjarea.prjAreaId,
            "prjStatus": cre.prjSt,
            "prjMgr": cre.prjMgr.id,
            "pgmMgr": cre.pgmMgr.id,
            "prjOvertimeApplicable": cre.overtime,
            "workRequired": cre.cmt,
            "report": {
              "weekly": {
                "progressRpt": cre.progress,
                "effortChart": cre.effort,
                "resourceChart": cre.rChart,
                "progressChart": cre.pChart,
                "scheduleVariance": cre.shedule,
                "sqaPeriodic": cre.per,
                "riskLog": cre.risk,
                "issuesActionsLog": cre.act
              },
              "monthly": {
                "prjList": cre.prjList,
                "prjSummaryReport": cre.sum,
                "staffAllocationForecast": cre.staff
              }
            },
            "plannedStartDate": cre.sDate,
            "plannedFinishDate": cre.fDate,
            "actualStartDate": cre.asd,
            "actualFinishDate": cre.fDate,
            "issuedBy": cre.isBy.id,
            "issuedDate": cre.IsDate,
            "acceptedBy": cre.acceptBy.id,
            "acceptedDate": cre.accept,
            "currency": cre.cur.currencyId,
            "initialEstimate": cre.estimate.currencyId,
            "contractType": cre.cType,
            "cmt": cre.comment
          }

        };
        tlsSrv.wriCreate(data).success(function(data, status) {
          wriReload();
          $scope.wriListModel.usrRes = '';
          $scope.wriListModel.userForm.$setPristine();
          $scope.wriListModel.userForm.$setUntouched();
          toaster.pop("success", "Successfully created");

        }).error(function(status, data) {
          toaster.pop("error", "Server Problem");


        });



      } else if (cre.wriId) {

        var data = {
          "wri": {
            "wriId": cre.wriId,
            "wriNo": cre.wriNo,
            "clientId": cre.client.clientId,
            "prjLoc": cre.prjLoc.id,
            "workListNo": cre.wrkListNo,
            "contractNo": cre.wriCNo,
            "prjTitle": cre.prjTitle,
            "prjCode": cre.prjCode,
            "prjTypeId": cre.prjtype.prjTypeId,
            "prjAreaId": cre.prjarea.prjAreaId,
            "prjStatus": cre.prjSt,
            "prjMgr": cre.prjMgr.id,
            "pgmMgr": cre.pgmMgr.id,
            "prjOvertimeApplicable": cre.overtime,
            "workRequired": cre.cmt,
            "report": {
              "weekly": {
                "progressRpt": cre.progress,
                "effortChart": cre.effort,
                "resourceChart": cre.rChart,
                "progressChart": cre.pChart,
                "scheduleVariance": cre.shedule,
                "sqaPeriodic": cre.per,
                "riskLog": cre.risk,
                "issuesActionsLog": cre.act
              },
              "monthly": {
                "prjList": cre.prjList,
                "prjSummaryReport": cre.sum,
                "staffAllocationForecast": cre.staff
              }
            },
            "plannedStartDate": cre.sDate,
            "plannedFinishDate": cre.fDate,
            "actualStartDate": cre.asd,
            "actualFinishDate": cre.fDate,
            "issuedBy": cre.isBy.id,
            "issuedDate": cre.IsDate,
            "acceptedBy": cre.acceptBy.id,
            "acceptedDate": cre.accept,
            "currency": cre.cur.currencyId,
            "initialEstimate": cre.estimate.currencyId,
            "contractType": cre.cType,
            "cmt": cre.comment
          }

        };
        tlsSrv.wriUpdate(data).success(function(data) {
          wriReload();
          $scope.wriListModel.usrRes = '';
          $scope.wriListModel.userForm.$setPristine();
          $scope.wriListModel.userForm.$setUntouched();
          toaster.pop("success", "successfully updated");

        }).error(function(data, status) {
          toaster.pop("error", "server problem");
        });


      };

    };



  };


})();


//----------------STO number validation function----------------------------
function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
//----------------ENO number validation function----------------------------
