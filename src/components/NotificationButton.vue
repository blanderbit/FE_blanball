<template>
  <GreenBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === 'success'"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :disabled="buttonDisabled"
    :width="buttonData.buttonWidth"
    @click-function="$emit('click-function')"
  />
  <WhiteBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === 'default'"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :width="buttonData.buttonWidth"
    :disabled="buttonDisabled"
    :main-color="notificationType === 'notification-push' ? '#FFFFFF' : '#575775'"
    :is-border="notificationType === 'notification-push'? true : false"
    @click-function="$emit('click-function')"
  />
  <GreenBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === 'error'"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :width="buttonData.buttonWidth"
    :disabled="buttonDisabled"
    @click-function="$emit('click-function')"
  />
</template>

<script>
import WhiteBtn from './WhiteBtn.vue';
import GreenBtn from './GreenBtn.vue';

export default {
  name: 'NotificationButton',
  props: {
    buttonData: {
      type: String,
      default: () => {},
    },
    notificationType: {
      type: String,
      required: true
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    WhiteBtn,
    GreenBtn,
  },
};
</script>

<style lang="scss" scoped>
.b-notification-btn {
  font-size: 13px;
}
</style>