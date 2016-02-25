'use strict';

var $ = require("jquery");
var Tone = require("Tone");
var synth = new Tone.SimpleSynth().toMaster();
var gl;
var THREE = require("three");
var scene, renderer, camera, cube;

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

  camera.position.z = 5;

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);
}

function render() {
	requestAnimationFrame( render );

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

	renderer.render( scene, camera );
}

$(document).ready(function() {
  initCubeScene();
  render();
});
