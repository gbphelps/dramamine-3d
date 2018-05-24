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


// const sphere = randomSphere();
scene.add( sphere.add(camera) );
//camera.lookAt( sphere2.position )




let xTau0 = 0;
let xOmega = 0;

function update(){

  let xTau = xTau0;
  xTau += controls.up ? .001 : 0;
  xTau -= controls.down ? .001 : 0;


  xOmega += xTau - xOmega * .05;
  sphere.rotateX(xOmega);


  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
