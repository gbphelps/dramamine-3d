import * as THREE from 'three';
import font from 'three/examples/fonts/helvetiker_regular.typeface.json';

	const gplus = new THREE.TextGeometry( '+1', {
		font: new THREE.Font(font),
		size: .25,
		height: .1,
		curveSegments: 12,
	} );


  const gminus = new THREE.TextGeometry( '-1', {
		font: new THREE.Font(font),
		size: .25,
		height: .1,
		curveSegments: 12,
	} );

  gminus.translate(-.2,-.1,.7);
  gminus.rotateY(Math.PI);
  gplus.translate(-.2,-.1,.7);
  gplus.rotateY(Math.PI);

const black = new THREE.MeshLambertMaterial({color: 0x000000});
const red = new THREE.MeshLambertMaterial({color: 0xff0000});


export const plus = () => {
  const object = new THREE.Mesh(gplus, black);
  object.frameLife = 0;
  return object;
};

export const minus = () => {
  const object = new THREE.Mesh(gminus, red);
  object.frameLife = 0;
  return object;
};
