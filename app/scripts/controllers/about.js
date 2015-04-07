'use strict';

/**
 * @ngdoc function
 * @name dreamsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreamsApp
 */
angular.module('dreamsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
