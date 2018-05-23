import * as THREE from 'three';
import { controls } from './controls';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

var cube = new THREE.Mesh( geometry, material );

scene.add( cube );




camera.position.z = 5;



let accel = {
  x: 0,
  y: 0,
  z: 0
}

let vel = {
  x: 0,
  y: 0,
  z: 0
}

let pos = {
  x:0,
  y:0,
  z:0
}





function animate() {

	requestAnimationFrame( animate );

  if (controls.up){
    vel.y += .0006}
  if (controls.down){
    vel.y += -.0006}

    vel.y -=.0001


  cube.translateY(vel.y);

	renderer.render( scene, camera );
}
animate();
