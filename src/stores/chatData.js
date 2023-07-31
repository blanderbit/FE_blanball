import { defineStore } from 'pinia';

export const useChatDataStore = defineStore('chatData', {
  state: () => ({
    infoAboutMe: {},
    chatData: {},
  }),
  getters: {
    getInfoAboutMe: (state) => state.infoAboutMe,
    getchatData: (state) => state.chatData,
  },
});
