import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    // increment() {
    //   this.count++
    // },
  },
})