

'use strict';

/**
 * @ngdoc function
 * @name redreamApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redreamApp
 */
angular.module('redreamApp')
  .controller('ResultsCtrl', function ($scope, Dreams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.test = 'Marya';


    Dreams.store('ResultsCtrl', $scope);
    $scope.tags = [];
    $scope.buttonClick = function () {
        console.log("ResultsCtrl");
        console.log("RecallCtrl::name", Dreams.get('RecallCtrl').tags);
        console.log("ResultsCtrl::name", Dreams.get('ResultsCtrl').tags);
        console.log("$scope::name", $scope.tags);
 
        console.log($scope.theseTags);
    };

    $scope.buttonClickOnOneController = function () {
        Dreams.get('RecallCtrl').buttonClick();
            
        console.log($scope.theseTags);
    };

  var test = function(arr)
    {
      var newTags = [];

        for (var i = 0; i < arr.length; i++) 
        {
            var value = arr[i].text;
            newTags.push(value);
        }
        return newTags;
    };


var camera, scene, renderer, renderer2, controls, controls2;
var video, videoImage, videoImageContext, videoTexture;

      // Setup
      function init() {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set( 60, 20, 200 );

        // Render three.js world

        scene = new THREE.Scene();

        // Choose a random cuebmap ('2' or '3')
        // var mapId = Math.floor( Math.random() * ( 3 - 2 + 1 ) ) + 2;

        var cube = generateCubeMap( 'Park2Small', 512 );
        scene.add( cube );

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // document.getElementById('vrEnv').appendChild(renderer.domElement);

        // Add DeviceOrientation Controls
        // controls = new DeviceOrientationController( camera, renderer.domElement );
        // controls.connect();
        // setupControllerEventHandlers( controls );

        controls2 = new THREE.TrackballControls( camera );
        controls2.rotateSpeed = 1.0;
        controls2.zoomSpeed = 0.5;
        controls2.panSpeed = 0.8;
        controls2.noZoom = false;
        controls2.noPan = false;
        controls2.staticMoving = false;
        controls2.dynamicDampingFactor = 0.3;
        controls2.keys = [ 65, 83, 68 ];
        
        try{
          var index = 0;
          var dream = Dreams.get('RecallCtrl').dream;
          var check = Dreams.get('RecallCtrl').new;
          
          if(check == true){
            var theme = test(Dreams.get('RecallCtrl').theme);
            var theseTags = test(Dreams.get('RecallCtrl').tags);
          }else{
            var theme = dream.theme;
            var theseTags = dream.symbols;
            console.log(dream.theme + dream.symbols);
          }
          var urls = [
            [ '', 0, 0, 62.5, 0, 0, 0 ],
            [ '', 62.5, 0, 0, 0, 1.57, 0 ],
            [ '', 0, 0, -62.5, 0, 3.14, 0 ],
            [ '', -62.5, 0, 0, 0, 4.71, 0 ],
            [ '', 0, 62.5, 0, 4.71, 0, 0 ],
            [ 'http://tv.giphy.com/' + theme, 0, -62.5, 0, 1.57, 0, 0 ]
          ];

          if(theseTags.length > index && theseTags[index] !== null) {
            for(var i = 0; i < 5; i++){
              if(i< theseTags.length){
                urls[i][0] = 'http://tv.giphy.com/' + theseTags[i];
                console.log('tag added' + urls[i][0]);
              }else{
                urls[i][0] = 'http://tv.giphy.com/';
                console.log('no tag' + urls[i][0]);
              }

            }
          }

        for ( var i = 0; i < urls.length; i ++ ) {

          var element = document.createElement( 'iframe' );
          element.src = urls[ i ][ 0 ];
          element.style.width = '500px';
          element.style.height = '500px';
          element.style.border = '0px';

          var object = new THREE.CSS3DObject( element );
          object.position.x = urls[ i ][ 1 ];
          object.position.y = urls[ i ][ 2 ];
          object.position.z = urls[ i ][ 3 ];
          object.rotation.x = urls[ i ][ 4 ];
          object.rotation.y = urls[ i ][ 5 ];
          object.rotation.z = urls[ i ][ 6 ];
          object.scale.x = 0.25;
          object.scale.y = 0.25;
          scene.add( object );

        }
        }catch(err){

          var element = document.createElement("div"); 
          var content = document.createTextNode("Hi there, you have no dream data at the moment!");
          element.appendChild(content); 

        }




        // renderer2 = new THREE.CSS3DRenderer();
        // renderer2.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = 0;
        // document.body.appendChild( renderer.domElement );
        document.getElementById('vrEnv').appendChild(renderer.domElement);


        window.addEventListener( 'resize', onWindowResize, false );

      }

      // Render loop
      function animate() {

        // controls.update();
        controls2.update();

        renderer.render( scene, camera );
        // renderer2.render( scene, camera );

        requestAnimationFrame( animate );

      }

      // Demonstration of some DeviceOrientationController event handling
      function setupControllerEventHandlers( controls ) {

        var controllerEl = document.querySelector( '#controllername' );
        var controllerDefaultText = controllerEl.textContent;
        var controllerSelectorEl = document.querySelector( '#controllertype' );

        var compassCalibrationPopupEl = document.querySelector( '#calibrate-compass-popup' );
        var compassCalibratedEl = compassCalibrationPopupEl.querySelector( 'button' );

        // Listen for manual interaction (zoom OR rotate)

        controls.addEventListener( 'userinteractionstart', function () {
          renderer.domElement.style.cursor = 'move';
          controllerSelectorEl.style.display = 'none';
        });

        controls.addEventListener( 'userinteractionend', function () {
          renderer.domElement.style.cursor = 'default';
          controllerSelectorEl.style.display = 'inline-block';
        });

        // Listen for manual rotate interaction

        controls.addEventListener( 'rotatestart', function () {
          // controllerEl.innerText = 'Manual Rotate';
        });

        controls.addEventListener( 'rotateend', function () {
          controllerEl.innerText = controllerDefaultText;
        });

        // Listen for manual zoom interaction

        controls.addEventListener( 'zoomstart', function () {
          controllerEl.innerText = 'Manual Zoom';
        });

        controls.addEventListener( 'zoomend', function () {
          controllerEl.innerText = controllerDefaultText;
        });

        //

        // Show a simple 'canvas calibration required' dialog to user
        controls.addEventListener( 'compassneedscalibration', function () {
          compassCalibrationPopupEl.style.visibility = 'visible';

          compassCalibratedEl.addEventListener( 'click', function () {

            compassCalibrationPopupEl.style.visibility = 'hidden';

          });
        });

        // Allow advanced switching between 'Quaternions' and 'Rotation Matrix' calculations
        controllerSelectorEl.addEventListener( 'click', function ( event ) {
          event.preventDefault();

          if ( controls.useQuaternions === true ) {
            controllerSelectorEl.textContent = 'Rotation Matrix';
            controls.useQuaternions = false;
          } else {
            controllerSelectorEl.textContent = 'Quaternions';
            controls.useQuaternions = true;
          }
        }, false);
      }

      function generateCubeMap( folderName, tileWidth ) {

        var flipAngle  = Math.PI;       // 180 degrees
        var rightAngle = flipAngle / 2; //  90 degrees

        tileWidth = tileWidth || 512;

        var sides = [
          {
            url: 'images/Park2Small' + '/posx.jpg',
            position: [ - tileWidth, 0, 0 ],
            rotation: [ 0, rightAngle, 0 ]
          },
          {
            url: 'images/Park2Small' +  '/negx.jpg',
            position: [ tileWidth, 0, 0 ],
            rotation: [ 0, - rightAngle, 0 ]
          },
          {
            url: 'images/Park2Small' + '/posy.jpg',
            position: [ 0, tileWidth, 0 ],
            rotation: [ rightAngle, 0, flipAngle ]
          },
          {
            url: 'images/Park2Small' + '/negy.jpg',
            position: [ 0, - tileWidth, 0 ],
            rotation: [ - rightAngle, 0, flipAngle ]
          },
          {
            url: 'images/Park2Small' + '/posz.jpg',
            position: [ 0, 0, tileWidth ],
            rotation: [ 0, flipAngle, 0 ]
          },
          {
            url: 'images/Park2Small' + '/negz.jpg',
            position: [ 0, 0, - tileWidth ],
            rotation: [ 0, 0, 0 ]
          }
        ];

        var cube = new THREE.Object3D();

        for ( var i = 0; i < sides.length; i ++ ) {

          var side = sides[ i ];

          var element = document.createElement( 'img' );
          element.width = tileWidth * 2 + 2; // 2 pixels extra to close the gap.
          element.src = side.url;

          var object = new THREE.CSS3DObject( element );
          object.position.fromArray( side.position );
          object.rotation.fromArray( side.rotation );
          cube.add( object );

        }

        return cube;

      }

      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      init();

      animate();

  });

