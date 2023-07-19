import { defineStore } from 'pinia';

export const useUkraineCitiesDataStore = defineStore('ukraineCitiesData', {
  state: () => ({
    jsonCitiesAndRegionsList: [],
  }),
});
