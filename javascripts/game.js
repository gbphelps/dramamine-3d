import * as THREE from 'three';
import { controls } from './controls';
import { camera, renderer } from './view.js';
import { sphere, randomSphere, randomTorus } from './sphere';
import { pointLight1, pointLight2, ambientLight } from './lighting';
import { randomHoop } from './hoops';



const scene = new THREE.Scene();


const hoops = [];

for (var i = 0; i < 20; i++) {

  const hoop = randomHoop();
  scene.add(hoop);
  hoops.push(hoop);
}

camera.position.z = 4;


scene.add( pointLight1 );
scene.add( pointLight2 );
scene.add( ambientLight );
scene.add( sphere.add(camera) );
scene.background = new THREE.Color( 0x87cefa );


let tau = new THREE.Vector2(0,0);
let omega = new THREE.Vector2(0,0);
let velocity = new THREE.Vector3(0,0,0);
let score = 0;


function update(){

  let tau = new THREE.Vector2(0,0);
  tau.x += controls.up    ? .002 : 0;
  tau.x -= controls.down  ? .002 : 0;
  tau.y += controls.left  ? .002 : 0;
  tau.y -= controls.right ? .002 : 0;

  omega.multiplyScalar(.95).add(tau);

  sphere.rotateX(omega.x);
  sphere.rotateY(omega.y);


  hoops.forEach(hoop => {
    if (hoop.status == -1) return;
    const hoopRadius = hoop.geometry.parameters.radius;

    const distanceVec = new THREE.Vector3().subVectors(hoop.position,sphere.position);
    const distance = distanceVec.length();
    const normal = new THREE.Vector3(0,0,1).applyMatrix4(new THREE.Matrix4().extractRotation(hoop.matrix));
    const distanceToPlane = Math.abs(distanceVec.dot(normal));
    const distanceToCenter = Math.sqrt(distance*distance - distanceToPlane*distanceToPlane);
    if (distanceToPlane < (.5 + .3) && distanceToCenter < (2 + .3 + .5) && distanceToCenter > (2 - .3 - .5))
    {
      score -= (hoop.status == 1 ? 2 : 1);
      console.log(score);
      hoop.material.color = new THREE.Color(0xFF0000);
      hoop.material.transparent = true;
      hoop.material.opacity = .5;
      hoop.material.needsUpdate = true;
      hoop.status = -1;
    }
    if (distanceToPlane < .1 && distanceToCenter < 2){ //distance to plane should really be 0 but it's glitchy

      hoop.material.color = new THREE.Color(0xFFFF00);
      if (hoop.status === 0) score += 1;
      hoop.status = 1;
      console.log(score);
    } //2 is the torus radius, .5 rad ball, .3 rad tube


    hoop.rotateX(hoop.omega.x);
    hoop.rotateY(hoop.omega.y);
  });


  let accel = new THREE.Vector3(0,0,0);
  if (controls.forward) {
    let direction = new THREE.Vector3(0,0,-.003);
    let forward = new THREE.Matrix4().extractRotation(sphere.matrix);
    accel = direction.applyMatrix4( forward );
  }

  velocity.multiplyScalar(.99).add(accel);
  sphere.position.add(velocity); //friction?





  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
