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
  background: #575775;
  border-color: #575775;
  color: #ffffff;
  &.notification-type__notification-sidebar {
    background: #efeff6;
    border-color: #efeff6;
    color: #575775;
  }
}

.notification-button.stroked {
  background: #262541;
  border-color: #c5c5d3;
  color: #ffffff;
  &.notification-type__notification-sidebar {
    background: #fcfcfc;
    border-color: #efeff6;
    color: #424257;
  }
}

.notification-button.flat.success {
  background: #148581;
  border-color: #148581;
  color: #ffffff;
}

.notification-button.stroked.success {
  background: #148581;
  border-color: #c5c5d3;
  color: #ffffff;
}

.notification-button.flat.error {
  background: #a4284d;
  border-color: #a4284d;
  color: #ffffff;
}

.notification-button.stroked.error {
  background: #a4284d;
  border-color: #c5c5d3;
  color: #ffffff;
}
</style>
