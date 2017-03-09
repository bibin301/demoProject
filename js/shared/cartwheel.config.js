/* Cartwheel App configuration:
 *  This is related to the configuration activities of Angular
 *  This includes the following:
 *  -
 * Dependencies: Needs the module to be created and assumes the module name
 *               are all predefined.
 *               jquery.js
 *               angular.js
 *               cartwheel_app.js
 */

(function () {
	'use strict';

	var cartApp =
	angular
		.module(cartAppObj.id)
		.config(cartConfigStd)
		.config(cartConfigLazyLoad)
		// JQUERY 3rd PARTY
		/**
		* jQuery plugin config use ui-jq directive , config the js and css files that required
		* key: function name of the jQuery plugin
		* value: array of the css js file located
		*/
		.constant('JQ_CONFIG', {
			easyPieChart:   ['vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
			sparkline:      ['vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
			plot:           ['vendor/jquery/charts/flot/jquery.flot.min.js',
								'vendor/jquery/charts/flot/jquery.flot.resize.js',
								'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
								'vendor/jquery/charts/flot/jquery.flot.spline.js',
								'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
								'vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
			slimScroll:     ['vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
			sortable:       ['vendor/jquery/sortable/jquery.sortable.js'],
			nestable:       ['vendor/jquery/nestable/jquery.nestable.js',
								'vendor/jquery/nestable/nestable.css'],
			filestyle:      ['vendor/jquery/file/bootstrap-filestyle.min.js'],
			slider:         ['vendor/jquery/slider/bootstrap-slider.js',
								'vendor/jquery/slider/slider.css'],
			chosen:         ['vendor/jquery/chosen/chosen.jquery.min.js',
								'vendor/jquery/chosen/chosen.css'],
			TouchSpin:      ['vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
								'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
			wysiwyg:        ['vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
								'vendor/jquery/wysiwyg/jquery.hotkeys.js'],
			dataTable:      ['vendor/jquery/datatables/jquery.dataTables.min.js',
								'vendor/jquery/datatables/dataTables.bootstrap.js',
								'vendor/jquery/datatables/dataTables.bootstrap.css'],
			vectorMap:      ['vendor/jquery/jvectormap/jquery-jvectormap.min.js',
								'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
								'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
								'vendor/jquery/jvectormap/jquery-jvectormap.css'],
			footable:       ['vendor/jquery/footable/footable.all.min.js',
								'vendor/jquery/footable/footable.core.css'],
			customJquery:  ['vendor/jquery/custom-jquery.js']
			}
		);

		//////////////////////////  Configuration section /////////////////////////////////
		/*
		 * This section defines all the configuration section related functionalities:
		 * - Currently only the translation is added (This might be relooked as later version of Angular
		 *   provides a better version of translation
		 */
		cartConfigStd.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$httpProvider', '$provide'];
		function cartConfigStd(   $controllerProvider,   $compileProvider,   $filterProvider,   $httpProvider,   $provide ) {

				console.log("CARTAPP.config.std: Started ...");
				// lazy controller, directive and service
				cartApp.controller = $controllerProvider.register;
				cartApp.directive  = $compileProvider.directive;
				cartApp.filter     = $filterProvider.register;
				cartApp.factory    = $provide.factory;
				cartApp.service    = $provide.service;
				cartApp.constant   = $provide.constant;
				cartApp.value      = $provide.value;

				$httpProvider.defaults.timeout = cartAppObj.httpTimeout;
				console.log("CARTAPP.config.std: Completed");
		}


		cartConfigTranslate.$inject = ['$translateProvider'];
		function cartConfigTranslate(   $controllerProvider) {

				console.log("CARTAPP.config.translate: Started ...");

				// Register a loader for the static files
				// So, the module will search missing translation tables under the specified urls.
				// Those urls are [prefix][langKey][suffix].
				$translateProvider.useStaticFilesLoader({
					prefix: 'l10n/',
					suffix: '.js'
				});
				// Tell the module what language to use by default
				$translateProvider.preferredLanguage('en');
				// Tell the module to store the language in the local storage
				$translateProvider.useLocalStorage();

				console.log("CARTAPP.config.translate: Completed");
		}

		//////////////////END OF Configuration section /////////////////////////////////


		//////////////////////////  Lazy Load Configuration section ////////////////////////////
		/*
		 * This section defines all the configuration which can be called only when needed:
		 * - Currently this is not used. Will be implemented once the phase-1 of the product
		 */
		// oclazyload config
		cartConfigLazyLoad.$inject = ['$ocLazyLoadProvider'];
		function cartConfigLazyLoad(   $ocLazyLoadProvider) {

			console.log("CARTAPP.config.lazyload: Started ...");
			// We configure ocLazyLoad to use the lib script.js as the async loader
			$ocLazyLoadProvider.config({
				debug:  false,
				events: true,
				modules: [
				{
					name: 'ngGrid',
					files: [
						'vendor/ng-modules/ng-grid/ng-grid.min.js',
						'vendor/ng-modules/ng-grid/ng-grid.min.css',
						'vendor/ng-modules/ng-grid/theme.css'
					]
				},
				{
					name: 'ui.select',
					files: [
						'vendor/ng-modules/angular-ui-select/select.min.js',
						'vendor/ng-modules/angular-ui-select/select.min.css'
					]
				},
				{
					name:'angularFileUpload',
					files: [
						'vendor/ng-modules/angular-file-upload/angular-file-upload.min.js'
					]
				},
				{
					name:'ui.calendar',
					files: ['vendor/ng-modules/angular-ui-calendar/calendar.js']
				},
				{
					name: 'ngImgCrop',
					files: [
						'vendor/ng-modules/ngImgCrop/ng-img-crop.js',
						'vendor/ng-modules/ngImgCrop/ng-img-crop.css'
					]
				},
				{
					name: 'angularBootstrapNavTree',
					files: [
						'vendor/ng-modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
						'vendor/ng-modules/angular-bootstrap-nav-tree/abn_tree.css'
					]
				},
				{
					name: 'toaster',
					files: [
						'vendor/ng-modules/angularjs-toaster/toaster.js',
						'vendor/ng-modules/angularjs-toaster/toaster.css'
					]
				},
				{
					name: 'textAngular',
					files: [
						'vendor/ng-modules/textAngular/textAngular-sanitize.min.js',
						'vendor/ng-modules/textAngular/textAngular.min.js'
					]
				},
				{
					name: 'vr.directives.slider',
					files: [
						'vendor/ng-modules/angular-slider/angular-slider.min.js',
						'vendor/ng-modules/angular-slider/angular-slider.css'
					]
				},
				{
					name: 'com.2fdevs.videogular',
					files: [
						'vendor/ng-modules/videogular/videogular.min.js'
					]
				},
				{
					name: 'com.2fdevs.videogular.plugins.controls',
					files: [
						'vendor/ng-modules/videogular/plugins/controls.min.js'
					]
				},
				{
					name: 'com.2fdevs.videogular.plugins.buffering',
					files: [
						'vendor/ng-modules/videogular/plugins/buffering.min.js'
					]
				},
				{
					name: 'com.2fdevs.videogular.plugins.overlayplay',
					files: [
						'vendor/ng-modules/videogular/plugins/overlay-play.min.js'
					]
				},
				{
					name: 'com.2fdevs.videogular.plugins.poster',
					files: [
						'vendor/ng-modules/videogular/plugins/poster.min.js'
					]
				},
				{
					name: 'com.2fdevs.videogular.plugins.imaads',
					files: [
						'vendor/ng-modules/videogular/plugins/ima-ads.min.js'
					]
				}
				]
			});
			console.log("CARTAPP.config.lazyload: Completed");
		}
		/////////////////End of  Lazy Load Configuration section ////////////////////////////


})();
