import * as THREE from 'three';
import { controls } from './controls';
import { camera, renderer } from './view.js';
import { sphere, randomSphere } from './sphere';
import { pointLight } from './lighting';

import { tube, geo, points } from './snake';


const scene = new THREE.Scene();



camera.position.z = 4;
// scene.add( camera );
scene.add( pointLight );


const sphere2 = randomSphere();
scene.add( sphere2.add(camera) );
//camera.lookAt( sphere2.position )







function update(){

  if (controls.up) sphere2.rotateY(.01);
  if (controls.down) sphere2.rotateX(.01);


  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
