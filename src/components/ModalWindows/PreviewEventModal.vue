<template>
  <div class="b-preview-event-modal__wrapper">
    <div class="b-preview-event-modal__modal-window">
      <div class="b-preview-event-modal__header">
        <div class="b-preview-event-modal__title">
          {{ $t('events.poster-preview') }}
        </div>
        <img src="../../assets/img/close-arrow-up.svg" alt=""
            @click="$emit('closeModal')">
      </div>
      <div class="b-preview-event-modal__main-side">
        <EventCard :card="eventData" />
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from '../event-components/EventCard.vue';
export default {
  components: {
    EventCard,
  },
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['closeModal']
};
</script>

<style lang="scss" scoped> $color-f9f9fc: #f9f9fc;


.b-preview-event-modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 37, 65, 0.2);
  z-index: 999;
  .b-preview-event-modal__modal-window {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    background: $color-f9f9fc;
    height: max-content;
    border-radius: 15px 15px 0px 0px;
    padding: 12px 0px;
    .b-preview-event-modal__header {
      padding: 0px 16px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .b-preview-event-modal__title {
        @include exo(16px, 700);
        line-height: 24px;
      }
      img {
        margin-right: 10px;
      }
    }
    .b-preview-event-modal__main-side {
      padding: 0px 8px;
      display: flex;
      justify-content: center;

      ::v-deep(.event-card) {
        max-width: 500px;
      }
    }
  }
}
</style>
