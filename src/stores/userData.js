import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser: (state) => state.user,
    getUserFullName: (state) => {
      return `${state.user?.profile?.last_name} ${state.user?.profile?.name}`;
    },
    getUserAvatar: (state) => state.user?.profile?.avatar_url,
  },
  actions: {},
});
