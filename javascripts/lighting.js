import * as THREE from 'three'

const pointLight =
  new THREE.PointLight(0xFFFFFF);


pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;


const ambientLight = new THREE.AmbientLight( 0x444400 );

export { pointLight, ambientLight }
