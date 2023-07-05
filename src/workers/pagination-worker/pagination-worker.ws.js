import { ref } from 'vue';
import { ChatSocketWorkerInstance } from '../web-socket-worker';

export const WebSocketPaginationWorker = (options) => {
  const {
    paginationDataRequest,
    dataTransformation,
    beforeConcat,
    notToConcatElements,
  } = options || {};

  const paginationElements = ref([]);
  const paginationPage = ref(0);
  const paginationTotalCount = ref(0);
  const paginationIsNextPage = ref(true);
  const requestId = ref(null);
  const state = ref(null);

  const paginationLoad = ({ pageNumber, $state, forceUpdate }) => {
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    state.value = $state;

    if (pageNumber === paginationPage.value && !forceUpdate) return;

    paginationPage.value = pageNumber;

    paginationDataRequest(pageNumber).then((result) => {
      if (result.data.request_id) {
        requestId.value = result.data.request_id;

        registerSocketPaginationCallBack();
      }
    });
  };

  const paginationProcessResponse = (result) => {
    const resultData = result.data;
    const paginationData = resultData?.data;

    if (resultData.status === 'success') {
      if (dataTransformation) {
        paginationData.results = paginationData.results.map(dataTransformation);
      }
      paginationElements.value = beforeConcat
        ? paginationElements.value.concat(
            beforeConcat(paginationElements.value, paginationData.results)
          )
        : paginationElements.value.concat(paginationData.results);
      paginationTotalCount.value = paginationData.total_count;
      paginationIsNextPage.value = paginationData.is_next_page;

      if (state.value?.loaded) state.value.loaded();
      if (!paginationIsNextPage.value && state.value?.complete)
        state.value.complete();
    } else if (resultData.status === 'error') {
      state.value?.complete && state.value.complete();
    }

    destroySocketPaginationCallBack();
  };

  const registerSocketPaginationCallBack = () => {
    ChatSocketWorkerInstance.registerCallback(paginationProcessResponse);
  };

  const destroySocketPaginationCallBack = () => {
    ChatSocketWorkerInstance.destroyCallback(paginationProcessResponse);
  };

  return {
    paginationElements,
    paginationTotalCount,
    paginationIsNextPage,
    paginationPage,
    requestId,
    paginationLoad,
    paginationProcessResponse,
  };
};
