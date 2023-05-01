import { ref } from 'vue';

export const calcHeight = (defaultHeights = [], mobile = [], tablet = []) => {
  const appHeightValue = ref(window.innerHeight);
  const calculatedHeight = ref();

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

  const onAppHeightResize = () => {
    calculate();
  };

  calculate();

  return {
    appHeightValue,
    calculatedHeight,
    onAppHeightResize,
  };
};
