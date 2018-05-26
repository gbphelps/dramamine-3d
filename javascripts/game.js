import * as THREE from 'three';
import values from 'lodash/values'

import { controls } from './configs/controls';
import { camera, renderer } from './configs/view.js';
import * as lights from './configs/lighting';

import { sphere } from './player';
import { randomHoop, hoopPath } from './hoops';
import { makeBaddie } from './baddie';

import { plus, minus } from './text_alert';
const scene = new THREE.Scene();
let score = 0;


let hoops;
let positions;
let dots;
[hoops, positions, dots] = hoopPath(30);
hoops.forEach(hoop => scene.add(hoop));
dots.forEach(dot => scene.add(dot));




//Configure scene.
values(lights).forEach(light => scene.add(light));
scene.background = new THREE.Color( 0x87cefa );


scene.add( sphere.add(camera) );
camera.position.z = 4;

const baddies = [];

// for (var i = 0; i < 10; i++){
//   const baddie = makeBaddie();
//   baddies.push(baddie);
//   baddie.lookAt(sphere.position);
//   scene.add(baddie);
// }

function applySteering(){
  sphere.tau = new THREE.Vector2(0,0);
  sphere.tau.x += controls.up    ? .002 : 0;
  sphere.tau.x -= controls.down  ? .002 : 0;
  sphere.tau.y += controls.left  ? .002 : 0;
  sphere.tau.y -= controls.right ? .002 : 0;

  sphere.omega.multiplyScalar(.95).add(sphere.tau);

  sphere.rotateX(sphere.omega.x);
  sphere.rotateY(sphere.omega.y);
}

function movePlayer(){
  let accel = new THREE.Vector3(0,0,0);
  if (controls.forward) {
    let direction = new THREE.Vector3(0,0,-.003);
    let forward = new THREE.Matrix4().extractRotation(sphere.matrix);
    accel = direction.applyMatrix4( forward );
  }
  //multiply by .99 to simulate friction.
  sphere.velocity.multiplyScalar(.99).add(accel);
  sphere.position.add(sphere.velocity);
}


function onCollision(hoop){
  score -= (hoop.status == 1 ? 2 : 1);
  console.log(score);
  hoop.material.color = new THREE.Color(0xFF0000);
  hoop.material.transparent = true;
  hoop.material.opacity = .5;
  hoop.material.needsUpdate = true;
  hoop.status = -1;
  sphere.add(minus());
}


function didCollide(toPlane, toCenter, hoop){
  //both of the .5s below are for collision leniency.
  const hoopRadius    = hoop.geometry.parameters.radius;
  const tubeRadius    = hoop.geometry.parameters.tube;
  const sphereRadius  = sphere.geometry.parameters.radius;
  const offset = tubeRadius + sphereRadius;

  return toPlane < (offset -.5) &&
      (hoopRadius - offset +.5) < toCenter &&
      toCenter < (hoopRadius + offset)
}


function updateHoop(hoop){
  if (hoop.status === -1 || hoop.status === 1) return;
  const hoopRadius = hoop.geometry.parameters.radius;
  const tubeRadius = hoop.geometry.parameters.tube;
  const sphereRadius = sphere.geometry.parameters.radius;

  const distanceVec = new THREE.Vector3().subVectors(hoop.position,sphere.position);
  const distance = distanceVec.length();
  const rotation = new THREE.Matrix4().extractRotation(hoop.matrix);
  const normal = new THREE.Vector3(0,0,1).applyMatrix4(rotation);

  const toPlane = Math.abs(distanceVec.dot(normal));
  const toCenter = Math.sqrt(distance*distance - toPlane*toPlane);


  if (didCollide(toPlane, toCenter, hoop)) onCollision(hoop);

  if (toPlane < .1 && toCenter < 2) hoop.status = 'pending';
  //went through hoop! Need to make sure it gets back out.

  if (hoop.status === 'pending' && toPlane > .8){
  //successfully cleared ring
    score += 1;
    hoop.status = 1;
    hoop.material.color = new THREE.Color(0x55aa55);
    console.log(score);
    sphere.add(plus());
  }

  hoop.rotateX(hoop.omega.x);
  hoop.rotateY(hoop.omega.y);
  hoop.rotateZ(hoop.omega.z);
  hoop.position.add(hoop.velocity);
}


function update(){

  sphere.children.slice(1).forEach(child => {
    if (child.frameLife > 70) sphere.remove(child);
    child.rotateY(.08);
    child.frameLife++;
  })

  applySteering();
  hoops.forEach(hoop => updateHoop(hoop));
  movePlayer();

  baddies.forEach(baddie => {
    let accel =
      new THREE.Vector3()
        .subVectors(sphere.position, baddie.position)
        .normalize()
        .multiplyScalar(.003);
    baddie.velocity.multiplyScalar(.99).add(accel);
    baddie.position.add(baddie.velocity);
    baddie.lookAt(sphere.position);
  });


  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
