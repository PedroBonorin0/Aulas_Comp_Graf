import * as THREE from  'three';
import Stats from       '../../build/jsm/libs/stats.module.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        InfoBox,
        onWindowResize,
        createGroundPlaneWired} from "../../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 0, 1)); // Init camera in this position
initDefaultBasicLight(scene);

camera.lookAt(0, 0, 0);
camera.up.set(0, 1, 0);

var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);

var angle = (20 * 3.14)/180;

cameraHolder.position.set(0, 2, 0);
scene.add(cameraHolder);

var light = new THREE.HemisphereLight();
scene.add(light);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneWired(200, 200);
scene.add(plane);

var keyboard = new KeyboardState();

function keyboardUpdate()
{
  keyboard.update();
  if ( keyboard.pressed("space") )    cameraHolder.translateZ( -1 );
  if ( keyboard.pressed("right") )    cameraHolder.rotateY( -10/180 );
  if ( keyboard.pressed("left") )     cameraHolder.rotateY(  10/180 );
  if ( keyboard.pressed("up") )       cameraHolder.rotateX( 10/180 );
  if ( keyboard.pressed("down") )     cameraHolder.rotateX( -10/180 );
  if ( keyboard.pressed(",") )        cameraHolder.rotateZ( -10/180 );
  if ( keyboard.pressed(".") )        cameraHolder.rotateZ( 10/180 );
}

// Use this to show information onscreen
var controls = new InfoBox();
  // controls.add("Basic Scene");
  // controls.addParagraph();
  // controls.add("Use mouse to interact:");
  // controls.add("* Left button to rotate");
  // controls.add("* Right button to translate (pan)");
  // controls.add("* Scroll to zoom in/out.");
  controls.show();

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();
function render()
{
  keyboardUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}