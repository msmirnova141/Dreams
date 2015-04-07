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
    'ngTagsInput'
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

'use strict';

/**
 * @ngdoc function
 * @name dreamsApp.controller:RedreamCtrl
 * @description
 * # RedreamCtrl
 * Controller of the dreamsApp
 */
angular.module('dreamsApp')
  .controller('RedreamCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

'use strict';

angular.module('dreamsApp')
  .controller('ResultsController', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });


angular.module('dreamsApp')
  .controller('RecallController', ['$scope', '$location', function ($scope, $location, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.step = 1;
    $scope.tags
   $scope.items = '';
   $scope.name = '';
    var test = function(arr){
       var newTags = [];
        for (var i = 0; i < arr.length; i++) {
            var value = arr[i].text;

            newTags.push(value);
          }
        console.log(newTags);
      return newTags;
    };

   $scope.tags = [{text:'cat'}]; 

   $scope.test = function(arr){
     $scope.newTags = [];
      for (var i = 0; i < arr.length; i++) {
          var value = arr[i].text;

          $scope.newTags.push(value);
        }
    console.log($scope.newTags);
   return $scope.newTags;

   };
   $scope.theme = '';

    var initCallback = function(){
        getItems();
    };
 
    var dataStore = new IDBStore('todos', initCallback);
 
    var getItemsSuccess = function(data){
        $scope.items = data;
        console.log(data);

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
 
    $scope.deleteItem = function(item){
        dataStore.remove(item,getItems,errorCallback);
    }
 
    $scope.addItem = function(){


        $scope.itemname = $scope.name;
        $scope.itemtheme = $scope.theme;
        $scope.itemsymbols = test($scope.tags);
        console.log($scope.itemsymbols + $scope.itemname + $scope.itemthem );
        dataStore.put({'timeStamp': new Date().getTime(), 'name' : $scope.itemname, 'theme' : $scope.itemtheme, 'symbols': $scope.itemsymbols},getItems,errorCallback); 

    };


  $scope.getSymbols = function(arr){

    for (var i = 0; i < arr.length; i++) {
      var value = arr[i];
      console.log(value); 
    }
  };



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
