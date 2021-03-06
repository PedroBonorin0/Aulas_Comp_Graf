import * as THREE from  'three';
import Stats from       '../../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
initDefaultBasicLight(scene);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 10);

var material = new THREE.MeshLambertMaterial({color: "rgb(200,0,0)"});

var cube = new THREE.Mesh(cubeGeometry, material);
var cyl1 = new THREE.Mesh(cylinderGeometry, material);
var cyl2 = new THREE.Mesh(cylinderGeometry, material);
var cyl3 = new THREE.Mesh(cylinderGeometry, material);
var cyl4 = new THREE.Mesh(cylinderGeometry, material);
// position the cube
cube.position.set(0.0, 0.0, 0.0);
cyl1.position.set(0.0, 0.0, 0.0);
cyl2.position.set(0.0, 0.0, 0.0);
cyl3.position.set(0.0, 0.0, 0.0);
cyl4.position.set(0.0, 0.0, 0.0);

cube.scale.set(11, 0.3, 6);
cyl1.scale.set(0.2, 3, 0.2);
cyl2.scale.set(0.2, 3, 0.2);
cyl3.scale.set(0.2, 3, 0.2);
cyl4.scale.set(0.2, 3, 0.2);

// add the cube to the scene
scene.add(cube);
scene.add(cyl1);
scene.add(cyl2);
scene.add(cyl3);
scene.add(cyl4);

cube.translateY(3);

cyl1.translateX(5);
cyl1.translateY(1.5);
cyl1.translateZ(2.5);

cyl2.translateX(5);
cyl2.translateY(1.5);
cyl2.translateZ(-2.5);

cyl3.translateX(-5);
cyl3.translateY(1.5);
cyl3.translateZ(2.5);

cyl4.translateX(-5);
cyl4.translateY(1.5);
cyl4.translateZ(-2.5);

// Use this to show information onscreen
var controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();
function render()
{
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}