<template>
  <GreenBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === notificationTypes.SUCCESS"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :disabled="buttonDisabled"
    :width="buttonData.buttonWidth"
    @click-function="$emit('click-function')"
  />
  <WhiteBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === notificationTypes.DEFAULT"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :width="buttonData.buttonWidth"
    :disabled="buttonDisabled"
    :main-color="
      notificationType === 'notification-push' ? '#FFFFFF' : '#575775'
    "
    :is-border="notificationType === 'notification-push' ? true : false"
    @click-function="$emit('click-function')"
  />
  <GreenBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === notificationTypes.ERROR"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :width="buttonData.buttonWidth"
    :disabled="buttonDisabled"
    @click-function="$emit('click-function')"
  />
</template>

<script>
import { ref } from 'vue';

import WhiteBtn from '@sharedComponents/button/WhiteBtn.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';

export default {
  props: {
    buttonData: {
      type: String,
      default: () => {},
    },
    notificationType: {
      type: String,
      required: true,
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    WhiteBtn,
    GreenBtn,
  },
  setup() {
    const notificationTypes = ref({
      DEFAULT: 'default',
      ERROR: 'error',
      SUCCESS: 'success',
    });

    return {
      notificationTypes,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-notification-btn {
  font-size: 13px;
}
</style>
