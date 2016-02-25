'use strict';

var $ = require("jquery");
var Tone = require("Tone");
var synth = new Tone.SimpleSynth().toMaster();
var gl;
var THREE = require("three");
var scene, renderer, camera, cube;
var cubes = [];
var mouse_vector = new THREE.Vector3();

function playArpeggio() {
  synth.triggerAttackRelease("A2", "8n",  "+4n * 0");
  synth.triggerAttackRelease("C#3", "8n", "+4n * 1");
  synth.triggerAttackRelease("E3", "8n",  "+4n * 2");
  synth.triggerAttackRelease("A3", "8n",  "+4n * 3");
  synth.triggerAttackRelease("C#4", "8n", "+4n * 4");
  synth.triggerAttackRelease("E4", "8n",  "+4n * 5");
  synth.triggerAttackRelease("A4", "8n",  "+4n * 6");
}

function initCubeScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  cubes.push(cube);

  camera.position.z = 5;

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);

  renderer.domElement.addEventListener('mousedown', handleClick);
}

function render() {
	requestAnimationFrame( render );

  for (var i=0; i<cubes.length; i++) {
    var cb = cubes[i];
    cb.rotation.x += 0.1;
    cb.rotation.y += 0.1;
  }

	renderer.render( scene, camera );
}

function addCube(vec) {
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var newcube = new THREE.Mesh(geometry, material);
  newcube.position.set(vec.x, vec.y, vec.z);
  newcube.__dirtyPosition = true;

  scene.add(newcube);
  cubes.push(newcube);
}

function handleClick(e) {
  e.preventDefault();
  var x = (e.clientX / window.innerWidth) * 2 - 1;
  var y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse_vector.set(x, y, 1);
  mouse_vector.project(camera);
  console.log(mouse_vector);

  addCube(mouse_vector);
}

$(document).ready(function() {
  initCubeScene();
  render();
});
