<template>
  <smartList
    :list="paginationElements"
    ref="refList"
    v-model:scrollbar-existing="blockScrollToTopIfExist"
  >
    <template #smartListItem="slotProps">
      <slot name="default" :smartListItem="slotProps.smartListItem"></slot>
    </template>
    <template #after>
      <InfiniteLoading
        ref="scrollbar"
        @infinite="loadDataPaginationData(paginationPage + 1, $event)"
      >
        <template #complete>
          <slot name="emptyList" v-if="!paginationElements.length" />

          <ScrollToTop
            :element-length="paginationElements"
            :is-scroll-top-exist="blockScrollToTopIfExist"
            @scroll-button-clicked="scrollToFirstElement()"
          />
        </template>
      </InfiniteLoading>
    </template>
  </smartList>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { PaginationWorker } from '@/workers/pagination-worker';
import smartList from '@sharedComponents/smartList/SmartList.vue';
import emptyList from '@sharedComponents/emptyList/EmptyList.vue';
import ScrollToTop from '@components/ScrollToTop.vue';
import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';

export default {
  components: {
    smartList,
    emptyList,
    InfiniteLoading,
    ScrollToTop,
  },
  props: {
    requestForGetData: {
      type: Function,
    },
  },
  setup(props) {
    const refList = ref();
    const blockScrollToTopIfExist = ref();
    const { t } = useI18n();

    const { paginationElements, paginationLoad, paginationPage } =
      PaginationWorker({
        paginationDataRequest: (page) => {
          return props.requestForGetData(page);
        },
      });

    paginationPage.value = 0;

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    const emptyListMessages = computed(() => {
      return {
        title: t('no_records.noUsers.title'),
        description: t('no_records.noUsers.description'),
      };
    });
    return {
      paginationElements,
      blockScrollToTopIfExist,
      emptyListMessages,
      refList,
      paginationPage,
      loadDataPaginationData,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style scoped></style>
