<template>
  <Transition>
    <div class="b_modal_user_wrapper" @click.self="$emit('close-modal')">
      <div class="b_modal_user_modal-window">
        <slot name="top-buttons"></slot>
        <slot name="user-content"></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ModalUserWindow',
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixins/device.scss';

.b_modal_user_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 51%);
  z-index: 999;
  .b_modal_user_modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 1192px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    background: #fff;
    padding: 36px 28px;
    height: 90%;
    @media (min-width: 992px) and (max-width: 1200px) {
      width: 980px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 748px;
    }
    @include tablet {
      width: 556px;
    }
    @include mobile {
      width: 90%;
      padding: 0;
    }
  }
}
</style>
