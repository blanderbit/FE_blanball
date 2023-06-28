<template>
  <div class="b-chat-page" :style="chatPageStyle">
    <div ref="CHAT_TOP_SIDE_BLOCK" class="b-chat-top-side">
      <ChatTopBlock :chatData="chatData" />
    </div>
    <div class="b-chat-page-main-side">
      <div class="b-main-side-messages-block" :style="messagesListBlockStyle">
        dffdfdfd
      </div>
      <div ref="CHAT_BOTTOM_SIDE_BLOCK" class="b-main-side-bottom-block">
        <KickedFromChatMessage v-if="chatData.disabled" />
        <SendMessageBlock />
        {{ chatPageStyle }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue';

import { useElementSize } from '@vueuse/core';

import Message from '../../../components/main/chat/Message.vue';
import SendMessageBlock from '../../../components/main/chat/SendMessageBlock.vue';
import RequestForChat from '../../../components/main/chat/RequestForChat.vue';
import KickedFromChatMessage from '../../../components/main/chat/KickedFromChatMessage.vue';
import ChatTopBlock from '../../../components/main/chat/ChatTopBlock.vue';

import { PaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';
import { calcHeight } from '../../../utils/calcHeight';
import { useWindowWidth } from '../../../utils/widthScreen';
import { BlanballEventBus } from '../../../workers/event-bus-worker';
import { useSideBarStore } from '../../../stores/sideBar';

const CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX = 40;

export default {
  components: {
    ChatTopBlock,
    SendMessageBlock,
    KickedFromChatMessage,
  },
  setup() {
    const chatData = ref({
      name: 'dffddfdfdf fdfddffd',
      disabled: true,
    });
    const sideBarStore = useSideBarStore();

    const CHAT_TOP_SIDE_BLOCK = ref();
    const CHAT_BOTTOM_SIDE_BLOCK = ref();

    const { height: CHAT_TOP_SIDE_BLOCK_HEIGHT } =
      useElementSize(CHAT_TOP_SIDE_BLOCK);
    const { height: CHAT_BOTTOM_SIDE_BLOCK_HEIGHT } = useElementSize(
      CHAT_BOTTOM_SIDE_BLOCK
    );
    const { calculatedHeight: chatPageHeight } = calcHeight([
      CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX,
    ]);
    const { windowWidth, detectedDevice, DEVICE_TYPES } = useWindowWidth();

    const messagesListBlockStyle = computed(() => {
      return {
        height: `${
          chatPageHeight.value -
          CHAT_BOTTOM_SIDE_BLOCK_HEIGHT.value -
          CHAT_TOP_SIDE_BLOCK_HEIGHT.value
        }px`,
      };
    });

    const chatPageStyle = computed(() => {
      // if (detectedDevice.value == DEVICE_TYPES.DESKTOP) {
      //   return {
      //     width: `${windowWidth.value}px`,
      //   };
      // }
    });

    onBeforeMount(() => {
      BlanballEventBus.emit('OpenSideBar');
    });

    return {
      chatData,
      CHAT_TOP_SIDE_BLOCK,
      CHAT_BOTTOM_SIDE_BLOCK,
      messagesListBlockStyle,
      chatPageStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-page {
  height: fit-content;
  background-image: url('../../../assets/img/chat/chat-background.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;

  @include mobile {
    background: #efeff6;
  }

  .b-chat-page-main-side {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    @include mobile {
      padding: 20px 8px;
    }

    .b-main-side-bottom-block {
      max-width: 1000px;
      margin: 0 auto;
    }
  }
}
</style>
