export function calculateModalPosition(modalSize, x, y) {
  let top = y;
  let left = x;

  if (left + modalSize.width > window.innerWidth) {
    left = window.innerWidth - modalSize.width;
  }

  if (top + modalSize.height > window.innerHeight) {
    top = window.innerHeight - modalSize.height;
  }

  return {
    top: top + 'px',
    left: left + 'px',
  };
}
