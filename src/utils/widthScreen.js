import { ref, onMounted, onBeforeUnmount, computed } from 'vue';


export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth);
  const isMobileSmall = ref(window.innerWidth <= 576);
  const isMobile = ref(window.innerWidth <= 768);
  const isTablet = ref(window.innerWidth > 768 && window.innerWidth <= 992);
  const isBetweenTabletAndDesktop = ref(
    window.innerWidth > 992 && window.innerWidth <= 1200
  );
  const DEVICE_TYPES = {
    MOBILE_SMALL: 'mobileSmall',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    BETWEEN_TABLET_AND_DESKTOP: 'betweenTabletAndDesktop',
    DESKTOP: 'desktop'
  }

  function onResize() {
    windowWidth.value = window.innerWidth;
    isMobileSmall.value = window.innerWidth <= 576;
    isMobile.value = window.innerWidth <= 768;
    isTablet.value = window.innerWidth > 768 && window.innerWidth <= 992;
    isBetweenTabletAndDesktop.value =
      window.innerWidth > 992 && window.innerWidth <= 1200;
  }

  function checkDevice(width) {
    if (width <= 576) {
      return DEVICE_TYPES.MOBILE_SMALL;
    } else if (width >= 577 && width <= 768) {
      return DEVICE_TYPES.MOBILE;
    } else if (width > 768 && width <= 992) {
      return DEVICE_TYPES.TABLET;
    } else if (width > 992 && width <= 1200) {
      return DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP;
    } else if (width > 1200) {
      return DEVICE_TYPES.DESKTOP;
    }
  }

  const detectedDevice = computed(() => checkDevice(windowWidth.value));

  const resizeHandler = () => onResize(); // Closure for the event listener

  onMounted(() => {
    window.addEventListener('resize', resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
  });

  return {
    onResize,
    detectedDevice,
    DEVICE_TYPES,
    windowWidth,
    isMobileSmall,
    isMobile,
    isTablet,
    isBetweenTabletAndDesktop,
  };
}
