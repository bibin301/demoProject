(function() {
  'use strict';
  angular.module(cartAppObj.id).controller('approvalCtrl', approvalCtrl);
  approvalCtrl.$inject = ['$scope', 'tlsSrv', 'toaster'];

  function approvalCtrl($scope, tlsSrv, toaster) {
    $scope.approvalModel = {};
    $scope.approvalModel.editData = editData;
    $scope.approvalModel.update = update;
    $scope.approvalModel.tableCollabse = true

    $scope.approvalModel.tableShow = true;
    $scope.approvalModel.usrRes = '';




    tlsSrv.getApprovalList().success(function(data) {
      $scope.approvalModel.approvalList = data.weekData;

    }).error(function(status, headers, data) {
      console.log("failed to retrive wri list from backend");

    });



    $scope.approvalModel.weekRecords = [];
    console.log("get weekRecords", $scope.approvalModel.weekRecords);

    //var weekInfo = $scope.approvalModel.weekRecords;
    //$scope.approvalModel.weekRecordsData = generateWeelyReport(weekInfo);


    function editData(list) {
      //$scope.approvalModel.

      /*sto logic goes to index wise data push and splice*/

      var idx = $scope.approvalModel.weekRecords.indexOf(list);

      if (idx > -1) {
        $scope.approvalModel.weekRecords.splice(idx, 1);
      } else {

        try {
          if (list.createdRec != true) {
            //list.status = '';
            list.aprCmt = '';
            list.tableShow = true;
            list.createdRec = true;
            console.log("get recorded data", list.status);

            /*  if (list.status) {
                var tableshow = true;
              } else if (!list.status) {
                var tableshow = false;
              }*/
            //$scope.approvalModel.weekTable = list.status;

            list.weekRecord = generateWeeklyReport(list.weekRecord);
          }
        } catch (e) {
          //list.status = 'A';
          list.aprCmt = '';
          list.tableShow = true;
          list.createdRec = true;
          //$scope.approvalModel.weekTable = list.status;

          /*  if (list.status) {
              var tableshow = true;
            } else if (!list.status) {
              var tableshow = false;
            }*/

        }
        $scope.approvalModel.weekRecords.push(list);

      }

      /*eno logic goes to index wise data push and splice*/

      //$scope.approvalModel.usrRes = list;
      //$scope.approvalModel.usrRes.description = list.cmt;
      //$scope.approvalModel.startD = list.startDate;
      //$scope.approvalModel.endD = list.endDate;
      //$scope.approvalModel.tableShow = true;
    };


    function generateWeeklyReport(weekData) {
      console.log("get week records", weekData);
      var weekReportData = [];
      var weekUsrCmtId = [];
      var indx = 0;
      $scope.approvalModel.weekReportHours = [];

      angular.forEach(weekData, function(day) {
        indx = weekUsrCmtId.indexOf(day.usrCmtId);
        if (indx == -1) {
          var effData = Array("", "", "", "", "", "", "");
          var phatData = Array(day.prjName, day.phsName, day.actName, day.tskName);

          var cmtData = {
            cmtId: day.usrCmtId,
            cmtTxt: day.usrCmt,
            sHours: day.swipe,
            usrStatus: day.status
          };


          var rec = {
            weekReportHours: effData,
            cmtData: cmtData,
            phatData: phatData
          };

          //$scope.approvalModel.commentBox = cmtData.usrStatus;
          console.log("comment status", $scope.approvalModel.commentBox);
          weekUsrCmtId.push(day.usrCmtId);
          weekReportData.push(rec);
          indx = weekUsrCmtId.length - 1;

          //$scope.approvalModel.weekReportHours[indx] = Array("", "", "", "", "", "", "");
        }
        var dayId = new Date(day.date).getDay();

        if (dayId == 0) {
          dayId = 6;
        } else {
          dayId = dayId - 1;
        }
        //$scope.approvalModel.weekReportHours[indx][dayId] = (day.actualEffort == 0 ? "" :
        weekReportData[indx].weekReportHours[dayId] = (day.actualEffort == 0 ? "" :
          ((day.actualEffort / 60) < 10 ? "0" + (day.actualEffort / 60) :
            (day.actualEffort / 60)) + ":" + ((day.actualEffort % 60) < 10 ? "0" + (day.actualEffort % 60) :
            (day.actualEffort % 60)));

      });

      return weekReportData;
    }


    /*
     *update function
     */

    function update() {
      var jsonData = {};

      jsonData = {
        "tls": {
          "approved": {
            "reason": "",
            "ids": {}
          },

          "rejected": {
            "reason": "",
            "ids": {}
          },
        }
      };

      angular.forEach($scope.approvalModel.weekRecords, function(weekInfo) {

        if (weekInfo.sta == 'A') {
          jsonData["tls"]["approved"]["ids"][JSON.stringify(weekInfo.id)] = JSON.stringify(weekInfo.desc);
        } else {
          if (weekInfo.sta == 'R') {
            jsonData["tls"]["rejected"]["ids"][JSON.stringify(weekInfo.id)] = JSON.stringify(weekInfo.desc);
          }
        }
      });

      tlsSrv.approvalListUpdate(jsonData).success(function(data) {
        toaster.pop("success", "approval Status Updated Successfully")
      }).error(function(err) {
        toaster.pop("error", "failed to update,please try again")
      });

    };

  }

})();
