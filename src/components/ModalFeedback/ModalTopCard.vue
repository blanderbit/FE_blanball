<template>
  <div class="b-modal-top-card">
    <div class="b-modal-top-card__arrow-cross-block">
      <div
        v-if="step.id !== 4" 
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
        v-if="step.id === 4"
        src="../../assets/img/cloud-hands.svg" 
        alt="cloud-hands"
      >
      <div
        class="b-modal-top-card__title"
        :style="step.id === 4 && lastTitleStyle"
      >
        {{step.title}}
      </div>
    </div>
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
      <div 
        v-if="step.emojies"
        class="b-modal-top-card__emotions"
      >
        <div
          v-for="emoji in step.emojies"
          :key="emoji"
          class="b-modal-top-card__emoji"
        >
          <img :src="emoji" alt="">
        </div>
      </div>
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
        <div 
          class="b-modal-top-card__next-btn"
          @click="$emit('nextClick')"
        >
          {{step.buttons.next}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'ModalTopCard',
  props: {
    step: {
      type: Object,
      default: () => ({})
    },
    isOpened: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const arrowStyle = computed(() => {
      return {
        transform: props.isOpened ? 'rotate(-180deg)' : 'rotate(-90deg)'
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
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
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
    .b-modal-top-card__emotions { 
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 28px;

      .b-modal-top-card__emoji { 
        margin-right: 12px;
        position: relative;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          &::before {
            background: transparent;
          }
        }
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.493);
        }
        img { 

        }
      }
    }
    .b-modal-top-card__btns-block { 
      display: flex;
      justify-content: space-between;
      align-items: center;
      .b-modal-top-card__cancel-btn { 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #148783;
        cursor: pointer;
      }

      .b-modal-top-card__next-btn { 
        padding: 4px 16px;
        background: #D3F8F7;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #148783;
        cursor: pointer;
      }
    }
  }
}
</style>