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
};
</script>

<style lang="scss" scoped>
.b_modal_user_wrapper {
  @include modal-wrapper(rgb(0 0 0 / 51%));

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
    background: $--b-main-white-color;
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
