import * as THREE from 'three'

const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF});

export const points = [
	new THREE.Vector3( 0, 0, -1 ),
	new THREE.Vector3( 0, 0, -2 ),
	new THREE.Vector3( 0, 0, -3 ),
	new THREE.Vector3( 0, 0, -4 ),
	new THREE.Vector3( 0, 0, -5 ),
  new THREE.Vector3( 0, 0, -6 ),
	new THREE.Vector3( 0, 0, -7 ),
];

export const geo = points => {
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, 1000, .5, 20);
}


const tube = new THREE.Mesh( geo(points), material );
tube.geometry = geo(points);





tube.position.z = -20;
export { tube };
