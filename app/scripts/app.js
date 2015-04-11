'use strict';

/**
 * @ngdoc overview
 * @name redreamApp
 * @description
 * # redreamApp
 *
 * Main module of the application.
 */
angular
  .module('redreamApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngMaterial',
    'ngSanitize',
    'ngTouch',
    'ngGiphy',
    'ngTagsInput',
    'ngMaterial',
    'adaptive.scroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/redream', {
        templateUrl: 'views/redream.html',
        controller: 'RedreamCtrl'
      })
      .when('/refeel', {
        templateUrl: 'views/refeel.html',
        controller: 'RecallCtrl'
      })

      .when('/recall', {
        templateUrl : 'views/recall.html',
        controller  : 'RecallCtrl'
      })

      .when('/results', {
        templateUrl : 'views/results.html',
        controller  : 'ResultsCtrl'
      })

      .otherwise({
        redirectTo: '/redream'
      });
  });