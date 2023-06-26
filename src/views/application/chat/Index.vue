<template>
  <Message :messageData="messageData" />
  <SendMessageBlock />
  <RequestForChat />
  <KickedFromChatMessage />
</template>

<script>
import { ref } from 'vue';

import Message from '../../../components/main/chat/Message.vue';
import SendMessageBlock from '../../../components/main/chat/SendMessageBlock.vue';
import RequestForChat from '../../../components/main/chat/RequestForChat.vue';
import KickedFromChatMessage from '../../../components/main/chat/KickedFromChatMessage.vue';

export default {
  components: {
    Message,
    SendMessageBlock,
    RequestForChat,
    KickedFromChatMessage,
  },
  setup() {
    const messageData = ref({
      text: 'Привіт! Як давно ти граєш у футбол, чи вже приймав участь у якихось змаганнях?',
      time_created: new Date(),
    });

    return {
      messageData,
    };
  },
};
</script>

<style lang="scss" scoped></style>