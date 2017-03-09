//wbsListCtl
(function() {
  'use strict';
  angular.module(cartAppObj.id).controller('wbsListCtl', wbsListCtl);
  wbsListCtl.$inject = ['$scope', 'tlsSrv', 'toaster', '$timeout'];

  function wbsListCtl($scope, tlsSrv, toaster, $timeout) {

    $scope.wbsListModel = {};
    $scope.wbsListModel.usrRes = {};

    $scope.wbsListModel.selected = false;
    $scope.wbsListModel.status = false;
    $scope.wbsListModel.title = "Create";

    /*sto function initilization*/
    $scope.wbsListModel.getPrjId = getPrjId;
    $scope.wbsListModel.editVisibility = editVisibility;
    $scope.wbsListModel.statusUpdate = statusUpdate;
    /*eno function initilization*/


    /*
     *getWbsPrj-> used to get project list
     *
     */

    tlsSrv.getWbsPrj().success(function(data) {
      $scope.wbsListModel.wbsPrjList = data.projects;
      console.log("get wbs list", $scope.wbsListModel.wbsPrjList);
    }).error(function(err) {
      console.log("failed");
    });

    /*
     *getPrjId-> used to get prjId from prjlist
     */

    function getPrjId(id) {
      $scope.wbsListModel.wbsPhase = [];
      $scope.wbsListModel.wbsActivity = [];
      $scope.wbsListModel.wbsTask = [];

      tlsSrv.getWbsPrjinfo(id).success(function(data) {
        console.log("edited data", data);
        $scope.wbsListModel.selected = true;
        $scope.wbsListModel.wbsPrjInfo = data.phatdata;
        $scope.wbsListModel.wbsPrjVisibility = $scope.wbsListModel.wbsPrjInfo;



        angular.forEach($scope.wbsListModel.wbsPrjInfo, function(value) {
          console.log("get for each value", value);

        })





      }).error(function(error) {
        console.log("failed ");
      })

    };

    /*
     *editVisibility-> used to edit yes/no
     */


    function editVisibility(id) {
      $scope.wbsListModel.status = true;
      $scope.wbsListModel.usrRes = id; //pass list data to model
      $scope.wbsListModel.title = "Update-Visible to all Status";


      /*test sto*/

      //$scope.wbsListModel
      $scope.wbsListModel.isCollapsedFirst = false;
      $scope.wbsListModel.isCollapsedSecond = false;
      $scope.wbsListModel.isCollapsedThird = false;
      $scope.wbsListModel.isCollapsedFouth = false;


      /*test eno*/
    };

    /*
     *statusUpdate->update visible to all function
     *method->put
     */

    function statusUpdate(res) {
      console.log("get updated status", res);

      var data = {
        "project": {
          "id": res.prjId,
          "visibleToAll": res.status
        }
      }

      tlsSrv.updateVisibilityStatus(data).success(function(data) {
        toaster.pop("success", "user created successfully");
        $scope.wbsListModel.status = false;

      }).error(function(error) {

        toaster.pop("error", "Please fill the required feilds");
        $scope.wbsListModel.status = true;
      });

    };






  };

})();







/*  $scope.wbsListModel.my_tree_handler = my_tree_handler;

  var apple_selected, tree, treedata_avm, treedata_geography;

  function my_tree_handler(branch) {
    alert("hello i am working");
    var _ref;
    $scope.output = "You selected: " + branch.label;
    if ((_ref = branch.data) != null ? _ref.description : void 0) {
      return $scope.output += '(' + branch.data.description + ')';
    }
  }

  apple_selected = function(branch) {
    return $scope.output = "APPLE! : " + branch.label;
  };
  
  treedata_avm = [{
    label: 'Animal',
    children: [{
      label: 'Dog',
      data: {
        description: "man's best friend"
      }
    }, {
      label: 'Cat',
      data: {
        description: "Felis catus"
      }
    }, {
      label: 'Hippopotamus',
      data: {
        description: "hungry, hungry"
      }
    }, {
      label: 'Chicken',
      children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
    }]
  }, {
    label: 'Vegetable',
    data: {
      definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
      data_can_contain_anything: true
    },
    onSelect: function(branch) {
      return $scope.output = "Vegetable: " + branch.data.definition;
    },
    children: [{
      label: 'Oranges'
    }, {
      label: 'Apples',
      children: [{
        label: 'Granny Smith',
        onSelect: apple_selected
      }, {
        label: 'Red Delicous',
        onSelect: apple_selected
      }, {
        label: 'Fuji',
        onSelect: apple_selected
      }]
    }]
  }, {
    label: 'Mineral',
    children: [{
      label: 'Rock',
      children: ['Igneous', 'Sedimentary', 'Metamorphic']
    }, {
      label: 'Metal',
      children: ['Aluminum', 'Steel', 'Copper']
    }, {
      label: 'Plastic',
      children: [{
        label: 'Thermoplastic',
        children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
      }, {
        label: 'Thermosetting Polymer',
        children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
      }]
    }]
  }];
  treedata_geography = [{
    label: 'North America',
    children: [{
      label: 'Canada',
      children: ['Toronto', 'Vancouver']
    }, {
      label: 'USA',
      children: ['New York', 'Los Angeles']
    }, {
      label: 'Mexico',
      children: ['Mexico City', 'Guadalajara']
    }]
  }, {
    label: 'South America',
    children: [{
      label: 'Venezuela',
      children: ['Caracas', 'Maracaibo']
    }, {
      label: 'Brazil',
      children: ['Sao Paulo', 'Rio de Janeiro']
    }, {
      label: 'Argentina',
      children: ['Buenos Aires', 'Cordoba']
    }]
  }];
  $scope.my_data = treedata_avm;
  console.log("get tree datas", $scope.my_data);
  $scope.try_changing_the_tree_data = function() {
    if ($scope.my_data === treedata_avm) {
      return $scope.my_data = treedata_geography;
    } else {
      return $scope.my_data = treedata_avm;
    }
  };
  $scope.my_tree = tree = {};

  $scope.try_async_load = function() {
    $scope.my_data = [];
    $scope.doing_async = true;
    return $timeout(function() {
      if (Math.random() < 0.5) {
        $scope.my_data = treedata_avm;
      } else {
        $scope.my_data = treedata_geography;
      }
      $scope.doing_async = false;
      return tree.expand_all();
    }, 1000);
  };

  return
  $scope.try_adding_a_branch = function() {
    var b;
    b = tree.get_selected_branch();
    return tree.add_branch(b, {
      label: 'New Branch',
      data: {
        something: 42,
        "else": 43
      }
    });
  };*/
