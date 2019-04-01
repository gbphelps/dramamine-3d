import * as THREE from 'three';

let scene, skybox;



function getWorldCube(){
  return new Promise(resolve => {
    if (skybox) resolve(skybox);
    new THREE.CubeTextureLoader().setPath('javascripts/').load([
      'sky_4.jpg',
      'sky_2.jpg',

      'sky_1.jpg',
      'sky_6.jpg',

      'sky_3.jpg',
      'sky_5.jpg',
    ], result => {
      resolve(skybox = result);
    })
  })
}





export function get(){
  return scene;
}

export function reset(){
  scene = new THREE.Scene();
  scene.background = skybox;
}

export function init(){
  scene = new THREE.Scene();
  return getWorldCube().then(skybox => {
    return new Promise(resolve => {
      scene.background = skybox;
      resolve(scene)
    })
  })
}
