import * as THREE from 'three';

const radius = .5;
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
  const radius = Math.random()*3;
  const segments = 40;
  const rings = 40;
  // const color = randColor();
  const color = radius > .5 ? 0xFF0000 : 0x0000FF;

  const z = (Math.random() + 1) * -30;
  const y = (Math.random() -.5) * 30;
  const x = (Math.random() -.5) * 30;


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.SphereGeometry(radius, segments, rings);


  const sphere = new THREE.Mesh(g,m);
  sphere.position.set(x, y, z);
  return sphere;
}






export const randomTorus = () => {

  const radius = 2;
  const tube = .3;
  const rsegs = 300;
  const tsegs = 300;

  const color = randColor();

  const z = (Math.random() + 1) * -30;
  const y = (Math.random() -.5) * 30;
  const x = (Math.random() -.5) * 30;


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.TorusGeometry(radius, tube, rsegs, tsegs);

  const torus =  new THREE.Mesh(g,m);
  torus.position.set(x, y, z)
  return torus;
}
