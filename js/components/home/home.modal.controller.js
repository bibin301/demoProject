/* Cartwheel App creation:
 *  This defines the Angular application which defines the dependent modules.
 *  This app depends on the following:
 *  -
 * Dependencies: This needs to be called after angular.js is included and first
 *               js of the cartwheel specific js code
 *               jquery.js
 *               angular.js
 *               cartwheel_app.js
 */

/* Home controller : index.html */

(function() {
  'use strict';

  angular.module(cartAppObj.id)
    .controller('AppModalCtrl', AppModalCtrl)

  .controller('StoryModalCtrl', StoryModalCtrl)

  .controller('DeptModalCtrl', DeptModalCtrl)
    .controller('AlbumModalCtrl', AlbumModalCtrl)


  //////////////////////////  login controller /////////////////////////////////
  /*
   * This section provides the services for login functionlity.
   * - Connects the view (login.modal.tpl.html) to the service (CartAuthServ)
   * - Functionality to manage the UI: closeDialog
   */

  AppModalCtrl.$inject = ['$scope', '$modalInstance', 'application', 'app'];

  function AppModalCtrl($scope, $modalInstance, application, app) {
    $scope.appModel = {};
    $scope.appModel.app = app;

    $scope.appModel.application = application;
    $scope.appModel.selected = {
      app: $scope.appModel.application[0]
    };

    $scope.appModel.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  };

  /*StoryModal Controller Defenition*/
  StoryModalCtrl.$inject = ['$scope', '$modalInstance', 'news'];

  function StoryModalCtrl($scope, $modalInstance, news) {
    $scope.storyModel = {};
    $scope.storyModel = news;

    $scope.storyModel.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  };

  /*department Modal Controller Defenition*/
  DeptModalCtrl.$inject = ['$scope', '$modalInstance', 'department', 'departments'];

  function DeptModalCtrl($scope, $modalInstance, department, departments) {
    $scope.deptModel = {};
    $scope.deptModel.dept = department;

    $scope.deptModel.depts = departments;
    $scope.deptModel.selected = {
      department: $scope.deptModel.depts[0]
    };

    $scope.deptModel.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  };
  AlbumModalCtrl.$inject = ['$scope', '$modalInstance', 'club', 'fun'];

  function AlbumModalCtrl($scope, $modalInstance, club, fun) {
    $scope.AlbumModel = {};
    $scope.AlbumModel.fun = fun;

    $scope.AlbumModel.club = club;
    $scope.AlbumModel.selected = {
      fun: $scope.AlbumModel.club[0]
    };



    $scope.AlbumModel.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  };

})();
