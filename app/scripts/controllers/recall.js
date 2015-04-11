'use strict';

/**
 * @ngdoc function
 * @name redreamApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redreamApp
 */


angular.module('redreamApp').run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });
});
angular.module('redreamApp').factory('Dreams', function ($rootScope) {
    var mem = [];

    return {
        store: function (key, value) {
          $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});

angular.module('redreamApp')
  .controller('RecallCtrl', function ($scope, Dreams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Dreams.store('RecallCtrl', $scope);
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



    $scope.buttonClick = function () {
        console.log("RecallCtrl");
        console.log("RecallCtrl::name", Dreams.get('RecallCtrl').tags);
        console.log("ResultsCtrl::name", Dreams.get('ResultsCtrl').tags);
        console.log("$scope::name", $scope.tags);
    };

    $scope.buttonClickOnTwoController = function () {
        Dreams.get('ResultsCtrl').buttonClick();
    };

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
     $scope.viewItem = function(item)
    {
      // $('#dreamList').fadeOut('slow');
      dataStore.getItem(item,getItems,errorCallback);
      $scope.name = '';
      $scope.theme ='';
      $scope.tags = '';
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
