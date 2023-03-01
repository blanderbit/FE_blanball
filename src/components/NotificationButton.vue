<template>
  <div
    class="notification-button"
    :class="[
      buttonType || 'flat',
      buttonColor || 'standard',
      getNotificationType,
    ]"
    @click.stop="$emit('click-event')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NotificationButton',
  props: {
    buttonColor: {
      type: String,
      default: 'standard',
    },
    buttonType: {
      type: String,
      default: 'flat',
    },
    notificationType: {
      type: String,
      default: 'notification-push', // notification-sidebar
    },
  },
  computed: {
    getNotificationType() {
      switch (this.notificationType) {
        case 'notification-push':
          return 'notification-type__notification-push'
        case 'notification-sidebar':
          return 'notification-type__notification-sidebar'
      }
    },
  },
}
</script>

<style scoped lang="scss">
// SCSS variables for hex colors
 $color-efeff6: #efeff6;
 $color-c5c5d3: #c5c5d3;
 $color-fcfcfc: #fcfcfc;
 $color-424257: #424257;
 $color-148581: #148581;
 $color-a4284d: #a4284d;


.notification-button {
  cursor: pointer;
  display: inline-block;
  padding: 2px 12px;
  border-radius: 6px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  text-align: center;
  margin-right: 8px;
}

.flat {
  border: 1px solid;
}

.stroked {
  border: 1px solid;
}

.notification-button.flat {
  background: $--b-main-gray-color;
  border-color: $--b-main-gray-color;
  color: $--b-main-white-color;
  &.notification-type__notification-sidebar {
    background: $color-efeff6;
    border-color: $color-efeff6;
    color: $--b-main-gray-color;
  }
}

.notification-button.stroked {
  background: $--b-main-black-color;
  border-color: $color-c5c5d3;
  color: $--b-main-white-color;
  &.notification-type__notification-sidebar {
    background: $color-fcfcfc;
    border-color: $color-efeff6;
    color: $color-424257;
  }
}

.notification-button.flat.success {
  background: $color-148581;
  border-color: $color-148581;
  color: $--b-main-white-color;
}

.notification-button.stroked.success {
  background: $color-148581;
  border-color: $color-c5c5d3;
  color: $--b-main-white-color;
}

.notification-button.flat.error {
  background: $color-a4284d;
  border-color: $color-a4284d;
  color: $--b-main-white-color;
}

.notification-button.stroked.error {
  background: $color-a4284d;
  border-color: $color-c5c5d3;
  color: $--b-main-white-color;
}
</style>
