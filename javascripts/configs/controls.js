export const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
}

window.addEventListener('keydown', e=>{
  if (e.keyCode === 40)   controls.up      = true;
  if (e.keyCode === 38)   controls.down    = true;
  if (e.keyCode === 37)   controls.left    = true;
  if (e.keyCode === 39)   controls.right   = true;
  if (e.keyCode === 32)   controls.forward = true;
})

window.addEventListener('keyup', e=>{
  if (e.keyCode === 40)   controls.up      = false;
  if (e.keyCode === 38)   controls.down    = false;
  if (e.keyCode === 37)   controls.left    = false;
  if (e.keyCode === 39)   controls.right   = false;
  if (e.keyCode === 32)   controls.forward = false;
})
