<template>
  <div :class="[{ 'b-modal-bottom-card-wrapper': isOpened }]">
    <Transition>
      <div
        :class="['b-modal-bottom-card', { opened: isOpened }]"
        :style="bottomCardStyle"
      >
        <ModalTopCard
          v-if="isOpened"
          style="position: absolute; top: -75px; left: 0px"
          :is-opened="false"
          :title="'Залиште відгук про «Дружній матч»'"
        />
        <div class="b-modal-bottom-card__title-line">
          <div class="b-modal-bottom-card__title">
            {{ $t('modal_feedback.evaluate_game') }}
          </div>
          <div
            class="b-modal-bottom-card__arrow"
            :style="arrowStyle"
            @click="$emit('arrowClick')"
          >
            <img src="@images/arrow-down.svg" alt="" />
          </div>
          <div class="b-modal-bottom-card__send-complain" v-if="isOpened">
            <img src="@images/warning-red.svg" alt="" />
            <span>{{ $t('modal_feedback.complain') }}</span>
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
  </div>
</template>

<script>
 

import RatePlayerCard from './RatePlayerCard.vue';
import ModalTopCard from './ModalTopCard.vue';



export default {
  name: 'ModalBottomCard',
  components: {
    RatePlayerCard,
    ModalTopCard,
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
      };
    });
    const arrowStyle = computed(() => {
      return {
        transform: props.isOpened ? 'rotate(-180deg)' : 'rotate(-90deg)',
      };
    });
    const players = computed(() => {
      return CONSTS.modal_feedback.players;
    });
    return {
      bottomCardStyle,
      arrowStyle,
      players,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-fee7e7: #fee7e7;

.b-modal-bottom-card-wrapper {
  @include modal-wrapper;
}
.b-modal-bottom-card {
  padding: 20px;
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  transition: all 0.3s ease;

  &.opened {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
      background: $color-fee7e7;
      text-align: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
      span {
        @include inter(13px, 500, $--b-error-color);
        line-height: 24px;
      }
    }
  }
  .b-modal-bottom-card__players-viewport {
    overflow-y: scroll;
    .b-modal-bottom-card__players-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-top: 16px;
      .b-modal-bottom-card__team-1 {
        overflow-y: scroll;
      }
      .b-modal-bottom-card__team-2 {
        overflow-y: scroll;
      }
    }
  }
}
</style>
