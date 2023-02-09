<template>
  <div>
    <div
      class="b-modal-feedback__modal-wrapper"
      @click.self="$emit('close-modal')"
    >
      <div class="b-modal-feedback">
        <!-- <div class="b-modal-feedback__windows-row"> -->
        <template v-for="step in steps" :key="step.id">
          <div v-if="currentStep === step.id" class="b-modal-feedback__window">
            <ModalTopCard
              :step="step"
              :is-opened="isCardTopOpened"
              @cancel-click="currentStep--"
              @next-click="currentStep++"
              @cross-click="$emit('close-modal')"
              @arrow-click="toggleCard"
            />
            <ModalBottomCard
              :is-opened="!isCardTopOpened"
              @arrow-click="toggleCard"
            />
          </div>
        </template>

        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import ModalTopCard from './ModalTopCard.vue'
import ModalBottomCard from './ModalBottomCard.vue'

import CONSTANTS from '../../consts/index'

export default {
  name: 'ModalFeedback',
  components: {
    ModalTopCard,
    ModalBottomCard,
  },
  setup() {
    const isCardTopOpened = ref(true)

    const steps = computed(() => {
      return CONSTANTS.modal_feedback.steps
    })
    const currentStep = ref(0)

    function toggleCard() {
      isCardTopOpened.value = !isCardTopOpened.value
    }

    return {
      steps,
      currentStep,
      isCardTopOpened,
      toggleCard,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-modal-feedback__modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(255, 255, 255, 0.514);
  z-index: 999;
  .b-modal-feedback {
    position: absolute;
    left: 50%;
    bottom: 76px;
    display: flex;
    flex-direction: column;
    // width: 400px;
    // height: 310px;
    transform: translateX(-50%);
    // .b-modal-feedback__windows-row {
    //   height: 100%;
    //   display: flex;
    //   align-items: flex-end;
    //   .b-modal-feedback__window {
    //     padding: 10px 0;
    //     width: 100%;
    //   }
    // }
  }
}
</style>
