import * as THREE from 'three';
import { scene } from './game';




export default class Hoopie {
  constructor(
    scene,
    toggleChance = .1,
    omega0 = new THREE.Vector2(-.2,0),
    tauFactor = .03,
    spacing = 15,
    numHoops = 100){
      this.hoopCounter = 0;
      this.scene = scene;
      this.toggleChance = toggleChance;
      this.omega = omega0;
      this.rotation = new THREE.Vector2();
      this.tauFactor = tauFactor;
      this.spacing = spacing;
      this.positions = [new THREE.Vector3()];
      this.numHoops = numHoops;
      this.nav = {
        up:     {on:false, coord:'x', orientation: -1},
        down:   {on:false, coord:'x', orientation: 1},
        left:   {on:false, coord:'y', orientation: 1},
        right:  {on:false, coord:'y', orientation: -1},
      };
      this.dots = [];
      this.numdots = 4;
      this.hoops = [];
      this.initializeHoops();
  }

  initializeHoops(){
    for (let i = 0; i < this.numHoops; i++) {
      this.addHoop();
    }
  }


  findHoop(hoopId) {
    let floor = 0;
    let ceil = this.hoops.length - 1;

    while (floor < ceil) {
      const idx = Math.floor((floor+ceil)/2);
      if (this.hoops[idx].hoopId === hoopId) return idx;
      if (hoopId < this.hoops[idx].hoopId){
        ceil = idx - 1;
      } else {
        floor = idx + 1;
      }
    }
    if (this.hoops[floor].hoopId === hoopId) return floor;
    return -1;
  }

  onEncounter(hoopId) {
    const index = this.findHoop(hoopId);
    if (index === -1) return;

    const hoopsToAdd = this.numHoops - (this.hoops.length - 1 - index);

    for (let i=0; i<hoopsToAdd; i++) this.addHoop();
    while (this.hoops.length > this.numHoops*2) {
      const trashHoop = this.hoops.shift();
      this.scene.remove(trashHoop);
    }
  }

  generateHoop(){
    const radius = 3;
    const tube = .3;
    const rsegs = 20;
    const tsegs = 40;

    const m = new THREE.MeshPhongMaterial({ color: 0xaa8844, envMap: this.scene.background });
    const g = new THREE.TorusGeometry(radius, tube, rsegs, tsegs);
    const hoop = new THREE.Mesh(g,m);

    hoop.status = 0;
    hoop.omega = new THREE.Vector3();
    hoop.velocity = new THREE.Vector3();
    hoop.hoopId = ++this.hoopCounter;

    return hoop;
  }


  addHoop(){
    const tau = new THREE.Vector2(0,0);
    const lastPos = this.positions[this.positions.length - 1];

    ['up','down','left','right'].forEach( dir => {

      if (this.nav[dir].on){
        tau[this.nav[dir].coord] += this.nav[dir].orientation * this.tauFactor;
      }
      if (Math.random() < this.toggleChance) this.nav[dir].on = !this.nav[dir].on;
    });


    this.omega.multiplyScalar(.9).add(tau);
    this.rotation.add(this.omega);

    const velocity = new THREE.Vector3(0,0, -1 * this.spacing);
    const rotX = new THREE.Matrix4().makeRotationX(this.rotation.x)
    const rotY = new THREE.Matrix4().makeRotationY(this.rotation.y);

    velocity.applyMatrix4(rotX).applyMatrix4(rotY);


    // this.dotLine(); //TODO comment back in for dots

    const position = lastPos.clone().add(velocity);
    this.positions.push(position.clone());


    const hoop = this.generateHoop();

    hoop.position.set(position.x, position.y, position.z);
    hoop.lookAt(lastPos)

    this.hoops.push(hoop);
    this.scene.add(hoop);
  }


  // dotLine(){
  //   const pos = new THREE.Vector3();
  //   const vel = new THREE.Vector3(0,0,1 * this.spacing);
  //   for (let j = 0; j < this.numdots; j++) {
  //     const m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, transparent:true, opacity: .5 });
  //     const g = new THREE.SphereGeometry(.2,8,8);
  //     const increment = vel.clone().multiplyScalar(1 / this.numdots * j)
  //     const position = pos.clone().add(increment);
  //     const dot = new THREE.Mesh(g,m);
  //     dot.position.set(position.x, position.y, position.z);
  //     const hoop = this.hoops[this.hoops.length - 1];
  //     if (hoop) hoop.add(dot);
  //   }
  // }
}
