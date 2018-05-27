import * as THREE from 'three';

export const makeBaddie = () => {
  const radius = .2;
  const height = 2;
  const segments = 10;

  const color = 0xFF0000;

  const z = (Math.random() -.5) * 30;
  const y = (Math.random() -.5) * 30;
  const x = (Math.random() -.5) * 30;


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.ConeGeometry(radius, height, segments);
  g.rotateX(Math.PI/2);
  console.log(g);



  const baddie = new THREE.Mesh(g,m);
  baddie.position.set(x, y, z);
  baddie.tau = new THREE.Vector2(0,0);
  baddie.omega = new THREE.Vector2(0,0);
  baddie.velocity = new THREE.Vector3(0,0,0);

  return baddie;
}

///use this script to chase and track


// for (var i = 0; i < 10; i++){
//   const baddie = makeBaddie();
//   baddies.push(baddie);
//   baddie.lookAt(sphere.position);
//   scene.add(baddie);
// }

// baddies.forEach(baddie => {
//   let accel =
//     new THREE.Vector3()
//       .subVectors(sphere.position, baddie.position)
//       .normalize()
//       .multiplyScalar(.003);
//   baddie.velocity.multiplyScalar(.99).add(accel);
//   baddie.position.add(baddie.velocity);
//   baddie.lookAt(sphere.position);
// });
