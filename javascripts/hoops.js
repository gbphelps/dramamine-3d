import * as THREE from 'three'


export const randomHoop = () => {

  const radius = 2;
  const tube = .3;
  const rsegs = 20;
  const tsegs = 20;

  const color = 0x555555 ;

  const z = (Math.random() + -.5) * 60;
  const y = (Math.random() -.5) * 30;
  const x = (Math.random() -.5) * 30;


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.TorusGeometry(radius, tube, rsegs, tsegs);

  const hoop =  new THREE.Mesh(g,m);
  hoop.position.set(x, y, z);
  hoop.status = 0;
  hoop.omega = new THREE.Vector3();
  hoop.omega = new THREE.Vector3(Math.random()*.01,Math.random()*.01,Math.random()*.01);

  return hoop;
}
