import * as THREE from 'three'
window.THREE = THREE;

export const randomHoop = () => {

  const radius = 2;
  const tube = .3;
  const rsegs = 20;
  const tsegs = 20;

  const color = 0x555555 ;

  const z = (Math.random() + -.5) * 60;
  const y = (Math.random() -.5) * 30;
  const x = (Math.random() -.5) * 30;


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.TorusGeometry(radius, tube, rsegs, tsegs);

  const hoop =  new THREE.Mesh(g,m);
  hoop.position.set(x, y, z);
  hoop.status = 0;
  hoop.omega = new THREE.Vector3((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02);
  hoop.velocity = new THREE.Vector3((Math.random()-.5)*.01,(Math.random()-.5)*.01,(Math.random()-.5)*.01);
  return hoop;
}


export const hoopPath = (numHoops) => {

  const radius = 2;
  const tube = .3;
  const rsegs = 20;
  const tsegs = 20;
  const color = 0x555555;

  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.TorusGeometry(radius, tube, rsegs, tsegs);



  const rand = .8;

  const omega = new THREE.Vector2(0,0);
  const tauFactor = .4;
  const spacing = 10;

  const position = new THREE.Vector3(0,0,0);
  const positions = [position.clone()];


  const nav = {
    up:     {on:false, coord:'x', orientation: -1},
    down:   {on:false, coord:'x', orientation: 1},
    left:   {on:false, coord:'y', orientation: -1},
    right:  {on:false, coord:'y', orientation: 1},
  };

  const hoops = [];
  for (let i = 0; i < numHoops; i++) {
    const tau = new THREE.Vector2(0,0);

    ['up','down','left','right'].forEach( dir => {

      if (nav[dir].on) tau[nav[dir].coord] += nav[dir].orientation * tauFactor;
      if (Math.random() > rand) nav[dir].on = !nav[dir].on;
    });



    const omegaPrev = omega.clone();
    omega.multiplyScalar(.9).add(tau);

    const velocity = new THREE.Vector3(0,0, -1* spacing);
    const rotX = new THREE.Matrix4().makeRotationX(omega.x)
    const rotY = new THREE.Matrix4().makeRotationY(omega.y);

    velocity.applyMatrix4(rotX).applyMatrix4(rotY);

    position.add(velocity);
    positions.push(position.clone());

    const hoop = new THREE.Mesh(g,m);
    hoop.status = 0;
    hoop.omega = new THREE.Vector3();
    hoop.velocity = new THREE.Vector3();
    hoop.position.set(position.x, position.y, position.z);
    hoop.rotateX(-(omega.x + omegaPrev.x)/2);
    hoop.rotateY(-(omega.y + omegaPrev.y)/2);
    hoops.push(hoop);
  }

  return [hoops, positions];
}
