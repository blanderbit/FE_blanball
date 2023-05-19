import { defineStore } from 'pinia';

export const useHintsStore = defineStore('hintsData', {
  state: () => ({
    hintsData: [],
  }),
});
