'use strict';

/**
 * @ngdoc function
 * @name redreamApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redreamApp
 */
angular.module('redreamApp')
  .controller('RecallCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.step = 1;
   	$scope.items = '';
   	$scope.name = '';

    var test = function(arr)
    {
    	var newTags = [];

        for (var i = 0; i < arr.length; i++) 
        {
            var value = arr[i].text;
            newTags.push(value);
        }

        console.log(newTags);
      	return newTags;
    };

   	$scope.tags = []; 

   	$scope.test = function(arr)
   	{
   		$scope.newTags = [];

   		for (var i = 0; i < arr.length; i++) 
   		{
          var value = arr[i].text;
          $scope.newTags.push(value);
        }

        console.log($scope.newTags);
        return $scope.newTags;
   	};

	$scope.theme = '';

	var initCallback = function()
	{
	    getItems();
	};

	var dataStore = new IDBStore('todos', initCallback);

	var getItemsSuccess = function(data)
	{
	   	$scope.items = data;
	   	console.log(data);
	    // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
	    $scope.$apply(); 
	};
 
	var errorCallback = function()
	{
	    console.log('error'); 
	};
 
    var getItems = function(){
        dataStore.getAll(getItemsSuccess,errorCallback);
        console.log(getItemsSuccess); 

    };
 
    $scope.deleteItem = function(item)
    {
      // $('#dreamList').fadeOut('slow');
      dataStore.remove(item,getItems,errorCallback);
    }
 
    $scope.addItem = function()
    {
        $scope.itemname = $scope.name;
        $scope.itemtheme = $scope.theme;
        $scope.itemsymbols = test($scope.tags);
        console.log($scope.itemsymbols + $scope.itemname + $scope.itemthem );
        dataStore.put({'timeStamp': new Date().getTime(), 'name' : $scope.itemname, 'theme' : $scope.itemtheme, 'symbols': $scope.itemsymbols},getItems,errorCallback); 
    };

    $scope.getSymbols = function(arr)
    {
    	for (var i = 0; i < arr.length; i++) 
    	{
    		var value = arr[i];
    		console.log(value); 
    	}
    };

  });
