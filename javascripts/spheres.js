import * as THREE from 'three';

export const randomSphere = () => {
  const radius = 1;
  const segments = 40;
  const rings = 40;

  const color = 0xFF0000;

  const z = (Math.random() + 1) * -30;
  const y = (Math.random() -.5) * 30;
  const x = (Math.random() -.5) * 30;


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.SphereGeometry(radius, segments, rings);


  const sphere = new THREE.Mesh(g,m);
  sphere.position.set(x, y, z);
  sphere.tau = new THREE.Vector2(0,0);
  sphere.omega = new THREE.Vector2(0,0);
  sphere.velocity = new THREE.Vector3(0,0,0);
  return sphere;
}
