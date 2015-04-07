angular.module('dreamsApp').factory('Giphy', ['$resource', function($resource){
  return $resource('http://api.giphy.com/v1/gifs/:action', {api_key: 'dc6zaTOxFJmzC'}, {
    query: {
      method: 'GET',
      isArray: true,
      params: {
        action: 'search'
      },
      transformResponse: function(res){
        var json = JSON.parse(res);
        return json.data;
      }
    }
  });
}]);
angular.module('dreamsApp').controller('mediaCtrl', ['$scope', 'Giphy', function($scope, Giphy){
  $scope.gifs = Giphy.query({q: 'funny dog'});
  console.log($scope.gifs)
}]);  


angular.module('dreamsApp')
.controller('RecallController', ['$scope', '$location', function ($scope, $location, $gyroscope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   $scope.items = '';
    $scope.item= '';



    var test = function(arr){
       var newTags = [];
        for (var i = 0; i < arr.length; i++) {
            var value = arr[i].text;

            newTags.push(value);
          }
        console.log(newTags);
      return newTags;
    };


   $scope.test = function(arr){
     $scope.newTags = [];
      for (var i = 0; i < arr.length; i++) {
          var value = arr[i].text;

          $scope.newTags.push(value);
        }
    console.log($scope.newTags);
   return $scope.newTags;

   };
   $scope.dreams = {};


    var initCallback = function(){
        getItems();
    };

    $scope.t = function(){
 
    };
 
    var dataStore = new IDBStore('todos', initCallback);
 
    var getItemsSuccess = function(data){
        $scope.items = data;
        console.log(data);
  
        // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
        $scope.$apply(); 
        
    };

        var getItemSuccess = function(item){
        $scope.item =item;
        console.log(item);
  
        // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
        $scope.$apply(); 
        
    };
 
    var errorCallback = function(){
        console.log('error'); 
    };
 
    var getItems = function(){
        dataStore.getAll(getItemsSuccess,errorCallback);
        console.log(getItemsSuccess); 

    };

    $scope.getItem = function(item){

      dataStore.get(item,getItemSuccess,errorCallback);

    };
 
    $scope.deleteItem = function(item){
        dataStore.remove(item,getItems,errorCallback);
    };
 
    $scope.addItem = function(){

        $scope.itemname = $scope.dreams.name;
        $scope.itemtheme = $scope.dreams.theme;
        $scope.itemsymbols = test($scope.dreams.symbols);
        

        dataStore.put({'timeStamp': new Date().getTime(), 'name' : $scope.itemname, 'theme' : $scope.itemtheme, 'symbols': $scope.itemsymbols},getItems,errorCallback); 
        
    };
  


    }]);


angular.module('dreamsApp')
  .controller('ResultsController', [ '$gyroscope', '$http',  function ($scope, $gyroscope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'

      ];


  


  $scope.gyro = {};
  var start = function(){
    console.log('start');
    $gyroscope.watchPosition(15);
    $scope.gyro.started = true;
  };

  var stop = function(){
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
  start();

}]);

'use strict';

angular.module('ngGiphy', [])
  .directive('ngGiphySearch', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

    // Create the output object

    var output = {};


    // Restrict the directive to Attributes and Elements

    output.restrict = 'AE';


    output.scope = {
      query : '@query',
      limit : '@limit',
      offset : '@offset',
      id: '@id'
    }


    // Retrive the template from the templateUrl parameter or use the default one.

    var getTemplate = function(url){
      if (angular.isUndefined(url)) {
          url = 'views/giphy-view.html';
      };

      var templateLoader = $http.get(url, {cache: $templateCache});

      return templateLoader;

    }


    // Create the linker function

    var linker = function(scope, element, attrs) {


      // Define if data has been loaded

      scope.dataLoaded = false;


      // Define parameters from attributes

      var params = {};

      // TODO create a configurable api_key parameter
      params.api_key = 'dc6zaTOxFJmzC';

      // Retrive parameters from directive attributes
      params.q = scope.query.split(',').join('+');
      params.limit = scope.limit;
      params.offset = scope.offset;

      var apiSearch = function(){

          $http.get('//api.giphy.com/v1/gifs/search', {params:params})
            .success(
              function(data,status){

                if(typeof data=='object'){
                  scope.results = data.data;
                  scope.dataLoaded = true;
                  console.log(data.data);
                  

                }

              }

            )
            .error(
              function(){
                console.log("Failed to access");
              }
            )

      }

      var loader = getTemplate(attrs.templateUrl);

      var promise = loader.success(function(html) {
          element.replaceWith($compile(html)(scope));
      }).then(function (response) {
          apiSearch();
      });
    }


    output.link = linker;

    return output;

  }]);
