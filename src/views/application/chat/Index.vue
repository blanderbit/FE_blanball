<template>
  <div>dfdfdfd</div>
</template>

<script>
import { ref } from 'vue';

import Message from '../../../components/main/chat/Message.vue';
import SendMessageBlock from '../../../components/main/chat/SendMessageBlock.vue';
import RequestForChat from '../../../components/main/chat/RequestForChat.vue';
import KickedFromChatMessage from '../../../components/main/chat/KickedFromChatMessage.vue';

import { PaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';

export default {
  components: {},
  setup() {},
};
</script>

<style lang="scss" scoped></style>
