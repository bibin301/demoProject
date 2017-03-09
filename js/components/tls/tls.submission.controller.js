/*
 *@title@ tls submission controller->handle the functionality of tls submission
 *@view page@ tls.timelog.submission.tpl.html
 *
 *
 */
(function () {
    'use strict';
    angular.module(cartAppObj.id).controller('tlsSubCtl', tlsSubCtl);
    tlsSubCtl.$inject = ['$scope', '$rootScope', 'toaster', 'tlsSrv'];
    function tlsSubCtl($scope, $rootScope, toaster, tlsSrv) {


        $scope.tlsSubmissionModel = {};
        /*--STO tls functions initilization--*/
        $scope.tlsSubmissionModel.getPhase = getPhase;
        $scope.tlsSubmissionModel.getActivity = getActivity;
        $scope.tlsSubmissionModel.getTask = getTask;
        //$scope.tlsSubmissionModel.getTlsDate = getTlsDate;
        $scope.tlsSubmissionModel.getDateRange = getDateRange;// status section function
        $scope.tlsSubmissionModel.getTlsReport = getTlsReport;//initial function to get projects
        $scope.tlsSubmissionModel.createTls = createTls;
        $scope.tlsSubmissionModel.submitTLS = submitTLS;
        /*--ENO tls functions initilization--*/
        $scope.tlsSubmissionModel.usrRes = '';
        /*
         *$scope.tlsSubmissionModel.sDate ->used to decleare the initial date
         */

        $scope.tlsSubmissionModel.selectedDate = '';
        /*
         *getTlsReport function->job is get projects and week datas and swipe hours
         *@desc-> based on the date selection get data
         */

        function getTlsReport(sDate) {


            if (sDate == 'new') {
                $scope.tlsSubmissionModel.selectedDate = new Date();
                var yyyy = $scope.tlsSubmissionModel.selectedDate.getFullYear();
                var mm = $scope.tlsSubmissionModel.selectedDate.getMonth() + 1;
                var dd = $scope.tlsSubmissionModel.selectedDate.getDate();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                $scope.tlsSubmissionModel.selectedDate = yyyy + "-" + mm + "-" + dd;
            } else {
                if (!isNaN(Date.parse(sDate))) {
                    $scope.tlsSubmissionModel.selectedDate = sDate;
                    var yyyy = $scope.tlsSubmissionModel.selectedDate.getFullYear();
                    var mm = $scope.tlsSubmissionModel.selectedDate.getMonth() + 1;
                    var dd = $scope.tlsSubmissionModel.selectedDate.getDate();
                    if (dd < 10) {
                        dd = '0' + dd
                    }
                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    $scope.tlsSubmissionModel.selectedDate = yyyy + "-" + mm + "-" + dd;
                    ////console.log("get date calender", $scope.tlsSubmissionModel.selectedDate);
                }


            }


            if (!isNaN(Date.parse($scope.tlsSubmissionModel.selectedDate))) {

                tlsSrv.getNewTls($scope.tlsSubmissionModel.selectedDate).success(function (data) {
                    if (data.tls) {

                        $scope.tlsSubmissionModel.weekRecords = generateWeelyReport(data.tls.weekdata);
                        $scope.tlsSubmissionModel.swipeRecords = calcSwipe(data.tls.swipe)
                        ////console.log("get data selected by date", $scope.tlsSubmissionModel.weekRecords);
                        $scope.tlsSubmissionModel.project = data.tls.projects;
                        $scope.tlsSubmissionModel.tlsPhase = $scope.tlsSubmissionModel.tlsActivity = $scope.tlsSubmissionModel.tlsTask = '';
                        $scope.tlsSubmissionModel.tlsStatus = data.tls.tlsStatus;
                        ////console.log("date ranges", $scope.tlsSubmissionModel.tlsStatus);


                    }
                }).error(function (data, status) {
                    ////console.log("failed to retrive data");
                    toaster.pop("error", "Failed to retrive data lOGIN AGAIN ")
                });
            }
        }
        /*
         * calculate and map swipe data
         */
        function calcSwipe(swipeData) {
            var swipeDays, swipeHours, swipeMins, swipeDay;
            var weeklySwipe = [];
            Object.keys(swipeData).map(function (key) {

                swipeDays = swipeData[key];
                swipeHours = Math.trunc(swipeDays.minutes / 60);
                swipeMins = ((swipeDays.minutes % 60) < 10 ? "0" + (swipeDays.minutes % 60) : (swipeDays.minutes % 60));
                swipeDay = new Date(swipeDays.date).getDay();
                swipeDay = (swipeDay == 0 ? 7 : (swipeDay - 1))
                weeklySwipe[swipeDay] = (swipeHours + ":" + swipeMins);
                // //console.log(swipeDay, swipeDay, weeklySwipe);
            });
            return weeklySwipe;

        }


        /*
         * TLS weekly data looping for display
         */
        function generateWeelyReport(weekData) {
            var weekReportData = [];
            var weekUsrCmtId = [];
            var indx = 0;
            $scope.tlsSubmissionModel.weekReportHours = [];
            ////console.log(weekData);
            angular.forEach(weekData, function (day) {
                indx = weekUsrCmtId.indexOf(day.usrCmtId);
                if (indx == -1) {
                    weekUsrCmtId.push(day.usrCmtId);
                    weekReportData.push(day);
                    indx = weekUsrCmtId.length - 1;
                    ////console.log(day.usrCmtId);
                    $scope.tlsSubmissionModel.weekReportHours[indx] = Array("", "", "", "", "", "", "");
                }
                var dayId = new Date(day.date).getDay();
                if (dayId == 0) {
                    dayId = 6;
                } else {
                    dayId = dayId - 1;
                }
                $scope.tlsSubmissionModel.weekReportHours[indx][dayId] = (day.actualEffort == 0 ? "" :
                        ((day.actualEffort / 60) < 10 ? "0" + (day.actualEffort / 60) :
                                (day.actualEffort / 60)) + ":" + ((day.actualEffort % 60) < 10 ? "0" + (day.actualEffort % 60) :
                        (day.actualEffort % 60)));

            });
            ////console.log(weekUsrCmtId);
            return weekReportData;
        }


        function getPhase(prjObj) {

            tlsSrv.getTlsPhase(prjObj, $scope.tlsSubmissionModel.selectedDate).success(function (data) {

                ////console.log("get phase", data);

                $scope.tlsSubmissionModel.tlsPhase = data.data;
                $scope.tlsSubmissionModel.tlsActivity = $scope.tlsSubmissionModel.tlsTask = '';
            }).error(function (data, status) {
                ////console.log("failed to retrive data", status);
            });
        }

        function getActivity(phsObj) {
            tlsSrv.getTlsActivity(phsObj, $scope.tlsSubmissionModel.selectedDate).success(function (data) {
                $scope.tlsSubmissionModel.tlsActivity = data.data;
                $scope.tlsSubmissionModel.tlsTask = '';
            }).error(function (data, status) {
                ////console.log("failed to retrive data");
            });
        }
        function getTask(actObj) {
            ////console.log("get task object in controller", actObj);
            tlsSrv.getTlsTask(actObj, $scope.tlsSubmissionModel.selectedDate).success(function (data) {
                ////console.log("task object", data);
                $scope.tlsSubmissionModel.tlsTask = data.data;
            }).error(function (data, status) {
                ////console.log("failed to retrive data");
            });
        }


        /*-- sto function for dateRange--*/

        /*
         *getDateRange-> status section
         */

        function getDateRange(date) {
            tlsSrv.gettlsWeekStatus(date).success(function (data, ststus) {

                $scope.tlsSubmissionModel.tlsWeekStatus = data;
                $scope.tlsSubmissionModel.project = $scope.tlsSubmissionModel.tlsPhase = $scope.tlsSubmissionModel.tlsActivity = $scope.tlsSubmissionModel.tlsTask = '';
                ////console.log("get week status", $scope.tlsSubmissionModel.tlsWeekStatus);

            }).error(function (data, status) {
                ////console.log("failed to retrive data from backend");
            })

        }

        for (var hours in $scope.tlsSubmissionModel.usrRes.tls) {
            $scope.tlsSubmissionModel.usrRes.tls[hours]
        }

        /*
         * Create New TLS Data
         */
        function createTls(res, action) {
            var weekst = startAndEndOfWeek($scope.tlsSubmissionModel.selectedDate);
            if (action == "new") {
                //console.log(res);
                var dayArray = {};
                if (res.prj && res.phs && res.Activity && res.task) {
                    //console.log(weekst);
                    //to get the day effort entered by employee
                    angular.forEach(res.tls, function (item, index) {
                        var dayNumber = index.slice(-1);
                        dayArray[JSON.stringify(weekst[dayNumber])] = item.hours + ":" + item.mins;
                    });

                    var jsonData = {
                        "week": {
                            "start_date": weekst[0],
                            "end_date": weekst[6]
                        },
                        "tls": {
                            "0": {
                                "id": action,
                                "p": res.prj,
                                "h": res.phs,
                                "a": res.Activity,
                                "t": res.task,
                                "c": res.cmt,
                                "days": dayArray,
                                "saved": "y",
                                "submited": "n",
                            }

                        }
                    }
                    //console.log(jsonData);
                    tlsSrv.cereateNewTLS(jsonData).success(function (data) {
                        if (data.err == true && data.msg == "Session expired") {
                            toaster.pop("error", "Please try after sometime");
                        } else {
                            toaster.pop("info", "Successfully added the TLS Week Record");
                            $scope.tlsSubmissionModel.weekRecords = generateWeelyReport(data.weekdata);
                        }
                    }).error(function (data, status) {
                        toaster.pop("error", "Please try after sometime");
                    });
                } else {
                    toaster.pop("error", "Please Select the Project,Phase, Activity")
                }

            } else {

                if (confirm("Are You Sure to delete the Record!")) {
                    var id = [];
                    id.push(res)
                    var jsonData = {
                        "week": {
                            "start_date": weekst[0],
                            "end_date": weekst[6]
                        },
                        "tls": {
                            "0": {
                                "id": action,
                                "tls_ids": id
                            }

                        }
                    }
                    //console.log(jsonData);
                    tlsSrv.cereateNewTLS(jsonData).success(function (data) {
                        if (data.err == true && data.msg == "Session expired") {
                            toaster.pop("error", "Please try after sometime");
                        } else {
                            toaster.pop("info", "Successfully added the TLS Week Record");
                            $scope.tlsSubmissionModel.weekRecords = generateWeelyReport(data.weekdata);
                        }
                    }).error(function (data, status) {
                        toaster.pop("error", "Please try after sometime");
                    });
                }
            }


        }

        /*
         * TLS submit function
         */
        function submitTLS() {
            var weekst = startAndEndOfWeek($scope.tlsSubmissionModel.selectedDate);
            console.log($scope.tlsSubmissionModel.weekRecords);
            var weekId = $scope.tlsSubmissionModel.weekRecords.map(function (item) {
                return item.id;
            });
            var jsonData = {
                "week": {
                    "start_date": weekst[0],
                    "end_date": weekst[6]
                },
                "tls": {
                    id: weekId
                }
            };
            console.log(jsonData);
            tlsSrv.submitTLS(jsonData).success(function (data) {

                toaster.pop("info", "Successfully added the TLS Week Record");

            }).error(function (data, status) {
                toaster.pop("error", "Please try after sometime");
            });
        }

    }

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



/*
 * get week Dates
 */

function startAndEndOfWeek(date) {

// If no date object supplied, use current date
// Copy date so don't modify supplied date
    var now = date ? new Date(date) : new Date();
    // set time to some convenient value
    now.setHours(12, 0, 0, 0);
    // Get the previous Monday
    var monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    //monday.setHours(12, 0, 0, 0);
    var tueday = new Date(now);
    tueday.setDate(tueday.getDate() - tueday.getDay() + 2);
    var wednesday = new Date(now);
    wednesday.setDate(wednesday.getDate() - wednesday.getDay() + 3);
    var thursday = new Date(now);
    thursday.setDate(thursday.getDate() - thursday.getDay() + 4);
    var friday = new Date(now);
    friday.setDate(friday.getDate() - friday.getDay() + 5);
    var saturday = new Date(now);
    saturday.setDate(saturday.getDate() - saturday.getDay() + 6);
    // Get next Sunday
    var sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
    // Return array of date objects
    var dateVal = [
        monday,
        tueday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    ];
    return dateVal;
}

// Mon Nov 12 2012 00:00:00
// Sun Nov 18 2012 00:00:00
