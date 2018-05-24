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
      color: 0xffffff
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
  const segments = 40;
  const rings = 40;
  const color = randColor();


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.SphereGeometry(radius, segments, rings);

  return new THREE.Mesh(g,m);
}






export const randomTorus = () => {

  const radius = 2;
  const tube = .3;
  const rsegs = 300;
  const tsegs = 300;

  const color = randColor();


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.TorusGeometry(radius, tube, rsegs, tsegs);

  return new THREE.Mesh(g,m);
}
