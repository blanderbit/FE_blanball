<template>
  <div v-if="isActive">
    <div class="b-modal-feedback__modal-wrapper">
      <div
        :class="[
          'b-modal-feedback',
          { 'b-modal-feedback__animation': animation },
        ]"
      >
        <!-- <div class="b-modal-feedback__windows-row"> -->
        <template v-for="step in steps" :key="step.id">
          <div v-if="currentStep === step.id" class="b-modal-feedback__window">
            <ModalTopCard
              :step="step"
              :is-opened="isCardTopOpened"
              :selectedEmojies="selectedEmojies"
              @emojiSelect="emojiSelect"
              @cancel-click="cancelClick"
              @next-click="nextClick"
              @cross-click="closeModal"
              @arrow-click="toggleCard"
            />
            <!-- <ModalBottomCard
              :is-opened="!isCardTopOpened"
              @arrow-click="toggleCard"
            /> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onBeforeUnmount } from 'vue';

import ModalTopCard from './ModalTopCard.vue';
import ModalBottomCard from './ModalBottomCard.vue';

import { API } from '../../../workers/api-worker/api.worker';

import { CONSTS } from '../../../consts/index';

export default {
  name: 'ModalFeedback',
  components: {
    ModalTopCard,
    ModalBottomCard,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    eventData: Object,
    selectedEmojies: {
      type: Array,
    },
    animationActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isCardTopOpened = ref(true);
    const animation = ref(props.animationActive);
    watch(
      () => props.animationActive,
      (value) => {
        animation.value = value;
      }
    );
    const steps = computed(() => {
      return CONSTS.modal_feedback.steps(props.eventData);
    });
    const currentStep = ref(0);

    const nextClick = (eventReviewComment) => {
      if (currentStep.value === 4) {
        emit('createEventReview', eventReviewComment)
      }
      currentStep.value++;
    };
    const emojiSelect = (emoji) => {
      emit('emojiSelection', emoji);
    };
    const closeModal = () => {
      currentStep.value = 0;
      isCardTopOpened.value = true;
      emit('close-modal');
    };
    const cancelClick = () => {
      if (currentStep.value === 0) {
        closeModal();
      } else {
        currentStep.value--;
      }
    };
    function toggleCard() {
      isCardTopOpened.value = !isCardTopOpened.value;
    }
    return {
      steps,
      currentStep,
      isCardTopOpened,
      toggleCard,
      cancelClick,
      closeModal,
      emojiSelect,
      animation,
      nextClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-modal-feedback__animation {
  animation: shake 0.5s linear;
}
.b-modal-feedback {
  position: absolute;
  right: 0;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  margin-right: 32px;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
