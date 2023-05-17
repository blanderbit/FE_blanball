<template>
  <SmartList
    :list="paginationElements"
    ref="refList"
    v-model:scrollbar-existing="blockScrollToTopIfExist"
  >
    <template #smartListItem="slotProps">
      <SchedulerUserCard
        :key="slotProps.index"
        :userData="slotProps.smartListItem"
        :type="mockData.user_card_type.FRIEND"
        :isActive="slotProps.smartListItem.id === activeUserId"
        @clickByUser="$emit('activateUser', $event)"
      />
    </template>
    <template #after>
      <InfiniteLoading
        :identifier="triggerForRestart"
        ref="scrollbar"
        @infinite="loadDataPaginationData(paginationPage + 1, $event)"
      >
        <template #complete>
          <div class="c-no-results">
            {{ $t('errors.no-results') }}
          </div>
          <ScrollToTop
            :element-length="paginationElements"
            :is-scroll-top-exist="blockScrollToTopIfExist"
            @scroll-button-clicked="scrollToFirstElement()"
          />
        </template>
      </InfiniteLoading>
    </template>
  </SmartList>
</template>

<script>
import { ref, computed, watch } from 'vue';

import SmartList from '../../../components/shared/smartList/SmartList.vue';
import ScrollToTop from '../../ScrollToTop.vue';
import InfiniteLoading from '../../main/infiniteLoading/InfiniteLoading.vue';
import SchedulerUserCard from './SchedulerUserCard.vue';

import { v4 as uuid } from 'uuid';

import { PaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';

import { CONSTS } from '../../../consts';

export default {
  components: {
    SmartList,
    ScrollToTop,
    InfiniteLoading,
    SchedulerUserCard,
  },
  props: {
    searchValue: {
      type: String,
      default: '',
    },
    activeUserId: {
      type: Number,
      default: 0,
    },
  },
  emits: ['activateUser'],
  setup(props) {
    const refList = ref();
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref(false);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const mockData = computed(() => {
      return {
        user_card_type: CONSTS.scheduler.USER_CARD_TYPE,
      };
    });

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.UserService.getAllUsers({
          page,
          search: props.searchValue,
        }),
    });

    function loadDataPaginationData(pageNumber, $state) {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    }

    loadDataPaginationData(1, null);

    let searchTimeout;

    const searchFriends = () => {
      clearTimeout(searchTimeout);

      const load = () => {
        paginationClearData();
        loadDataPaginationData(1, null);
        restartInfiniteScroll();
      };
      searchTimeout = setTimeout(load, 500);
    };

    watch(
      () => props.searchValue,
      () => {
        searchFriends();
      }
    );

    return {
      refList,
      triggerForRestart,
      blockScrollToTopIfExist,
      mockData,
      paginationElements,
      paginationPage,
      restartInfiniteScroll,
      loadDataPaginationData,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>
