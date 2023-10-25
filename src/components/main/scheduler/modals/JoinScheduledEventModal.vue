<template>
  <div
    class="c-join-scheduled-event-modal__wrapper"
    @click.self="$emit('closeModal')"
  >
    <div class="c-join-scheduled-event-modal__modal-window">
      <div class="c-join-scheduled-event-modal__content">
        <div class="c-join-scheduled-event-modal__top-side">
          <img
            class="c-close-join-scheduled-event-modal"
            src="@images/cross.svg"
            alt=""
            @click="$emit('closeModal')"
          />
          <img src="@images/join-scheduled-event-icon.svg" alt="" />
        </div>
        <div class="c-join-scheduled-event-modal__main-side">
          <div class="c-join-scheduled-event-modal__title">
            {{ $t('scheduler.event-join-modal.title') }}
          </div>
          <div class="c-join-scheduled-event-modal__main-text">
            {{
              $t('scheduler.event-join-modal.main-text', {
                eventName: eventData.name,
              })
            }}
          </div>
        </div>
        <div class="c-join-scheduled-event-modal__bottom-side">
          <GreenBtn
            :height="40"
            :text="$t('scheduler.event-join-modal.take-part')"
            :backgroundColor="'#575775'"
            @click-function="$emit('takePartEvent', $event, eventData)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';

export default {
  components: {
    GreenBtn,
  },
  emits: ['closeModal'],
  props: {
    eventData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.c-join-scheduled-event-modal__wrapper {
  @include modal-wrapper;
  .c-join-scheduled-event-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 292px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    background: $--b-main-white-color;
    padding: 20px 16px;

    .c-join-scheduled-event-modal__content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .c-join-scheduled-event-modal__top-side {
        width: fit-content;
        position: relative;

        .c-close-join-scheduled-event-modal {
          position: absolute;
          right: -60px;
          width: 10px;
          height: 10px;
          cursor: pointer;
        }
      }

      .c-join-scheduled-event-modal__main-side {
        .c-join-scheduled-event-modal__title {
          @include exo(18px, 700);
          line-height: 28px;
          text-align: center;
          margin-top: 4px;
        }

        .c-join-scheduled-event-modal__main-text {
          @include inter(14px, 400, $--b-main-gray-color);
          line-height: 20px;
          text-align: center;
          margin-top: 4px;
        }
      }
      .c-join-scheduled-event-modal__bottom-side {
        width: 100%;
        margin-top: 12px;
      }
    }
  }
}
</style>
