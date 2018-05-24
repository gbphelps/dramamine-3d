import * as THREE from 'three';

const radius = 1;
const segments = 16;
const rings = 16;

const randColor = () => {
  return Math.random()*16777216
}





const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: randColor()
    });

export const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    radius,
    segments,
    rings
  ),

  sphereMaterial
)






export const randomSphere = () => {
  const radius = Math.random();
  const segments = 16;
  const rings = 16;
  const color = randColor();


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.SphereGeometry(radius, segments, rings);

  return new THREE.Mesh(g,m);
}

window.randomSphere = randomSphere
