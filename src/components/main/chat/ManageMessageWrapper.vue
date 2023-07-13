<template>
  <div
    :class="[
      'b-manage-message-wrapper',
      { 'right-border': !manageMessageData.img },
    ]"
  >
    <img
      class="b-manage-message-wrapper-icon"
      v-if="manageMessageData.img"
      :src="manageMessageData.img"
      alt=""
    />
    <div class="b-manage-message-main-data">
      <div class="b-manage-message-title">
        {{ manageMessageData.title }}
      </div>
      <div class="b-manage-message__message-text">
        {{ manageMessageData.text }}
      </div>
    </div>
    <img
      class="b-close-manage-message-button"
      src="../../../assets/img/green-cross.svg"
      alt=""
      @click="$emit('closeManageMessage')"
    />
  </div>
</template>

<script>
export default {
  emits: ['closeManageMessage'],
  props: {
    manageMessageData: {
      type: Object,
      default: () => ({
        title: '',
        text: '',
        img: null,
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.b-manage-message-wrapper {
  border-radius: 6px;
  background: var(--surface-surface-brand-secondary, #e3fbfa);
  padding: 6px;
  padding-right: 12px;
  display: flex;
  width: 100%;

  .b-manage-message-wrapper-icon {
    height: 20px;
    width: 20px;
    margin-top: 3px;
  }

  &.right-border {
    &::before {
      content: '';
      border-radius: 4px;
      background: var(--text-color-brand, #148783);
      padding: 2px;
      height: 40px;
    }
  }

  .b-close-manage-message-button {
    cursor: pointer;
    margin-right: 0px;
    margin-left: auto;
  }

  .b-manage-message-main-data {
    margin: 0px 8px;
    .b-manage-message-title {
      @include inter(12px, 600, $--b-main-green-color);
      line-height: 20px;
    }

    .b-manage-message__message-text {
      @include inter(14px, 400, $--b-main-black-color);
      line-height: 24px;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
