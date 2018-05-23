export const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
}

window.addEventListener('keydown', e=>{
  if (e.keyCode === 90)   controls.up     = true;
  if (e.keyCode === 88)   controls.down   = true;
  if (e.keyCode === 190)  controls.left   = true;
  if (e.keyCode === 191)  controls.right  = true;
})

window.addEventListener('keyup', e=>{
  if (e.keyCode === 90)   controls.up     = false;
  if (e.keyCode === 88)   controls.down   = false;
  if (e.keyCode === 190)  controls.left   = false;
  if (e.keyCode === 191)  controls.right  = false;
})
