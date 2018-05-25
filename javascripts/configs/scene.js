import * as THREE from 'three';
import { camera, renderer } from './view';
import * as lights from './lighting';

const scene = new THREE.Scene();
lights.forEach(light => scene.add( light ));
