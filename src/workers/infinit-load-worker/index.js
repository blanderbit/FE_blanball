const stateHandler = (state) => ({
  loading() {
    state.value = 'loading';
  },
  loaded() {
    state.value = 'loaded';
  },
  complete() {
    state.value = 'complete';
  },
  error() {
    state.value = 'error';
  },
});

const initEmitter = (emit, stateHandler) => {
  return () => {
    stateHandler.loading();
    emit('infinite', stateHandler);
  };
};

const isVisible = (el, view) => {
  const elRect = el.getBoundingClientRect();
  if (!view) return elRect.top >= 0 && elRect.bottom <= window.innerHeight;
  const viewRect = view.getBoundingClientRect();
  return elRect.top >= viewRect.top && elRect.bottom <= viewRect.bottom;
};

let observer;
const startObserver = (params) => {
  params.emit();
  params.parentEl = document.querySelector(params.target) || null;

  let rootMargin = `0px 0px ${params.distance}px 0px`;
  if (params.top) rootMargin = `${params.distance}px 0px 0px 0px`;
  observer = new IntersectionObserver(
    (entries) => {
      console.log(3)
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (params.firstload) {
          params.emit();
        }
        params.firstload = true;
      }
    },
    { root: params.parentEl, rootMargin, threshold: 1 }
  );
  observer.observe(params.infiniteLoading.value);
};

const stopObserver = () => {
  observer.disconnect();
};

export { startObserver, stopObserver, stateHandler, initEmitter, isVisible };
