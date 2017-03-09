/* Cartwheel App creation:
 *  This defines the Angular application which defines the dependent modules.
 *  This app depends on the following:
 *  -
 * Dependencies: This needs to be called after angular.js is included and first
 */

/* User Management Service : all user Management */
/*
 *@ STO functions-Desc
 *getList - get user list data(list page)
 *getEmpByLoc - dynamic dropdown -to get based on location id list data
 *getEmpWorkLoc(umList edit operation) - to get user location and user deparment
 *getEmpDesgName(umList edit operation) -umList edit operation-to get designation Name based on the deparment ID
 *empListEditUpdate(umList edit-update) -update operation
 */

(function() {
  'use strict';

  angular.module(cartAppObj.id)
    .factory('umSrv', umSrv);

  umSrv.$inject = ['$http', '$timeout'];

  function umSrv($http, $timeout) {
    return {
      /*STO getList*/
      getList: function() {
        return $http({
          url: cartAppObj.serverBasePath + "/users",
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*STO getList*/

      /*STO getEmpByLoc*/
      getEmpByLoc: function(locId) {
        return $http({
          url:cartAppObj.serverBasePath + "/user/location/" + locId,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*ENO getEmpByLoc*/
      /*STO getEmpWorkLoc(List edit operation)*/

      getEmpWorkLoc: function(userList) {
        return $http({
          method: 'GET',
          url:cartAppObj.serverBasePath + '/user/' + userList.id + '/edit',
          header: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*ENO getEmpWorkLoc(List edit operation)*/

      /*STO getEmpDesgName(umList edit operation)*/
      getEmpDesgName: function(umDepId) {
        return $http({
          method:'GET',
          url:cartAppObj.serverBasePath + '/user/department/' + umDepId.id,
          header: {
            'Content-Type': 'application/json'
          }
        });
      },
      /*ENO getEmpDesgName(umList edit operation)*/

      /*STO empListEditUpdate(umList edit-update)*/
      umCreate: function(data) {
        return $http({
          url: cartAppObj.serverBasePath + "/user/create",
          method: "POST",
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },
      umUpdate: function(data) {
        return $http({
          url: cartAppObj.serverBasePath + "/user/update",
          method: "PUT",
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },
      /*empListEditUpdate(umList edit-update)*/

      getEmpListAddData: function() {
        return $http( {
          url:cartAppObj.serverBasePath + '/user/create/new',
          method:'GET',
          header: {
            'Content-Type': 'application/json'
          }
        })
      }

    }
  }
})();
