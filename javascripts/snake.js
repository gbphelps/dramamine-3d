import * as THREE from 'three'

const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF});

export const points = [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 6, 10 ),
  new THREE.Vector3( 5, 8, 5 ),
	new THREE.Vector3( 10, 0, 3 ),
];

export const geo = points => {
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, 1000, .5, 20);
}


const tube = new THREE.Mesh( geo(points), material );
tube.geometry = geo(points);





tube.position.z = -20;
export { tube };
