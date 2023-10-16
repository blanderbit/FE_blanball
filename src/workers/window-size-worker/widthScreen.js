export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth);
  const isMobileDevice = computed(() => windowWidth.value <= 576);
  const isTabletDevice = computed(
    () => windowWidth.value > 576 && windowWidth.value <= 768
  );
  const isLaptopDevice = computed(
    () => windowWidth.value > 768 && windowWidth.value <= 992
  );
  const isDesktopDevice = computed(() => windowWidth.value > 992);

  const isLaptopDeviceAndLess = computed(() => windowWidth.value <= 992);

  const isPhoneDevicesModel = computed(
    () => isTabletDevice.value || isMobileDevice.value
  );

  const DEVICE_TYPES = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    LAPTOP: 'laptop',
    DESKTOP: 'desktop',
  };

  function onResize() {
    windowWidth.value = window.innerWidth;
  }

  function checkDevice() {
    if (isMobileDevice.value) {
      return DEVICE_TYPES.MOBILE;
    } else if (isTabletDevice.value) {
      return DEVICE_TYPES.TABLET;
    } else if (isLaptopDevice.value) {
      return DEVICE_TYPES.LAPTOP;
    } else if (isDesktopDevice.value) {
      return DEVICE_TYPES.DESKTOP;
    }
  }

  const detectedDevice = computed(() => checkDevice());

  const resizeHandler = () => onResize();

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
    isMobileDevice,
    isTabletDevice,
    isLaptopDevice,
    isDesktopDevice,
    isPhoneDevicesModel,
    isLaptopDeviceAndLess,
  };
}
