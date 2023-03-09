<template>
  <div @click.self="$emit('closeModal')" class="b-action-event-modal__wrapper">
    <div class="b-action-event-modal__modal-window">
     <img :src="modalData.image" alt="">
      <div class="b-action-event-modal__title">
        {{ modalData.title }}
      </div>
      <div class="b-action-event-modal__subtitle">
        {{ modalData.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    emits: ['closeModal'],
    props: {
        modalData: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>
.b-action-event-modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 37, 65, 0.2);
  z-index: 999;

  .b-action-event-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 290px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    background: $--b-main-white-color;
    padding: 0px 16px 16px;

    .b-action-event-modal__title {
      @include exo(18px, 700);
      line-height: 28px;
      display: flex;
      align-items: center;
      text-align: center;
      margin-bottom: 4px;
    }
    .b-action-event-modal__subtitle {
      @include inter(14px, 400,#575775);
      line-height: 20px;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
}
</style>
