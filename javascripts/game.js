import * as THREE from 'three';
import { controls } from './controls';
import { camera, renderer } from './view.js';
import { sphere, randomSphere } from './sphere';
import { pointLight } from './lighting';

import { tube, geo, points } from './snake';


const scene = new THREE.Scene();


tube.position.z = -10;
camera.position.z = 4;
scene.add( camera );
scene.add( pointLight );


scene.add( randomSphere() );







function update(){

  if (controls.up) sphere.rotateY(.01);
  if (controls.down) sphere.rotateX(.01);


  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
