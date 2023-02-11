import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser: (state) => state.user,
    getUserFullName: (state) => {
      return `${state.user.profile.name} ${state.user.profile.last_name}`
    },
    getUserPhone: (state) => state.user.phone,
    getUserAvatar: (state) => state.user.profile.avatar_url,
  },
  actions: {
    // increment() {
    //   this.count++
    // },
  },
})
