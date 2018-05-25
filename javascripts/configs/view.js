import * as THREE from 'three';


const width = window.innerWidth;
const height = window.innerHeight;
const viewAngle = 75;
const aspect = width / height;
const near = .1;
const far = 1000;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);


export {camera, renderer}
