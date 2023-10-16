import { useUkraineCitiesDataStore } from '@stores/ukraineCities';
import { pinia } from '@plugins/pinia.plugin';

const ukraineCitiesStore = useUkraineCitiesDataStore(pinia);

export const ukraineCitiesData = () => {
  if (!Object.keys(ukraineCitiesStore.jsonCitiesAndRegionsList).length) {
    return API.LocationService.getUkraineCitesList().then((res) => {
      ukraineCitiesStore.$patch({
        jsonCitiesAndRegionsList: res.data,
      });
      return res.data;
    });
  } else {
    return ukraineCitiesStore.jsonCitiesAndRegionsList;
  }
};
