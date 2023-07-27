export function smoothScrollUp(scrollSpeed, animationDuration) {
  const currentPosition = window.pageYOffset;
  const targetPosition = currentPosition - scrollSpeed;

  smoothScrollTo(targetPosition, animationDuration);
}

export function smoothScrollDown(scrollSpeed) {
  const currentPosition = window.pageYOffset;
  const targetPosition = currentPosition + scrollSpeed;

  smoothScrollTo(targetPosition, animationDuration);
}

export function smoothScrollTo(targetPosition, animationDuration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const scrollY = easeInOutCubic(
      timeElapsed,
      startPosition,
      distance,
      animationDuration
    );
    window.scrollTo(0, scrollY);
    if (timeElapsed < animationDuration) {
      window.requestAnimationFrame(animation);
    }
  }

  window.requestAnimationFrame(animation);
}

function easeInOutCubic(t, b, c, d) {
  t /= d;
  return c * t * t * t + b;
}
