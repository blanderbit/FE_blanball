import { ref } from 'vue';

export const PaginationWorker = (options) => {
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
  const functionsResults = ref([]);

  const paginationClearData = () => {
    paginationElements.value = [];
    paginationPage.value = 0;
    paginationTotalCount.value = 0;
    paginationIsNextPage.value = true;
  };

  const paginationLoad = async ({ pageNumber, $state, forceUpdate }) => {
    pageNumber = pageNumber < 1 ? 1 : pageNumber;

    if (pageNumber === paginationPage.value && !forceUpdate) return;

    if (!paginationIsNextPage.value && !forceUpdate) {
      $state?.complete && $state.complete();
      return;
    }
    if ($state?.loading) $state.loading();

    paginationPage.value = pageNumber;
    await Promise.all(functionsResults.value);
    functionsResults.value = [];
    const functionResult = paginationDataRequest(pageNumber)
      .then((result) => {
        if (!result.data) {
          result.data = result;
        }

        if (dataTransformation) {
          result.data.results = result.data.results.map(dataTransformation);
        }

        if (!notToConcatElements) {
          paginationElements.value = beforeConcat
            ? paginationElements.value.concat(
                beforeConcat(paginationElements.value, result.data.results)
              )
            : paginationElements.value.concat(result.data.results);
        } else {
          paginationElements.value = result.results;
        }
        paginationTotalCount.value = result.data.total_count;
        paginationIsNextPage.value = !!result.data.next;

        if ($state?.loaded) $state.loaded();
        if (!paginationIsNextPage.value && $state?.complete) $state.complete();
      })
      .catch((e) => {
        $state?.complete && $state.complete();
      });
    functionsResults.value.push(functionResult);
  };

  return {
    paginationElements,
    paginationPage,
    paginationTotalCount,
    paginationIsNextPage,
    paginationClearData,
    paginationLoad,
  };
};
