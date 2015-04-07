'use strict';

/**
 * @ngdoc function
 * @name redreamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redreamApp
 */



  angular.module('dreamsApp')
  .controller('RefeelController', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });

angular.module('dreamsApp')
  .controller('RedreamCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.start = false;

    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        // alert('awesome!');  
    };

    $scope.random = function() {
        return 0.5 - Math.random();
    }

    
  });





