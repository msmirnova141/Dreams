'use strict';

/**
 * @ngdoc overview
 * @name dreamsApp
 * @description
 * # dreamsApp
 *
 * Main module of the application.
 */
angular
  .module('dreamsApp', [
    'ngAnimate',
    'ngCookies',
    'ngAria',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngMaterial',
    'ngSanitize',
    'ngTouch',
    'ngGiphy',
    'ngTagsInput',
    'adaptive.scroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
    //home page
    .when('/redream', {
        templateUrl: 'views/redream.html',
        controller: 'RedreamCtrl'
      })

    .when('/refeel', {
            templateUrl : 'views/refeel.html',
            controller  : 'RecallController'
        })


    .when('/recall', {
        templateUrl : 'views/recall.html',
        controller  : 'RecallController'
    })

    .when('/results', {
        templateUrl : 'views/results.html',
        controller  : 'RecallController'
    })
    
    .otherwise({
        redirectTo: '/redream'
      });
  });