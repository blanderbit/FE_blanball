import { defineStore } from 'pinia';

export const useChatDataStore = defineStore('chatData', {
  state: () => ({
    infoAboutMe: {},
  }),
  getters: {
    getInfoAboutMe: (state) => state.infoAboutMe,
  },
});
