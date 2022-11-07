import { ref } from 'vue';

export const PaginationWorker = (options) => {
    const { paginationDataRequest, filters, dataTransformation } = options || {};
    const elements = ref([]);
    const paginationElement = ref();
    const page = ref(0);
    const nextPage = ref(true);


    const clearData = () => {
        elements.value = [];
        page.value = 0;
        nextPage.value = true;
    };

    const loadNotification = async (pageNumber, $state) => {
        if (!nextPage.value) {
          $state?.complete && $state.complete();
          return;
        }
        if ($state?.loading) $state.loading();

        page.value = pageNumber;
        await paginationDataRequest(pageNumber, filters)
            // .then((result) => {
            //     result.data.results.map((item) => {
            //         item.metaData = {
            //             page: pageNumber
            //         };
            //         return item
            //     });
            //     return result
            // })
            .then((result) => {
                if(dataTransformation) {
                    result.data.results = result.data.results
                        .map(dataTransformation);
                }

                // elements.value = result.data.results
                elements.value = elements.value
                    .concat(result.data.results);

                nextPage.value = !!result.data.next;

                if ($state?.loaded) $state.loaded();
                if (!nextPage.value && $state?.complete) $state.complete();
            })
            .catch(() => {
                $state?.complete && $state.complete()
            });
    };

    return {
        elements,
        page,
        nextPage,
        loadNotification,
        clearData,
        paginationElement
    }

};