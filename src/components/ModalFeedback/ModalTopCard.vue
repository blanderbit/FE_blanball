<template>
  <div class="b-modal-top-card">
    <div class="b-modal-top-card__arrow-cross-block">
      <div
        v-if="step.id !== 5" 
        class="b-modal-top-card__arrow"
        :style="arrowStyle"
        @click="$emit('arrowClick')"
      >
        <img src="../../assets/img/arrow-down.svg" alt="">
      </div>
      <div
        v-else
        class="b-modal-top-card__cross"
        @click="$emit('crossClick')"
      >
        <img src="../../assets/img/cross.svg" alt="">
      </div>
    </div>
    <div class="b-modal-top-card__title-wrapper">
      <img
        v-if="step.id === 5"
        src="../../assets/img/cloud-hands.svg" 
        alt="cloud-hands"
      >
      <div
        class="b-modal-top-card__title"
        :style="step.id === 5 && lastTitleStyle"
      >
        {{step.title}}
      </div>
    </div>
    <Form
         v-slot="data"
         @submit="disableSubmit"
         :validation-schema="schema"
     >
    <div 
      class="b-modal-top-card__main-block"
      :style="mainBlockCardStyle"
    >
      <div class="b-modal-top-card__subtitle">
        {{step.subtitle}}
      </div>
      <div class="b-modal-top-card__last-subtitle">
        {{step.last_subtitle}}
      </div>

      <Emotions
        name="emoji"
        :currentStepEmojies="step.emojies" 
        :selectedEmojies="selectedEmojies"
        @emojiSelect="emojiSelect"/>

      <TextAreaComponent v-if="step.id === 4 && !step.emojies" 
        :placeholder="$t('events.event-description')" 
        :height="120"
        v-model="eventComment"
        :title="$t('modals.event_feedback.your-comment')"
        name="comment" />

      <div
        v-if="step.buttons"
        class="b-modal-top-card__btns-block"
      >
        <div 
          class="b-modal-top-card__cancel-btn"
          @click="$emit('cancelClick')"
        >
          {{step.buttons.cancel}}
        </div>

        <GreenBtn
            :text="step.buttons.next"
            :class="['b-modal-top-card__next-btn']"
            :style="greenButtonWidth"
            @click-function="goToTheNextStep(data)"
          />
      </div>
    </div>
  </Form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import { Form, ErrorMessage } from "@system.it.flumx.com/vee-validate";

import * as yup from "yup";

import GreenBtn from '../GreenBtn.vue'
import TextAreaComponent from '../TextAreaComponent.vue'
import Emotions from '../forms/Emotions.vue';

export default {
  name: 'ModalTopCard',
  components: {
    GreenBtn,
    TextAreaComponent,
    Emotions,
    Form,
    ErrorMessage,
  },
  props: {
    step: {
      type: Object,
      default: () => ({})
    },
    isOpened: {
      type: Boolean,
      default: true
    },
    selectedEmojies: {
      type: Array
    }
  },
  setup(props, { emit }) {
    const eventComment = ref('')
    const arrowStyle = computed(() => {
      return {
        transform: props.isOpened ? 'rotate(-180deg)' : 'rotate(-90deg)'
      }
    })
    const emojiSelect = (emoji) => {
      emit('emojiSelect', emoji)
    }
    yup.addMethod(yup.string, "emojiRequired", function (errorMessage) {
      return this.test(`test-emoji-required`, errorMessage, function (value) {
        const { path, createError } = this;
        const emoji = props.selectedEmojies.filter((value) => value.step === props.step.id)
        return (
          ([0, 4].includes(props.step.id) ? true : !!emoji?.length) || createError({ path, errorMessage })
        );
      });
    });
    const schema = computed(() => {
      return yup.object({
        emoji: yup.string().emojiRequired('errors.required'),
        comment: yup.string().max(200 , 'errors.max200')
      })
    })
    const goToTheNextStep = async (data) => {
      const { valid } = await data.validate()
      if (!valid) {
        return false
      }
      emit('nextClick', eventComment.value)
    }
  
    const greenButtonWidth = computed(() => {
      if ([0, 4].includes(props.step.id)) {
        return {
          'width': '150px'
        }
      }
      return {
        'width': '100px'
      }
    })
    const lastTitleStyle = computed(() => {
      return {
        'font-weight': 700,
        'font-size': '24px',
        'line-height': '28px',
        color: '#262541'
      }
    })
    const mainBlockCardStyle = computed(() => {
      return {
        height: props.isOpened ? 'auto' : 0
      }
    })
    return {
      lastTitleStyle,
      mainBlockCardStyle,
      arrowStyle,
      greenButtonWidth,
      schema,
      eventComment,
      emojiSelect,
      goToTheNextStep,
      disableSubmit: (e) => {
          e.stopPropagation()
          e.preventDefault()
      },
    }
  }
}
</script>
<style lang="scss" scoped>
.b-modal-top-card {
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  width: 400px;
  .b-modal-top-card__arrow-cross-block {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .b-modal-top-card__title-wrapper {
    display: flex;
    align-items: center;
    img {
      margin-right: 12px;
    }
    .b-modal-top-card__title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 26px;
      color: #262541;
    }
  }
  .b-modal-top-card__main-block {
    overflow: hidden;
    .b-modal-top-card__subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #575775;
      margin-top: 16px;
      margin-bottom: 20px;
    }
    .b-modal-top-card__last-subtitle {
      font-family: 'Inter';
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #262541
    }
    .b-modal-top-card__btns-block { 
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      .b-modal-top-card__cancel-btn { 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #575775;
        cursor: pointer;
      }
      .b-modal-top-card__next-btn { 
        padding: 4px 16px;
      }
    }
  }
}
</style>