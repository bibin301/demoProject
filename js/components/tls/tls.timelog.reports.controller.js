/*
 *module name:timelog->reports
 *controller name ->tlsReportsCtrl
 *view page->tls.timelog.reports.tpl.html
 *
 */


(function() {
  'use strict';
  angular.module(cartAppObj.id).controller('tlsReportsCtrl', tlsReportsCtrl);
  tlsReportsCtrl.$inject = ['$scope', 'tlsSrv', '$rootScope'];

  function tlsReportsCtrl($scope, tlsSrv, $rootScope) {
    $scope.tlsReportsModel = {};
    $scope.tlsReportsModel.usrRes = '';
    $scope.tlsReportsModel.usrRes.status = '';

    /*sto function initilization*/
    $scope.tlsReportsModel.getPhaseName = getPhaseName;
    $scope.tlsReportsModel.getActivityName = getActivityName;
    $scope.tlsReportsModel.getTaskName = getTaskName;
    $scope.tlsReportsModel.getWeeekReports = getWeeekReports;
    $scope.tlsReportsModel.getMonthReports = getMonthReports;
    $scope.tlsReportsModel.timelogReportCreate = timelogReportCreate;
    $scope.tlsReportsModel.timelogReportReset = timelogReportReset;
    $scope.tlsReportsModel.showTimlog = showTimlog;
    $scope.tlsReportsModel.panelShow = false;
    $scope.tlsReportsModel.panelFirstShow = true;



    /*eno function initilization*/

    // $scope.tlsReportsModel.newData = [{
    //   "prjId": "a",
    //   "prjName": "All",
    //   "prjTitle": "All"
    // }];
    /*var date = newDate();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }
    var preDate = yyyy + '-' + mm + '-' + dd;

    $scope.tlsReportsModel.usrRes = {
      toDate: ,
      fromDate:
    }*/

    $scope.tlsReportsModel.newData = [{
      "prjId": "a",
      "prjName": "All",
      "prjTitle": "All"
    }, {
      "prjId": "a",
      "prjName": "Open Projects",
      "prjTitle": "Open Projects"
    }, {
      "prjId": "c",
      "prjName": "Closed Projects",
      "prjTitle": "Closed Projects"
    }];

    var newPrj = $scope.tlsReportsModel.newData;

    $scope.tlsReportsModel.newLoc = [{
      "id": "a",
      "locName": "All"

    }];
    var newLoc = $scope.tlsReportsModel.newLoc;
    $scope.tlsReportsModel.newEmp = [{
      "empId": "a",
      "fName": "All"

    }];
    var newEmp = $scope.tlsReportsModel.newEmp;



    tlsSrv.getTlsTimelogList().success(function(data) {
      if (data.timelog) {
        $scope.tlsReportsModel.data = data.timelog;
        $scope.tlsReportsModel.phase = $scope.tlsReportsModel.activity = $scope.tlsReportsModel.task = '';

        var project = $scope.tlsReportsModel.data.projects;
        $scope.tlsReportsModel.projects = newPrj.concat(project);
        $scope.tlsReportsModel.usrRes.prj = $scope.tlsReportsModel.projects[0];

        var employeesInfo = $scope.tlsReportsModel.data.employees;
        $scope.tlsReportsModel.employees = newEmp.concat(employeesInfo);

        var location = $scope.tlsReportsModel.data.locations;
        $scope.tlsReportsModel.locations = newLoc.concat(location);
        $scope.tlsReportsModel.usrRes.loc = $scope.tlsReportsModel.locations[0];

        $scope.tlsReportsModel.repotingPeriod = $scope.tlsReportsModel.data.reportingPeriod; //month dropdown

      };
    }).error(function(data, status) {
      console.log("failed to retrive data from backend");
    });

    /*
     *
     *getPhaseName-> function
     *Desc: based on the prjId getting phase detials
     *
     *
     */
    /*
        $scope.tlsReportsModel.newPhase = [{
          "phsId": "a",
          "phsName": "All"

        }];*/

    function getPhaseName(prj) {
      //to need pass->prj.prjId
      tlsSrv.getTlsTimelogPhase(prj).success(function(data) {
        if (data) {
          $scope.tlsReportsModel.phase = data.data;
          $scope.tlsReportsModel.activity = $scope.tlsReportsModel.task = '';
          console.log("phaseinfo", $scope.tlsReportsModel.phase);

        };

      }).error(function(data, status) {
        console.log("failed");
      })
    };

    /*
     *
     *
     *getActivityName-> function
     *Desc: based on the phsId getting Activity detials
     *
     *->to need pass =>phase.phsId
     */
    function getActivityName(phsId) {
      tlsSrv.getTlsTimelogActivity(phsId).success(function(data) {
        if (data) {
          $scope.tlsReportsModel.activity = data.data;
          $scope.tlsReportsModel.task = '';
        };

      }).error(function(data, status) {
        console.log("falied");
      })
    };

    /*
     *
     *getTaskName-> function
     *Desc: based on the actId getting task detials
     *->act.actId
     */
    function getTaskName(actId) {
      tlsSrv.getTlsTimelogTask(actId).success(function(data) {
        if (data) {
          $scope.tlsReportsModel.task = data.data;

        };
      }).error(function(data, status) {
        console.log("failed");
      });
    };

    /*
     *showTimlog -> go back to generated table
     */


    function showTimlog() {
      $scope.tlsReportsModel.panelFirstShow = true;
      $scope.tlsReportsModel.panelShow = false;
    }

    /*
     *$scope.tlsReportsModel.WeekInfo-> staic data
     *decs:this data is used to Duration dropdown
     */


    $scope.tlsReportsModel.WeekInfo = [{
      "id": "1",
      "name": "Last week"
    }, {
      "id": "2",
      "name": "Last Month(period)"
    }, {
      "id": "3",
      "name": "Last Month(calender)"
    }, {
      "id": "4",
      "name": "since start"
    }];



    /*
     *
     *preasigned model date
     */



    //    $scope.tlsReportsModel.usrRes.toDate = new Date();
    //    $scope.tlsReportsModel.usrRes.fromDate = new Date();

    // $scope.tlsReportsModel.usrRes.toDate   = toDate.getFullYear() + "-" + (toDate.getMonth() + 1) + "-" + toDate.getDate();
    // $scope.tlsReportsModel.usrRes.fromDate = toDate.getFullYear() + "-" + (toDate.getMonth() + 1) + "-" + toDate.getDate();





    /*
     *
     *timelogReportReset -> function
     *Desc:this function used to reset all the fields
     */


    function timelogReportReset() {
      $scope.tlsReportsModel.usrRes = '';
    };


    /*
     *
     *getWeeekReports-> function
     *Desc: based on the Duration dropdown  -> getting from & to date
     */

    function getWeeekReports(weekInfo) {

      $scope.tlsReportsModel.duration = weekInfo.name;

      if ($scope.tlsReportsModel.duration === "Last week") {
        var curr = new Date();

        var diffLastSunday = -curr.getDay();
        var diffLastMonday = -curr.getDay() - 6;

        var lastSunday = new Date(curr.getTime() + (diffLastSunday * 3600 * 24 * 1000));
        var lastMonday = new Date(curr.getTime() + (diffLastMonday * 3600 * 24 * 1000));


        var dd = lastMonday.getDate();
        var mm = lastMonday.getMonth() + 1;
        var yyyy = lastMonday.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        $scope.tlsReportsModel.usrRes.fromDate = yyyy + '-' + mm + '-' + dd;

        var dd = lastSunday.getDate();
        var mm = lastSunday.getMonth() + 1; //January is 0!
        var yyyy = lastSunday.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        $scope.tlsReportsModel.usrRes.toDate = yyyy + '-' + mm + '-' + dd;;

      } else if ($scope.tlsReportsModel.duration === "Last Month(period)") {
        var date = new Date();

        var frmDate = new Date(date.getFullYear(), date.getMonth() - 2, 29);
        var toDate = new Date(date.getFullYear(), date.getMonth(), 3);
        //date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();



        var dd = toDate.getDate();
        var mm = toDate.getMonth() + 1;
        var yyyy = toDate.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        $scope.tlsReportsModel.usrRes.toDate = yyyy + '-' + mm + '-' + dd;

        var dd = frmDate.getDate();
        var mm = frmDate.getMonth() + 1;
        var yyyy = frmDate.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        $scope.tlsReportsModel.usrRes.fromDate = yyyy + '-' + mm + '-' + dd;


      } else if ($scope.tlsReportsModel.duration === "Last Month(calender)") {
        var date = new Date();
        var frmDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        var toDate = new Date(date.getFullYear(), date.getMonth() - 0, 0);

        var dd = frmDate.getDate();
        var mm = frmDate.getMonth() + 1;
        var yyyy = frmDate.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        $scope.tlsReportsModel.usrRes.fromDate = yyyy + '-' + mm + '-' + dd;
        var dd = toDate.getDate();
        var mm = toDate.getMonth() + 1;
        var yyyy = toDate.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        $scope.tlsReportsModel.usrRes.toDate = yyyy + '-' + mm + '-' + dd;

      } else if ($scope.tlsReportsModel.duration === "since start") {

        var date = new Date();
        var frmDate = new Date(date.getFullYear() - 7, 0);
        var toDate = date;

        var dd = toDate.getDate();
        var mm = toDate.getMonth() + 1;
        var yyyy = toDate.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        $scope.tlsReportsModel.usrRes.toDate = yyyy + '-' + mm + '-' + dd;

        var dd = frmDate.getDate();
        var mm = frmDate.getMonth() + 1;
        var yyyy = frmDate.getFullYear();

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        $scope.tlsReportsModel.usrRes.fromDate = yyyy + '-' + mm + '-' + dd;

      }

    };

    /*
     *
     *getMonthReports-> function
     *Desc: based on the Reporting Period dropdown -> getting from & to date
     */
    function getMonthReports(month) {

      $scope.tlsReportsModel.usrRes.fromDate = month.startDate;
      $scope.tlsReportsModel.usrRes.toDate = month.endDate;
    };

    /*
     *
     *timelogReportCreate-> function
     *Desc: This function is used to get timelog reports and it is handdling ajax process
     */


    function timelogReportCreate(cre) {


      // var st = Object.keys(cre.status);
      // console.log(st);

      console.log("create  timelogreports +++++", cre.emp);



      var cprj = '';
      var oPrj = '';
      var all = '';
      var empAll = '';
      var locAll = '';

      if (cre.prj.prjId === 'a') {
        var all = 'y'
      } else {
        var all = 'n'
      };

      if (cre.prj.prjId === 'c') {
        var cprj = 'y';
      } else {
        var cprj = 'n';
      };

      if (cre.prj.prjId === 'a') {
        var oPrj = 'y';
      } else {
        var oPrj = 'n';
      };

      if (cre.emp.empId === 'a') {
        var empAll = 'y';
      } else {
        var empAll = 'n';
      };

      if (cre.loc.id === 'a') {
        var locAll = 'y';
      } else {
        var locAll = 'n';
      };

      /* sto for each function for project section */

      $scope.tlsReportsModel.id = [];
      var Id = $scope.tlsReportsModel.id;
      angular.forEach(cre.prj.prjId, function(value) {
        $scope.tlsReportsModel.id.push(value);

      });
      /* eno for each function for project section */


      /* sto for each function for Employee section */
      $scope.tlsReportsModel.employeeId = [];
      $scope.tlsReportsModel.employeeId.push(cre.emp);
      var eId = $scope.tlsReportsModel.employeeId;
      // angular.forEach(cre.emp, function(value) {
      //   $scope.tlsReportsModel.employeeId.push(value);
      //
      // });
      /* eno for each function for Employee section */


      /* sto for each function for Employee section */
      $scope.tlsReportsModel.empLocationId = [];
      var eLocId = $scope.tlsReportsModel.empLocationId;
      angular.forEach(cre.loc.id, function(value) {
        $scope.tlsReportsModel.empLocationId.push(value);

      });

      /* eno for each function for Employee section */

      /*
       *
       *$scope.tlsReportsModel.empStat -> array used to get status(A,U,R,S)
       *
       */

      //$scope.tlsReportsModel.empStat = [];
      var st = Object.values(cre.status).filter(function(v) {
        return v !== ''
      });

      //  $scope.tlsReportsModel.empStat.push(cre.status);
      /*$scope.tlsReportsModel.empStat.push(cre.app);
      $scope.tlsReportsModel.empStat.push(cre.toBe);
      $scope.tlsReportsModel.empStat.push(cre.Rej);
      $scope.tlsReportsModel.empStat.push(cre.Sav);*/



      console.log("tlsStatus", $scope.tlsReportsModel.empStat);

      var data = {
        "timelog": {
          "project": {
            "all": all,
            "closedprojects": cprj,
            "openprojects": oPrj,
            "ids": Id
          },
          "phase": {
            "all": all,
            "id": cre.Phs
          },
          "activity": {
            "all": all,
            "id": cre.act
          },
          "task": {
            "all": all,
            "id": cre.tsk.tskId
          },
          "employee": {
            "all": empAll,
            "ids": eId
          },
          "duration": {
            "from": cre.fromDate,
            "to": cre.toDate
          },
          "location": {
            "all": locAll,
            "ids": eLocId,
            "type": cre.reportLoc
          },
          "status": st,
          "typeofreport": cre.reportType,
          "comments": cre.Comments
        }
      };

      tlsSrv.tlsTimlogCreate(data).success(function(data) {
        $scope.tlsReportsModel.weekRecords = data.tls.weekdata;
        console.log("generated data", $scope.tlsReportsModel.weekRecords);
        $scope.tlsReportsModel.panelShow = true;
        $scope.tlsReportsModel.panelFirstShow = false;
      }).error(function(data, status) {
        console.log("failed to generate timelog");

      });
    };

  };

})();
