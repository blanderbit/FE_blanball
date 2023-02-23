<template>
  <div :class="['b-my-event-card', 
    { active: card.status === 'Active' },
    { finished: card.status === 'Finished' },
    { selected: isCardSelected}]" 
    @click.right.prevent="$emit('cardRightClick', $event)"
    @click.prevent="$emit('cardLeftClick', card.id)">
    <div v-if="isCardSelected" class="b-my-event-card-selected-icon">
      <img src="../assets/img/green-nike-icon.svg" alt="">
    </div>
    <div class="b-my-event-card__left-block">
      <div class="b-my-event-card__col-1">
        <div class="b-my-event-card__card-icon">
          <img src="../assets/img/hands-shake.svg" alt="" />
        </div>
      </div>
      <div class="b-my-event-card__col-2">
        <div class="b-my-event-card__title">{{ card.name }}</div>
        <PlaceDetector class="b-my-event-card__place" v-if="card.place.place_name" :place="card.place">
        </PlaceDetector>
        <div class="b-my-event-card__labels">
          <div v-if="card.gender" class="b-my-event-card__label">
            {{ $t(`events.${card.gender}`) }}
          </div>
          <div v-if="card.type" class="b-my-event-card__label">
            {{ $t(`events.${card.type}`) }}
          </div>
          <div v-if="card.need_ball" class="b-my-event-card__label">{{ $t('hashtags.need_ball') }}</div>
          <div v-if="card.need_form" class="b-my-event-card__label">{{ $t('hashtags.need_form') }}</div>
        </div>
      </div>
    </div>
    <div class="b-my-event-card__right-block">
      <div class="b-my-event-card__col-3">
        <span :class="['b-my-event-card__status', `b-my-event-card__status-${card.status.toLowerCase()}`]">
          {{ $t(`events.${card.status}`) }}
        </span>
        <div class="b-my-event-card__date">
          {{ card.date }}
        </div>
        <div class="b-my-event-card__time">
          {{ card.time }} - {{ card.end_time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import PlaceDetector from './maps/PlaceDetector.vue'

export default {
  components: {
    PlaceDetector,
  },
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const isCardSelected = computed(() => {
      return props.selected.includes(props.card.id)
    })
    return {
      isCardSelected,
    }
  }
}
</script>

<style lang="scss" scoped>
.b-my-event-card {
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #dfdeed;
  margin-bottom: 16px;
  cursor: pointer;
  &.active {
    border: 1px solid #71ba12;
  }
  &.finished {
    border: 1px solid #E184A0;
  }
  &.selected {
    border: 1px solid #1AB2AD;
  }

  .b-my-event-card-selected-icon {
    position: absolute;
    right: -5px;
    top: -3px;
    padding: 4px;
    background: #FFFFFF;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
  }

  .b-my-event-card__left-block {
    display: flex;

    .b-my-event-card__col-1 {
      margin-right: 8px;
      min-width: 50px;
      max-height: 50px;

      .b-my-event-card__card-icon {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 48px;
        width: 48px;
        height: 48px;
        background: #efeff6;
        border-radius: 4px;
      }
    }

    .b-my-event-card__col-2 {
      min-width: 100%;
      .b-my-event-card__title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
        width: 75%;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .b-my-event-card__labels {
        display: flex;
        align-items: center;
        margin-top: 12px;
        flex-wrap: wrap;
        gap: 8px 0px;
        margin-left: -60px;
        margin-top: 10px;

        .b-my-event-card__label {
          padding: 0px 8px;
          border: 1px solid #efeff6;
          border-radius: 100px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          margin-right: 4px;
          margin-bottom: 4px;
        }
      }
    }
  }

  .b-my-event-card__right-block {

    .b-my-event-card__status {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      border-radius: 4px;
      padding: 0px 4px;

      &-planned {
        color: #262541;
        background: #EFEFF6;
      }

      &-active {
        color: #fff;
        background: #71BA12;
      }

      &-finished {
        color: #fff;
        background: #E184A0;
      }
    }

    .b-my-event-card__col-3 {
      min-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .b-my-event-card__state {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
        padding: 0px 4px;
        border-radius: 4px;
        background: #efeff6;
        color: #262541;
        width: fit-content;

        &.b-my-event-card__active {
          background: #71ba12;
          color: #fff;
        }
      }

      .b-my-event-card__date {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: #262541;
        margin-top: 12px;
        margin-bottom: 4px;
      }

      .b-my-event-card__time {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        text-align: right;
        color: #4c4a82;
      }
    }
  }
}

.b-my-event-card__place::v-deep(.b-place-detector) {
  background: #EFEFF6;
  border-radius: 4px;
  margin-top: 10px;
  width: fit-content;
  max-width: 70%;
  cursor: pointer;
}
</style>
