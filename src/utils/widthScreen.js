import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth);
  const isMobileSmall = ref(window.innerWidth <= 576);
  const isMobile = ref(window.innerWidth <= 768);
  const isTablet = ref(window.innerWidth > 768 && window.innerWidth <= 992);
  const isBetweenTabletAndDesktop = ref(
    window.innerWidth > 992 && window.innerWidth <= 1200
  );

  function onResize() {
    windowWidth.value = window.innerWidth;
    isMobileSmall.value = window.innerWidth <= 576;
    isMobile.value = window.innerWidth <= 768;
    isTablet.value = window.innerWidth > 768 && window.innerWidth <= 992;
    isBetweenTabletAndDesktop.value =
      window.innerWidth > 992 && window.innerWidth <= 1200;
  }

  const resizeHandler = () => onResize(); // Closure for the event listener

  onMounted(() => {
    window.addEventListener('resize', resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
  });

  return {
    onResize,
    windowWidth,
    isMobileSmall,
    isMobile,
    isTablet,
    isBetweenTabletAndDesktop,
  };
}
