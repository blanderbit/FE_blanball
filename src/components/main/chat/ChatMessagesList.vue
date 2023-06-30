<template>
  <div class="b-chat-messages__list">
    <SmartList
      :list="paginationElements"
      ref="refList"
      v-model:scrollbar-existing="blockScrollToTopIfExist"
    >
      <template #smartListItem="slotProps">
        <ChatMessage
          :key="slotProps.index"
          :messageData="slotProps.smartListItem"
          @chatMessageRightClick="chatMessageRightClick"
        />
      </template>
      <template #after>
        <InfiniteLoading
          :identifier="triggerForRestart"
          ref="scrollbar"
          @infinite="loadDataPaginationData($event)"
        >
          <template #complete>
            <NoScheduledEvents
              v-if="!paginationElements.length"
              :userData="userData"
            />
          </template>
        </InfiniteLoading>
      </template>
    </SmartList>
  </div>
</template>

<script>
import { ref } from 'vue';

import { v4 as uuid } from 'uuid';

import InfiniteLoading from '../infiniteLoading/InfiniteLoading.vue';
import SmartList from '../../shared/smartList/SmartList.vue';
import ChatMessage from './ChatMessage.vue';

export default {
  components: {
    InfiniteLoading,
    ChatMessage,
    SmartList,
  },
  setup(_, { emit }) {
    const refList = ref();
    const triggerForRestart = ref(false);

    const blockScrollToTopIfExist = ref(false);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const paginationElements = ref([
      {
        id: 1,
        sender: {
          id: 1,
          profile: {
            name: 'Андрей',
            last_name: 'Артуров',
          },
        },
        text: 'dffffffffffffffffffffffffffffffffffffffff',
        time_created: new Date(),
        edited: false,
        isMine: false,
        readed_by: [],
        reply_to: null,
      },
      {
        id: 2,
        sender: {
          id: 1,
          profile: {
            name: 'Андрей',
            last_name: 'Артуров',
          },
        },
        text: 'fdddddddddddddddddddddddfddddddddddddddddddfdddddddddddddddddddddddfddddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfddddddddddddddddddddddd',
        time_created: new Date(),
        edited: false,
        isMine: true,
        readed_by: [],
        reply_to: null,
      },
      {
        id: 3,
        sender: {
          id: 1,
          profile: {
            name: 'Андрей',
            last_name: 'Артуров',
          },
        },
        text: 'fdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfddddddddddddddddddddddd',
        time_created: new Date(),
        edited: false,
        isMine: false,
        readed_by: [],
        reply_to: null,
      },
    ]);

    function loadDataPaginationData($state) {
      $state.loaded();
      return paginationElements.value;
    }

    function chatMessageRightClick(e, messageData) {
      emit('chatMessageRightClick', e, messageData);
    }

    return {
      refList,
      paginationElements,
      triggerForRestart,
      blockScrollToTopIfExist,
      restartInfiniteScroll,
      loadDataPaginationData,
      chatMessageRightClick,
    };
  },
};
</script>

<style lang="scss" scoped></style>
