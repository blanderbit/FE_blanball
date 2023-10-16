
import { useHintsStore } from '@stores/hints';
import { pinia } from '@plugins/pinia.plugin';


const hintsStore = useHintsStore(pinia);

export const hintsData = () => {
  if (!Object.keys(hintsStore.hintsData).length) {
    return API.HintsService.getAllHints().then((res) => {
      hintsStore.$patch({
        hintsData: res.data,
      });
      return res.data;
    });
  } else {
    return hintsStore.hintsData;
  }
};
