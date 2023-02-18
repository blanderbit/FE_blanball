<template>
  <div @click.self="$emit('closeModal')" class="b-share-event-modal__wrapper">
    <div class="b-share-event-modal">
      <div class="b-share-event-modal__top-side">
        <div class="b-share-event-modal__title">
          {{ $t('modals.share_event.title') }}
        </div>
        <img src="../assets/img/share-arrow.svg" alt="" />
      </div>
      <div class="b-share-event-modal__main-side">
        <InputComponent
          :height="40"
          :outsideTitle="true"
          :title-width="0"
          :icon="CopyIcon"
          :title="$t('modals.share_event.input-text')"
          :isReadOnly="true"
          v-model="eventShareLink"
          name="title"
        />
        <GreenBtn
          :text="$t('buttons.copy-link')"
          :height="40"
          @click-function="$emit('copyLinkButtonClick')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"

import InputComponent from './forms/InputComponent.vue'
import GreenBtn from './GreenBtn.vue'

import CopyIcon from '../assets/img/copy.svg'

export default {
  components: {
    InputComponent,
    GreenBtn,
  },
  props: {
    shareLink: {
      type: String,
      default: '',
    },
  },
  emits: ['copyLinkButtonClick', 'closeModal'],
  setup(props) {
    const eventShareLink = ref(props.shareLink)

    return {
      eventShareLink, 
      CopyIcon,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-share-event-modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(196, 195, 195, 0.514);
  z-index: 999;

  .b-share-event-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 330px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;

    .b-share-event-modal__top-side {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      width: 328px;
      border-radius: 6px 6px 0px 0px;
      height: 52px;
      background: #148783;

      .b-share-event-modal__title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #ffffff;
      }
    }
    .b-share-event-modal__main-side {
      background: #ffffff;
      padding: 16px;
      border-radius: 0px 0px 6px 6px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
}
</style>
