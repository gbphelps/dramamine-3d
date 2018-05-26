import * as THREE from 'three';
import font from 'three/examples/fonts/helvetiker_regular.typeface.json';

	const g = new THREE.TextGeometry( '+1', {
		font: new THREE.Font(font),
		size: .25,
		height: .1,
		curveSegments: 12,
	} );

  g.translate(-.2,-.1,.5)

const m = new THREE.MeshLambertMaterial({color: 0xbb9900})
export const text = () => {return new THREE.Mesh(g, m)};
