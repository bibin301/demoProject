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

/* CartFooter controller : index.html */
(function () {
    'use strict';

	angular.module(cartAppObj.id)
		.controller('CartFooterCtrl', CartFooterCtrl);

	CartFooterCtrl.$inject = ['$scope'];
	function CartFooterCtrl(   $scope ) {
		//var footerModel = this;
		$scope.footerModel = {};
		$scope.footerModel.date = new Date();
		$scope.footerModel.year = $scope.footerModel.date.getFullYear(); /*for copyrights in footer*/
	}
})();