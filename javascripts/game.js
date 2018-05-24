import * as THREE from 'three';
import { controls } from './controls';
import { camera, renderer } from './view.js';
import { sphere, randomSphere, randomTorus } from './sphere';
import { pointLight, ambientLight } from './lighting';

import { tube, geo, points } from './snake';


const scene = new THREE.Scene();

// scene.add(randomSphere());
scene.add(randomTorus())

camera.position.z = 4;
// scene.add( camera );
scene.add( pointLight );
scene.add( ambientLight );


// const sphere = randomSphere();
scene.add( sphere.add(camera) );
//camera.lookAt( sphere2.position )


window.THREE = THREE;

let xTau0 = 0;
let xOmega = 0;
let yTau0 = 0;
let yOmega = 0;


let velocity = new THREE.Vector3(0,0,0);

function update(){

  let xTau = xTau0;
  let yTau = yTau0;

  xTau += controls.up ? .002 : 0;
  xTau -= controls.down ? .002 : 0;
  yTau += controls.left ? .002 : 0;
  yTau -= controls.right ? .002 : 0;


  xOmega += xTau - xOmega * .03;
  yOmega += yTau - yOmega * .03;

  sphere.rotateX(xOmega);
  sphere.rotateY(yOmega);


  let accel = new THREE.Vector3(0,0,0);
  if (controls.forward) {
    let direction = new THREE.Vector3(0,0,-.001);
    let forward = new THREE.Matrix4().extractRotation(sphere.matrix);
    accel = direction.applyMatrix4( forward );
  }

  let delta = velocity.add(accel);
  sphere.position.multiplyScalar(.98).add(delta); //friction?


  console.log(sphere.position);





  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
