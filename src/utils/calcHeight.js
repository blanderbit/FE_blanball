import { ref } from 'vue';

export const calcHeight = (...args) => {
  const appHeightValue = ref(window.innerHeight);
  const calculatedHeight = ref(
    appHeightValue.value - args.reduce((total, current) => total + current)
  );

  const onAppHeightResize = () => {
    appHeightValue.value = window.innerHeight;
    calculatedHeight.value =
      appHeightValue.value - args.reduce((total, current) => total + current);
  };

  return {
    appHeightValue,
    calculatedHeight,
    onAppHeightResize,
  };
};
