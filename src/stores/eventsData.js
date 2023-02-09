import { defineStore } from 'pinia'

export const useEventDataStore = defineStore('eventsData', {
  state: () => ({
    events: {},
  }),
  getters: {
    getEvents: (state) => state.events,
  },
  actions: {
    // increment() {
    //   this.count++
    // },
  },
})
