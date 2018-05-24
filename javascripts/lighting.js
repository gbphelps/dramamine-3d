import * as THREE from 'three'

const pointLight1 =
  new THREE.PointLight(0xFFFF00);

pointLight1.position.set(10,50,130);


const pointLight2 =
  new THREE.PointLight(0x00FFFF);
pointLight2.position.set(-10,50,-130);


const ambientLight = new THREE.AmbientLight( 0xaaeeff );

export { pointLight1, pointLight2, ambientLight }
