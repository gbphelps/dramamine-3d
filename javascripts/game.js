import * as THREE from 'three';
import values from 'lodash/values'

import { controls } from './configs/controls';
import { camera, renderer } from './configs/view.js';
import * as lights from './configs/lighting';

import { newPlayer } from './player';
import HoopPath from './hoopPath';

import { plus, minus } from './text_alert';



let scene, hoopPath, hoops, dots, score, timer, duration, sphere, run;

const start = () => {
  window.cancelAnimationFrame(run);
  window.removeEventListener('keydown',playAgain);
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('instructions').classList.add('hidden');

  scene = new THREE.Scene();
  hoopPath = new HoopPath(scene);
  hoops = hoopPath.hoops;
  dots = hoopPath.dots;

  score = 0;
  timer = 2000;
  duration = 0;

  values(lights).forEach(light => scene.add(light));
  scene.background = new THREE.Color( 0x7ec0ee );


  sphere = newPlayer();
  scene.add( sphere.add(camera) );
  camera.position.z = 4;

  run = requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded',instructions);



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
  timer -= timer < 60 ? timer : 60;

}


function didCollide(toPlane, toCenter, hoop){
  //both of the .5s below are for collision leniency.
  const hoopRadius    = hoop.geometry.parameters.radius;
  const tubeRadius    = hoop.geometry.parameters.tube;
  const sphereRadius  = sphere.geometry.parameters.radius;
  const offset = tubeRadius + sphereRadius;
  const leniency = .2;

  return toPlane < (offset - leniency) &&
      (hoopRadius - offset + leniency) < toCenter &&
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
  //went through hoop! Need to make sure it gets back out. note the .1 leniency. TODO need to increase.

  if (hoop.status === 'pending' && toPlane > .8){
  //successfully cleared ring, note the .8 is arbitrary
    score += 1;
    hoop.status = 1;
    hoop.material.color = new THREE.Color(0x55aa55);
    console.log(score);
    sphere.add(plus());
    timer += 120;
  }
}


function update(){

  document.getElementById('stats').innerHTML = `Score: ${score} Time: ${timer}`
  if (timer <= 0){
    window.addEventListener('keydown',playAgain);
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('message').innerHTML = `
    <p> GAME OVER</p>
    <p> SCORE:</p>
    <p> ${score}</p>
    <p> Play Again?</p>
    <p> Y/N</p>`;
    return;
  }
  if (duration === 90){duration=0; hoopPath.addHoop();}
  timer--;
  duration++;


  sphere.children.slice(1).forEach(child => {
    if (child.frameLife > 70) sphere.remove(child);
    child.rotateY(.08);
    child.frameLife++;
  })

  applySteering();
  hoops.forEach(hoop => updateHoop(hoop));
  movePlayer();

  renderer.render(scene, camera);
  run = requestAnimationFrame(update);
}


function playAgain(e){
  (e.keyCode === 89 || e.keyCode === 13) ? start() : console.log('boo');
}

function instructions(){
  document.getElementById('instructions').classList.remove('hidden');
  window.addEventListener('keydown', playAgain);
}
