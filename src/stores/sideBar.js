import { defineStore } from 'pinia';

export const useSideBarStore = defineStore('sideBarData', {
  state: () => ({
    isSideBarOpened: false,
    isMobMenuActive: false
  }),
});
