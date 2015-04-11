/*global gyroscroll */
(function () {

'use strict';

/**
 * @ngdoc function
 * @name redreamApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redreamApp
 */
angular.module('redreamApp')
  .controller('ResultsCtrl', function ($scope, $gyroscope, Dreams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
$scope.lines = [];
	for (var i=0 ; i< 50; i++) {
		$scope.lines.push(i + ' ' + 'line');
	}

	$scope.gyro = {};

	$scope.start = function(){
		console.log('start');
		$gyroscope.watchPosition(30);
		$scope.gyro.started = true;
	};

	$scope.stop = function(){
		console.log('stop');
		$gyroscope.ignorePosition();
		$scope.gyro.started = false;
	};

	$gyroscope.onalpha(function(alphaDiff){
		console.log(alphaDiff);
	});
	$gyroscope.onbeta(function(betaDiff){
		console.log(betaDiff);
		
	});
	$gyroscope.ongamma(function(gammaDiff){
		console.log(gammaDiff);
	});

    $scope.theseTags = [];
    Dreams.store('ResultsCtrl', $scope);
    $scope.tags = ['shit','doesthis workkkk'];
    $scope.buttonClick = function () {
        console.log("ResultsCtrl");
        console.log("RecallCtrl::name", Dreams.get('RecallCtrl').tags);
        console.log("ResultsCtrl::name", Dreams.get('ResultsCtrl').tags);
        console.log("$scope::name", $scope.tags);
        $scope.theseTags = Dreams.get('RecallCtrl').tags;
        console.log($scope.theseTags);
    };

    $scope.buttonClickOnOneController = function () {
        Dreams.get('RecallCtrl').buttonClick();
            $scope.theseTags = Dreams.get('RecallCtrl').tags;
        console.log($scope.theseTags);
    };
	// var _giphy_tv_tag="cat";
	// var g = document.createElement('script'); g.type = 'text/javascript'; g.async = true;
	// g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'giphy.com/static/js/widgets/tv.js';
	// var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(g, s);


  });


})();
