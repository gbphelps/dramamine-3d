

export const mouseTracker = () => {
  const board = document.getElementsByTagName('CANVAS')[0];

  const getMousePos = e => {
    const rect = board.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top]
  }

  board.addEventListener('mousemove', e => {
    console.log(getMousePos(e));
  })
}
