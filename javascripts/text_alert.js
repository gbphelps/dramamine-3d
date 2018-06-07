import * as THREE from 'three';
import font from 'three/examples/fonts/helvetiker_regular.typeface.json';

	const gplus = new THREE.TextGeometry( 'SCORE!', {
		font: new THREE.Font(font),
		size: .1,
		height: .1,
		curveSegments: 12,
	} );


  const gminus = new THREE.TextGeometry( 'MISS!', {
		font: new THREE.Font(font),
		size: .1,
		height: .1,
		curveSegments: 12,
	} );

  gminus.translate(-.2,-.1,.5);
  // gminus.rotateY(Math.PI); //TODO marquee
  gplus.translate(-.2,-.1,.5);
  // gplus.rotateY(Math.PI);





export const plus = () => {
	const blue = new THREE.MeshLambertMaterial({color: 0x0000FF, transparent:true});
  const object = new THREE.Mesh(gplus, blue);
  object.frameLife = 0;
  return object;
};

export const minus = () => {
	const red = new THREE.MeshLambertMaterial({color: 0xff0000, transparent:true});
  const object = new THREE.Mesh(gminus, red);
  object.frameLife = 0;
  return object;
};
