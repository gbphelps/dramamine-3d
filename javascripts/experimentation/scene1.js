import * as THREE from 'three';
import { controls } from './controls';
import { camera, renderer } from './view.js';
import { sphere } from './sphere';
import { pointLight } from './lighting';

import { tube, geo, points } from './snake';


const scene = new THREE.Scene();


tube.position.z = -10;
camera.position.z = 4;
scene.add( camera );
scene.add( pointLight );
 scene.add( tube );
 scene.add( sphere );




const a = new THREE.Vector3(0,0,0);
const b = new THREE.Vector3(1,1,1);


const geometry = new THREE.Geometry();
geometry.vertices.push(a,b);

const material = new THREE.LineBasicMaterial({ color: 0x00FFFF});
const snake = new THREE.Line(geometry,material);
scene.add( snake );




function update(){

  if (controls.up) tube.rotateY(.01);
  if (controls.down) tube.rotateX(.01);

  console.log(snake.geometry.vertices[0].x += .01);
  snake.geometry.verticesNeedUpdate = true;


  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
