export const randomSphere = () => {
  const radius = Math.random()*3;
  const segments = 40;
  const rings = 40;
  // const color = randColor();
  const color = radius > .5 ? 0xFF0000 : 0x0000FF;

  const z = (Math.random() + 1) * -30;
  const y = (Math.random() -.5) * 30;
  const x = (Math.random() -.5) * 30;


  const m = new THREE.MeshLambertMaterial({ color });
  const g = new THREE.SphereGeometry(radius, segments, rings);


  const sphere = new THREE.Mesh(g,m);
  sphere.position.set(x, y, z);
  return sphere;
}
