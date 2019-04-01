import * as THREE from 'three';
import values from 'lodash/values'

import { controls } from './configs/controls';
import { camera, renderer } from './configs/view.js';
import * as lights from './configs/lighting';

import { newPlayer } from './player';
import HoopPath from './hoopPath';

import { plus, minus } from './text_alert';
import { mouseTracker } from './configs/mouse_controls';


const skybox = new THREE.CubeTextureLoader().setPath('javascripts/').load([
  'sky_4.jpg',
  'sky_2.jpg',

  'sky_1.jpg',
  'sky_6.jpg',

  'sky_3.jpg',
  'sky_5.jpg',
], instructions)



window.addEventListener('resize', ()=>{
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  renderer.setSize(newWidth, newHeight);
  camera.aspect = newWidth/newHeight;
  camera.updateProjectionMatrix();
})


let scene, hoopPath, hoops, dots, score, timer, duration, sphere, run;


const start = () => {

  //mouseTracker(); //TODO TODO TODO
  window.cancelAnimationFrame(run);

  scene = new THREE.Scene();
  scene.background = skybox;
  hoopPath = new HoopPath(scene);
  hoops = hoopPath.hoops;
  dots = hoopPath.dots;

  score = 0;
  timer = 2000;
  duration = 0;

  values(lights).forEach(light => scene.add(light));


  sphere = newPlayer();
  scene.add( sphere.add(camera) );
  camera.position.z = 4;

//
  // const g = new THREE.SphereGeometry(1000, 32, 32);
  // const m = new THREE.MeshBasicMaterial( {side: THREE.BackSide, map: t } );
  // sky = new THREE.Mesh( g, m );
  // sky.position.z = 0;
  // scene.add(sky);

//
}

//run = requestAnimationFrame(update);





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
  // sky.position.copy(sphere.position);
}


function onCollision(hoop){
  score -= (hoop.status == 1 ? 10 : 5);
  console.log(score);
  hoop.material.color = new THREE.Color(0xFF0000);
  hoop.material.transparent = true;
  hoop.material.opacity = .5;
  hoop.material.needsUpdate = true;
  hoop.status = -1;
  // sphere.add(minus());
  timer -= timer < 60 ? timer : 60;

  sphere.material.needsUpdate = true;
  sphere.material.color = new THREE.Color(0xFF0000);
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
  const dotRadius = .2; //TODO

  const distanceVec = new THREE.Vector3().subVectors(hoop.position,sphere.position);
  const distance = distanceVec.length();
  const rotation = new THREE.Matrix4().extractRotation(hoop.matrix);
  const normal = new THREE.Vector3(0,0,1).applyMatrix4(rotation);

  const toPlane = Math.abs(distanceVec.dot(normal));
  const toCenter = Math.sqrt(distance*distance - toPlane*toPlane);

  //TODO: DOT SCORING
  // hoop.children.forEach(child => {
  //   console.log(child.getWorldPosition);
  //   if (sphere.position.clone().sub(child.getWorldPosition(new THREE.Vector3())).length() <= sphereRadius - dotRadius ){
  //     score += 1;
  //     hoop.remove(child)
  //   }
  // });



  if (didCollide(toPlane, toCenter, hoop)) onCollision(hoop);

  if (toPlane < .2 && toCenter < 2) hoop.status = 'pending';
  //went through hoop! Need to make sure it gets back out. note the .1 leniency. TODO need to increase.

  if (hoop.status === 'pending' && toPlane > .8){
  //successfully cleared ring, note the .8 is arbitrary
    const speed = sphere.velocity.length();
    score += speed > .25 ? 20 : 10;
    hoop.status = 1;
    hoop.material.color = new THREE.Color(0x55aa55);
    console.log(score);
    // sphere.add(plus()); //TODO
    timer += 120;
  }
}


function update(){

  if (sphere.material.color.getHex() !== 0xFFFFFF){
    const diff = new THREE.Color(0xFFFFFF).sub(sphere.material.color);
    sphere.material.color.add(diff.multiplyScalar(.01));
  }

  document.getElementById('stats').innerHTML = `Score: ${score} Time: ${timer}`
  if (timer <= 0){
    window.addEventListener('keydown',playAgain);
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('score').innerHTML = score;
    return;
  }
  if (duration === 45){
    duration=0;
    hoopPath.addHoop();
    //if (hoopPath.hoops.length > 200) console.log(hoopPath.hoops.shift());
  }
  timer--;
  duration++;



  //TODO text alert
  // sphere.children.slice(1).forEach(child => {
  //   if (child.frameLife > 70) sphere.remove(child);
  //   // child.rotateY(.08); //TODO marquee
  //   child.material.opacity -= 1/70;
  //   child.position.y += .002;
  //   child.frameLife++;
  // })

  applySteering();
  hoops.forEach(hoop => updateHoop(hoop));
  movePlayer();

  renderer.render(scene, camera);
  run = requestAnimationFrame(update);
}


function playAgain(e){
  if (e.keyCode !== 89 && e.keyCode !== 13) return;
  if (run) start();
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('instructions').classList.add('hidden');
  window.removeEventListener('keydown',playAgain);
  run = requestAnimationFrame(update);
}

function instructions(){
  document.getElementById('instructions').classList.remove('hidden');
  document.getElementById('instructions').classList.add('visible');
  start();
  renderer.render(scene, camera);
  window.addEventListener('keydown', playAgain);
}
