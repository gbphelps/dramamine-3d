import * as THREE from 'three';
import { controls } from './controls';
import { camera, renderer } from './view.js';
import { sphere } from './sphere';
import { pointLight } from './lighting';

import { tube, geo, points } from './snake';


const scene = new THREE.Scene();

// scene.add( sphere );
scene.add( camera );
scene.add( pointLight );
// scene.add( tube );

var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array(100*3);

geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

var material = new THREE.LineBasicMaterial( { color: 0xff00ff } );
var line = new THREE.Line( geometry, material );








const position = line.geometry.attributes.position;


let inc = 0;
for (let i = 0; i < 100; i++) {
  position.setXYZ(i, inc, inc, inc);
  inc += .01;
}

let gravity = -.0005
let velX = 0.01;
let velY = 0;


function update(){

  velY += gravity;
  if (controls.up) velY += .0008;
  if (controls.down) velY -= .0002;

  camera.position.y +=velY;
  camera.position.x +=velX;

  console.log(camera.position.x);


  for (let i = 0; i < 99; i++) {
    position.setXYZ(i,
      position.getX(i+1),
      position.getY(i+1),
      position.getZ(i+1))
  }

  position.setXYZ(99,
    position.getX(98)+velX,
    position.getY(98)+velY,
    position.getZ(98)
  );



  position.needsUpdate = true;




  scene.add( line );

  if (controls.up) console.log('y');


  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
