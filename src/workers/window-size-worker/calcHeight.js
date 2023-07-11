import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { BlanballEventBus } from '../event-bus-worker';

export const setHeightVH = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
};

export const calcHeight = (
  defaultHeights = [],
  mobile = [],
  tablet = [],
  recalculateAfterVerifyEmail
) => {
  const appHeightValue = ref(window.innerHeight);
  const calculatedHeight = ref();
  const minussedHeight = ref(0);
  const plussedHeight = ref(0);

  const calculate = () => {
    let allHeights = [...defaultHeights];

    if (window.innerWidth <= 768 && mobile.length) {
      allHeights = allHeights.concat(mobile);
    } else if (
      window.innerWidth > 768 &&
      window.innerWidth <= 992 &&
      tablet.length
    ) {
      allHeights = allHeights.concat(tablet);
    }
    appHeightValue.value = window.innerHeight;
    appHeightValue.value = window.innerHeight;
    calculatedHeight.value =
      appHeightValue.value -
      allHeights.reduce((total, current) => total + current);
  };

  if (recalculateAfterVerifyEmail) {
    BlanballEventBus.on('emailVerified', () => {
      calculatedHeight.value += 40;
    });
  }

  const minusHeight = (height) => {
    calculatedHeight.value -= height;
    minussedHeight.value += height;
    plussedHeight.value -= height;
  };

  const plusHeight = (height) => {
    calculatedHeight.value += height;
    minussedHeight.value -= height;
    plussedHeight.value += height;
  };

  const onAppHeightResize = () => {
    calculate();
  };

  calculate();

  onMounted(() => {
    window.addEventListener('resize', onAppHeightResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onAppHeightResize);
  });

  watch(
    defaultHeights,
    () => {
      console.log('dffddf');
      calculate();
    },
    { deep: true }
  );

  return {
    appHeightValue,
    calculatedHeight,
    minussedHeight,
    onAppHeightResize,
    minusHeight,
    plusHeight,
  };
};
