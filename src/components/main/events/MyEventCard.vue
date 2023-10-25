<template>
  <div
    :class="[
      'b-my-event-card',
      { active: card.status === 'Active' },
      { finished: card.status === 'Finished' },
      { selected: isCardSelected },
      { pinned: card.pinned },
    ]"
    @click.right.prevent="$emit('cardRightClick', $event)"
    @click.prevent="$emit('cardLeftClick', card.id)"
    @touchstart="startHoldOpenMenu"
    @touchend="endHoldOpenMenu"
  >
    <div v-if="isCardSelected" class="b-my-event-card-selected-icon">
      <img src="../../../assets/img/green-nike-icon.svg" alt="" />
    </div>
    <div
      v-if="card.pinned && !isCardSelected"
      class="b-my-event-card-pinned-icon"
    >
      <img src="../../../assets/img/gray-pin.svg" alt="" />
    </div>
    <div :class="['b-my-event-card__left-block', { selected: isCardSelected }]">
      <div class="b-my-event-card__col-1">
        <div class="b-my-event-card__card-icon">
          <img src="../../../assets/img/hands-shake.svg" alt="" />
        </div>
      </div>
      <div class="b-my-event-card__col-2">
        <div class="b-my-event-card__title">{{ card.name }}</div>
        <div class="b-my-event-card__place">
          <PlaceDetectorModal
            v-if="card.place.place_name"
            :place="card.place"
            :disabled="isCardSelected"
          />
        </div>
        <div class="b-my-event-card__labels">
          <div v-if="card.gender" class="b-my-event-card__label">
            {{ $t(`events.${card.gender}`) }}
          </div>
          <div v-if="card.type" class="b-my-event-card__label">
            {{ $t(`events.${card.type}`) }}
          </div>
          <div v-if="card.need_ball" class="b-my-event-card__label">
            {{ $t('hashtags.need_ball') }}
          </div>
          <div v-if="card.need_form" class="b-my-event-card__label">
            {{ $t('hashtags.need_form') }}
          </div>
        </div>
      </div>
    </div>
    <div
      :class="['b-my-event-card__right-block', { selected: isCardSelected }]"
    >
      <div class="b-my-event-card__col-3">
        <span
          :class="[
            'b-my-event-card__status',
            `b-my-event-card__status-${card.status.toLowerCase()}`,
          ]"
        >
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

import PlaceDetectorModal from '../../maps/PlaceDetectorModal.vue';

export default {
  components: {
    PlaceDetectorModal,
  },
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const isCardSelected = computed(() => {
      return props.selected.includes(props.card.id);
    });

    let timeout;

    const startHoldOpenMenu = (e) => {
      const touch = e.touches[0];
      const data = { clientX: touch.pageX, clientY: touch.pageY };
      timeout = setTimeout(() => {
        context.emit('cardRightClick', data);
      }, 500);
    };

    const endHoldOpenMenu = (e) => {
      clearTimeout(timeout);
    };

    return {
      isCardSelected,
      startHoldOpenMenu,
      endHoldOpenMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-71ba12: #71ba12;
$color-e184a0: #e184a0;
$color-1ab2ad: #1ab2ad;
$color-f0f0f4: #f0f0f4;
$color-efeff6: #efeff6;
$color-4c4a82: #4c4a82;

.b-my-event-card {
  padding: 12px;
  background: $--b-main-white-color;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  border: 1px solid $color-dfdeed;
  margin-bottom: 16px;
  cursor: pointer;
  height: fit-content;
  &.active {
    border: 1px solid $color-71ba12;
  }
  &.finished {
    border: 1px solid $color-e184a0;
  }
  &.selected {
    border: 1px solid $color-1ab2ad !important;
  }
  &.pinned {
    border: 1px dashed #dfdeed;
  }

  .b-my-event-card-selected-icon {
    position: absolute;
    right: -5px;
    top: -3px;
    padding: 4px;
    background: $--b-main-white-color;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
  }

  .b-my-event-card-pinned-icon {
    background: $--b-main-white-color;
    position: absolute;
    right: -5px;
    padding: 4px;
    top: -3px;
    padding: 4px;
    display: flex;
    align-items: center;
    border: 2px solid $color-f0f0f4;
    border-radius: 20px;
  }

  .b-my-event-card__left-block {
    display: flex;

    &.selected {
      opacity: 0.6;
    }

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
        background: $color-efeff6;
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
        color: $--b-main-black-color;
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
        min-width: 170px;

        .b-my-event-card__label {
          @include inter(12px, 400, $--b-main-gray-color);
          line-height: 20px;

          padding: 0px 8px;
          border: 1px solid $color-efeff6;
          border-radius: 100px;
          margin-right: 4px;
          margin-bottom: 4px;
        }
      }
    }
  }

  .b-my-event-card__right-block {
    max-height: 50px;

    &.selected {
      opacity: 0.6;
    }

    .b-my-event-card__status {
      @include inter(12px, 400);
      line-height: 20px;
      text-align: center;
      border-radius: 4px;
      padding: 0px 4px;

      &-planned {
        color: $--b-main-black-color;
        background: $color-efeff6;
      }

      &-active {
        color: $--b-main-white-color;
        background: $color-71ba12;
      }

      &-finished {
        color: $--b-main-white-color;
        background: $color-e184a0;
      }
    }

    .b-my-event-card__col-3 {
      min-width: 120px;
      max-height: 70px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      margin-left: -20px;

      .b-my-event-card__state {
        @include inter(13px, 400);
        line-height: 20px;
        text-align: center;
        padding: 0px 4px;
        border-radius: 4px;
        background: $color-efeff6;
        width: fit-content;

        &.b-my-event-card__active {
          background: $color-71ba12;
          color: $--b-main-white-color;
        }
      }

      .b-my-event-card__date {
        @include inter(14px, 500);
        line-height: 20px;
        text-align: right;
        margin-top: 12px;
        margin-bottom: 4px;
      }

      .b-my-event-card__time {
        @include inter(12px, 400, $color-4c4a82);
        line-height: 20px;
        text-align: right;
      }
    }
  }
}
:deep(.b-place-detector) {
  max-width: 70%;
  overflow: hidden;
}
:deep(.b-place-name) {
  max-width: 70%;
}
</style>
