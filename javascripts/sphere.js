import * as THREE from 'three';

const radius = 1;
const segments = 16;
const rings = 16;


const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xFF00FF
    });

export const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    radius,
    segments,
    rings
  ),

  sphereMaterial
)
