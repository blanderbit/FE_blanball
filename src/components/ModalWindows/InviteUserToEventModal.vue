<template>
  <div
    class="b-invite-user-to-event-modal__wrapper">
    <div class="b-invite-user-to-event-modal__modal-window">
      <div class="b-invite-user-to-event-modal__top-side">
        <div class="b-invite-user-to-event-modal__title">
          {{ $t('modals.invite_user_to_event.title') }}
        </div>
        <div class="b-invite-user-to-event-modal__subtitle">
          {{ $t('modals.invite_user_to_event.main-text') }}
          <span>{{ userData.profile.last_name }} {{ userData.profile.name }}</span>
        </div>
      </div>
      <div class="b-invite-user-to-event-modal__main-side">
        <div class="b-invite-user-to-event-modal__invite-button">
          Оберіть подію
        </div>
        <TextAreaComponent
          :placeholder="$t('modals.invite_user_to_event.message')"
          :height="92"
          name="message"
        />
      </div>
      <div class="b-invite-user-to-event-modal__bottom-side">
        <WhiteBtn
          :text="$t('buttons.cancel')"
          :main-color="'#575775'"
          :height="24"
          :width="73"
          :isBorder="false"
          @click-function="$emit('closeModal')"
        />
        <GreenBtn
          :width="100"
          :height="32"
          :text="'Запросити'"/>
      </div>
    </div>
  </div>
</template>

<script>
import TextAreaComponent from '../TextAreaComponent.vue';
import WhiteBtn from '../WhiteBtn.vue';
import GreenBtn from '../GreenBtn.vue';

export default {
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['closeModal'],
  components: {
    TextAreaComponent,
    GreenBtn,
    WhiteBtn,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.b-invite-user-to-event-modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 37, 65, 0.2);
  z-index: 999;
  .b-invite-user-to-event-modal__modal-window {
    padding: 20px 14px 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 400px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    background: $--b-main-white-color;
    min-height: 296px;

    .b-invite-user-to-event-modal__top-side {
      .b-invite-user-to-event-modal__title {
        @include inter(14px, 600);
        line-height: 24px;
      }
      .b-invite-user-to-event-modal__subtitle {
        @include inter(12px, 400, #575775);
        line-height: 20px;

        span {
          @include inter(12px, 500);
          line-height: 20px;
        }
      }
    }
    .b-invite-user-to-event-modal__main-side {
      .b-invite-user-to-event-modal__invite-button {
        border: 1px solid #dfdeed;
        border-radius: 6px;
        padding: 6px 12px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;
        color: #262541;
        margin: 16px 0px;
      }
    }
    .b-invite-user-to-event-modal__bottom-side {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
}
</style>
