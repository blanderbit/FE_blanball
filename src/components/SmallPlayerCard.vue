<template>
  <div 
    :class="['b-small-player-card', { inactive: !dataPlayer.isActive }]"
  >
    <div class="b-small-player-card__left-side">
      <div class="b-small-player-card__picture">
        <img :src="dataPlayer.img" alt="">
      </div>
      <div class="b-small-player-card__name-duty">
        <div class="b-small-player-card__name">
          {{dataPlayer.name}}
        </div>
        <div class="b-small-player-card__duty">
          {{dataPlayer.duty}}
        </div>
      </div>
    </div>
    <div class="b-small-player-card__right-side">
      <div
        v-if="dataPlayer.isActive"
        class="b-small-player-card__status"
      >
        {{ dataPlayer.status }}
      </div>
      <img 
        v-else 
        :src="dataPlayer.status" 
        class="b-small-player-card__inactive"
        alt=""
      >
      <div class="b-small-player-card__icon">
        <img :src="dataPlayer.icon" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataPlayer: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-small-player-card {
    width: 380px;
    padding: 14px 20px;
    border: 1px solid #DFDEED;
    border-radius: 4px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #262541;
    @media (min-width: 1200px) and (max-width: 1400px) {
      width: 368px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 300px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    &.inactive {
      font-size: 13px;
      color: #575775;
    }
    .b-small-player-card__left-side {
      display: flex;
      align-items: center;
      .b-small-player-card__picture {
        margin-right: 16px;
      }
      .b-small-player-card__name-duty {
        .b-small-player-card__duty {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
        }
      }

    }
    .b-small-player-card__right-side {
      display: flex;
      align-items: center;
      .b-small-player-card__status {
        margin-right: 24px;
      }
      .b-small-player-card__inactive {
        margin-right: 24px;
      }
    }
  }
</style>