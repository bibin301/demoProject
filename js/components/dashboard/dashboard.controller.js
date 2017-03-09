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

/* CartApp dashboard controller : js/components/dashboard/cart.app.dashboard.tpl.html */
(function () {
    'use strict';
    angular.module(cartAppObj.id)
            .controller('CartAppDashCtrl', CartAppDashCtrl)
            .directive('cardHeight', function () {
                return {
                    link: function (scope, elem, attrs) {
                        scope.$watch(function () {
                            /*
                             *nested ternary operartor
                             * condition1?option1:(condition2?option2:option3)
                             */
                            elem.height() > 94 ? elem.attr('style', 'width: ' + (100 + elem.width()) + 'px') : (elem.height() < 99 ? elem.attr('style', 'width: ' + (300) + 'px') : elem.attr('style', 'width: ' + (100 - elem.width()) + 'px'));
                        });
                    }
                };
            });
    CartAppDashCtrl.$inject = ['$rootScope', '$scope', 'CartAppDashSrv', '$modal'];
    function CartAppDashCtrl($rootScope, $scope, CartAppDashSrv, $modal) {
        var dashModel = this;
        $scope.dashModel = {};
        $scope.dashModel.loadData = loadData;
        $scope.dashModel.openMobileModalDesc = openMobileModalDesc;
        $scope.dashModel.cardModal = cardModalOpen;
        $scope.dashModel.arrayCount = arrayCount;
        loadData();
        function loadData() {
            CartAppDashSrv.getCards().success(function (data, status) {
                console.log(data);
                $scope.dashModel.projects = data;
            }).error(function (data, status) {
                console.log(status);
                console.log(data, "Failed to retrieve data from backend... Please try after sometime");
            });
        }
        function cardModalOpen() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: $rootScope.cartAppObj.componentBasePath +
                        'dashboard/dashboard.small.modal.tpl.html'
                        //controller: 'AppModalCtrl',
                        // resolve: {
                        //     application: function() {
                        //         return $scope.homeModel.sectiondata.apps;
                        //     },
                        //     app: function() {
                        //         return app;
                        //     }
                        // }
            });
        }
        function openMobileModalDesc(task) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: $rootScope.cartAppObj.componentBasePath +
                        'dashboard/dashboard.small.modal.tpl.html'
                        //controller: 'AppModalCtrl',
                        // resolve: {
                        //     application: function() {
                        //         return $scope.homeModel.sectiondata.apps;
                        //     },
                        //     app: function() {
                        //         return app;
                        //     }
                        // }
            });
        }
        function arrayCount(val) {
            if (val) {
                var size = 0,
                        key;
                for (key in val) {
                    if (val.hasOwnProperty(key))
                        size++;
                }
                return size;
            }
        }
    }
})();
