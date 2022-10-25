<template>
  <div
    :class="['b-my-event-card', { active: card.isActive }]"
    @click.right.prevent="$emit('cardRightClick', $event)"
  >
    <div class="b-my-event-card__left-block">
      <div class="b-my-event-card__col-1">
        <div class="b-my-event-card__card-icon">
          <img src="../assets/img/hands-shake.svg" alt="" />
        </div>
      </div>
      <div class="b-my-event-card__col-2">
        <div class="b-my-event-card__title">{{ card.title }}</div>
        <div class="b-my-event-card__address">
          <img src="../assets/img/location-point.svg" alt="" />
          <p>
            {{ card.address }}
          </p>
        </div>
        <div class="b-my-event-card__labels">
          <div
            v-for="label in card.labels"
            :key="label"
            class="b-my-event-card__label"
          >
            {{ label }}
          </div>
        </div>
      </div>
    </div>
    <div class="b-my-event-card__right-block">
      <div class="b-my-event-card__col-3">
        <div :class="['b-my-event-card__state', { active: card.isActive }]">
          {{ card.isActive ? 'Активно' : 'Заплановано' }}
        </div>
        <div class="b-my-event-card__date">
          {{ card.date }}
        </div>
        <div class="b-my-event-card__time">
          {{ card.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
  },
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
  width: 328px;
  @media (min-width: 1200px) and (max-width: 1400px) {
    width: 408px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 320px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 344px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  &.active {
    border: 1px solid #71ba12;
  }
  .b-my-event-card__left-block {
    display: flex;
    .b-my-event-card__col-1 {
      margin-right: 8px;
      min-width: 50px;
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
      width: 150px;
      @media (min-width: 1200px) and (max-width: 1400px) {
        width: 230px;
      }
      @media (min-width: 992px) and (max-width: 1199px) {
        width: 150px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        width: 165px;
      }
      @media (max-width: 768px) {
        width: 70%;
      }
      .b-my-event-card__title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
      }
      .b-my-event-card__address {
        display: flex;
        background: #fafafa;
        padding: 0px 4px;
        margin-top: 4px;
        img {
          margin-right: 5px;
        }
        p {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          border-radius: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      .b-my-event-card__labels {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 8px;
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
</style>