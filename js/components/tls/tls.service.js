/*
 *tls service
 *
 */


/* global cartAppObj */

(function() {
  'use strict';
  angular.module(cartAppObj.id).factory('tlsSrv', tlsSrv);
  tlsSrv.$inject = ['$http'];

  function tlsSrv($http) {

    return {
      /* sto ajax for getting project*/
      //http://localhost/Cartwheel/api/tls/create/:date
      getNewTls: function(date) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/create/' + date,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /* eno ajax for getting project*/

      /* sto ajax for getting phase*/

      //URL:http://localhost/Cartwheel/api/tls/:date/:type/:typeId
      //'/tls/:date/:type/:typeId'
      getTlsPhase: function(Prj, date) {
        console.log("get date in service", date);
        return $http({
          url: cartAppObj.serverBasePath + '/tls/' + date + '/project/' + Prj,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /* eno ajax for getting phase*/

      /* sto ajax for getting activity*/
      //phs.id
      getTlsActivity: function(phsId, date) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/' + date + '/phase/' + phsId,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /* eno ajax for getting activity*/

      /* sto ajax for getting task*/
      //act.id
      getTlsTask: function(actId, date) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/' + date + '/activity/' + actId,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /* eno ajax for getting task*/
      /*
       *gettlsWeekStatus->function is used to get data from status
       */

      gettlsWeekStatus: function(date) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/create/' + date,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*sto ajax for createtls*/
      getTlsCreate: function(sdate) {

        return $http({
          url: cartAppObj.serverBasePath + '/tls/create/' + sdate,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*eno ajax for createtls*/
      /*sto ajax for createtls*/
      cereateNewTLS: function(data) {

        return $http({
          url: cartAppObj.serverBasePath + '/tls/operation',
          method: 'POST',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*sto ajax for createtls*/
      submitTLS: function(data) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/submit',
          method: 'PUT',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      //------------------------------------------------------------------------------
      /*sto ajax for get wri list*/
      getWriList: function() {
        return $http({
          url: cartAppObj.serverBasePath + '/wri/list',
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*eno ajax for get wri list*/

      getWriListEditData: function(wri) {
        return $http({
          url: cartAppObj.serverBasePath + '/wri/' + wri.wriId + '/edit',
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      getWriListNewdata: function() {
        return $http({
          url: cartAppObj.serverBasePath + '/wri/new',
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      wriListDelete: function(wri) {
        return $http({
          url: cartAppObj.serverBasePath + '/wri/' + wri.wriId + '/delete',
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      wriCreate: function(data) {
        console.log("get wri add service", data);
        return $http({
          url: cartAppObj.serverBasePath + '/wri/create',
          method: 'post',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },
      wriUpdate: function(data) {
        return $http({
          url: cartAppObj.serverBasePath + '/wri/update',
          method: 'put',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*---sto ajax for tls report---*/

      getTlsTimelogList: function() {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/timelog',
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      getTlsTimelogPhase: function(prj) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/timelog/list/project/' + prj.prjId,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      getTlsTimelogActivity: function(phsId) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/timelog/list/phase/' + phsId,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      getTlsTimelogTask: function(actId) {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/timelog/list/activity/' + actId,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      tlsTimlogCreate: function(data) {
        console.log("timelog create service", data);
        return $http({
          url: cartAppObj.serverBasePath + '/tls/timelog/reports',
          method: 'post',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*---eno ajax for tls report---*/
      /*---sto ajax for tls approval---*/

      getApprovalList: function() {
        return $http({
          url: cartAppObj.serverBasePath + '/tls/approval',
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

      //URL: http: //localhost/Cartwheel/api/tls/approve-decline

      approvalListUpdate: function(data) {
        console.log("service ", data);
        return $http({
          url: cartAppObj.serverBasePath + '/tls/approve-decline',
          method: 'put',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      },

      /*---eno ajax for tls approval---*/
      /* sto ajax for wbs */
      getWbsPrj: function() {
        return $http({
          url: cartAppObj.serverBasePath + '/wbs',
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

      getWbsPrjinfo: function(prjId) {
        return $http({
          url: cartAppObj.serverBasePath + '/wbs/' + prjId,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

      updateVisibilityStatus: function(data) {
        return $http({
          url: cartAppObj.serverBasePath + '/wbs/project/update',
          method: 'put',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

      /* eno ajax for wbs */

      getchangeApprover: function() {
        return $http({
          url: cartAppObj.serverBasePath + '/changeApprover/list/data',
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

      getProjectInfo: function(id) {
        return $http({
          url: cartAppObj.serverBasePath + '/changeApprover/edit/' + id,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      getPhaseInfo: function(id) {
        return $http({
          url: cartAppObj.serverBasePath + '/changeApprover/edit/phase/' + id,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },


      getActInfo: function(id) {
        return $http({
          url: cartAppObj.serverBasePath + '/changeApprover/activity/' + id,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
      getTaskInfo: function(id) {
        return $http({
          url: cartAppObj.serverBasePath + '/changeApprover/task/'+ id,
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },
       update: function(data) {
         console.log("update" , data);
         return $http({
          url: cartAppObj.serverBasePath + '/changeApprover/update',
           method: 'put',
             data: data,
           headers: {
            'Content-Type': 'application/json'
           }
         });
       },

    };



  }

})();
