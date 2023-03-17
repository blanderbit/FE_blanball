<template>
    <GreenBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === 'success'"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :width="buttonData.buttonWidth"
  />
  <WhiteBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === 'default'"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :width="buttonData.buttonWidth"
    :main-color="notificationType === 'notification-push' ? '#FFFFFF' : '#575775'"
    :is-border="notificationType === 'notification-push'? true : false"
  />
  <GreenBtn
    class="b-notification-btn"
    v-if="buttonData.buttonType === 'error'"
    :text="buttonData.buttonText"
    :height="buttonData.buttonHeight"
    :width="buttonData.buttonWidth"
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