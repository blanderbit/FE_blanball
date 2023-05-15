import { defineStore } from 'pinia';

export const useHeaderHeightStore = defineStore('headerHeightData', {
  state: () => ({
    headerHeight: 0,
  }),
});
