'use strict';

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

/* ng-app initiated */

var cartAppObj = {
  id: 'CartwheelApp',
  name: 'Cartwheel',
  version: '0.1',
  defaultTheme: 'red',
  themeKey: 'cart.theme',
  defaultLang: 'English',
  langKey: 'cart.lang',
  userKey: 'cart.user',
  tokenKey: 'Accept',
  httpTimeout: 5000,
  veryslowInterval: 10000,
  slowSlideInterval: 5000,
  mediumSlideInterval: 3500,
  userStorage: sessionStorage,
  settingsStorage: localStorage,
  urlVersion: '?nsh=1',
  serverBasePath: '../api'
    /*'../api_tst' */
};

/*
 * Log management
 */

if (typeof window.console === 'undefined' || !window.console || window.console === null) {
  var console = {};
  console.info = function() {};
  console.warn = function() {};
  console.error = function() {};
  console.log = function() {};
} else {
  console = window.console;
}
window.console = console;


(function() {

  angular.module(cartAppObj.id, [
    'unsavedChanges',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'toaster',
    'datatables',
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ngLetterAvatar',
    'ui.tinymce',
    'ncy-angular-breadcrumb',
    'ngTable',
    'vAccordion',
    'localytics.directives'
  ]);
})();
