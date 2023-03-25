<template>
  <div class="b-invite-user-to-event-modal__wrapper">
    <div class="b-invite-user-to-event-modal__modal-window">
      <div class="b-invite-user-to-event-modal__top-side">
        <div class="b-invite-user-to-event-modal__title">
          {{ $t('modals.invite_user_to_event.title') }}
        </div>
        <div class="b-invite-user-to-event-modal__subtitle">
          {{ $t('modals.invite_user_to_event.main-text') }}
          <span
            >{{ userData.profile.last_name }} {{ userData.profile.name }}</span
          >
        </div>
      </div>
      <div class="b-invite-user-to-event-modal__main-side">
        <div
          :class="[
            'b-invite-user-to-event-modal__invite-button',
            { active: isEventsListOpened },
          ]"
          @click="openEventsList"
        >
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
        <GreenBtn :width="100" :height="32" :text="'Запросити'" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import TextAreaComponent from '../Forms/TextAreaComponent.vue';
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
    const isEventsListOpened = ref(false);

    const openEventsList = () => {
      isEventsListOpened.value = true;
    };

    return {
      isEventsListOpened,
      openEventsList,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-dfdeed: #dfdeed;
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

    @media (max-width: 430px) {
      width: 100%;
    }

    .b-invite-user-to-event-modal__top-side {
      .b-invite-user-to-event-modal__title {
        @include inter(14px, 600);
        line-height: 24px;
      }
      .b-invite-user-to-event-modal__subtitle {
        @include inter(12px, 400, $--b-main-gray-color);
        line-height: 20px;

        span {
          @include inter(12px, 500);
          line-height: 20px;
        }
      }
    }
    .b-invite-user-to-event-modal__main-side {
      .b-invite-user-to-event-modal__invite-button {
        border: 1px solid $color-dfdeed;
        border-radius: 6px;
        padding: 6px 12px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;
        color: $--b-main-black-color;
        margin: 16px 0px;

        &.active {
          border: 1px solid $--b-main-green-color;
        }
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
