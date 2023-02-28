<template>
  <Transition>
    <div class="b-modal-bottom-card" :style="bottomCardStyle">
      <div class="b-modal-bottom-card__title-line">
        <div class="b-modal-bottom-card__title">
          {{$t('modal_feedback.evaluate_game')}}
        </div>
        <div
          class="b-modal-bottom-card__arrow"
          :style="arrowStyle"
          @click="$emit('arrowClick')"
        >
          <img src="../../../assets/img/arrow-down.svg" alt="" />
        </div>
        <div class="b-modal-bottom-card__send-complain" v-if="isOpened">
          <img src="../../../assets/img/warning-red.svg" alt="" />
          {{$t('modal_feedback.complain')}}
        </div>
      </div>
      <div v-if="isOpened" class="b-modal-bottom-card__players-viewport">
        <div class="b-modal-bottom-card__players-wrapper">
          <div class="b-modal-bottom-card__team-1">
            <RatePlayerCard
              v-for="player in players.team_1"
              :key="player.id"
              :player="player"
            />
          </div>
          <div class="b-modal-bottom-card__team-2">
            <RatePlayerCard
              v-for="player in players.team_2"
              :key="player.id"
              :player="player"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { computed } from 'vue'

import RatePlayerCard from './RatePlayerCard.vue'

import CONSTANTS from '../../../consts/index'

export default {
  name: 'ModalBottomCard',
  components: {
    RatePlayerCard,
  },
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const bottomCardStyle = computed(() => {
      return {
        width: props.isOpened ? '888px' : '400px',
        height: props.isOpened ? '656px' : 'auto',
      }
    })
    const arrowStyle = computed(() => {
      return {
        transform: props.isOpened ? 'rotate(-180deg)' : 'rotate(-90deg)',
      }
    })
    const players = computed(() => {
      return CONSTANTS.modal_feedback.players
    })
    return {
      bottomCardStyle,
      arrowStyle,
      players,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-modal-bottom-card {
  overflow-y: scroll;
  padding: 20px;
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  transition: all 0.3s ease;
  
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar { 
    display: none;
  }
  .b-modal-bottom-card__title-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .b-modal-bottom-card__title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: $--b-main-black-color;
    }
    .b-modal-bottom-card__arrow {
      cursor: pointer;
    }
    .b-modal-bottom-card__send-complain {
      padding: 2px 12px;
      background: #fee7e7;
      border-radius: 6px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 24px;
      text-align: center;
      color: $--b-error-color;
      margin-left: 7px;
    }
  }
  .b-modal-bottom-card__players-viewport {
    .b-modal-bottom-card__players-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-top: 16px;
      .b-modal-bottom-card__team-1 {
      }
      .b-modal-bottom-card__team-2 {
      }
    }
  }
}
</style>