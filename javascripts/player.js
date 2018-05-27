import * as THREE from 'three';

const radius = .5;
const segments = 10;
const rings = 10;
const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xffffff
    });

export const newPlayer = () => {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
      radius,
      segments,
      rings
    ),
    sphereMaterial
  )
  sphere.tau = new THREE.Vector2(0,0);
  sphere.omega = new THREE.Vector2(0,0);
  sphere.velocity = new THREE.Vector3(0,0,0);
  return sphere;
}
