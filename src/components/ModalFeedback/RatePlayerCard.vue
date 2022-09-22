<template>
  <div class="b-player-card">
    <div class="b-player-card__left-part">
      <div 
        class="b-player-card__team-label"
        :style="{ background: player.color }"
      >
        {{player.label}}
      </div>
      <div class="b-player-card__player-name">{{player.name}}</div>
    </div>
    <div class="b-player-card__right-part">
      <div class="b-player-card__rating">
        <!-- <star-rating v-model:rating="rating"></star-rating> -->
      </div>
      <div class="b-player-card__message">
        <img src="../../assets/img/message-icon.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

// import VueStarRating from 'vue-star-rating'

export default {
  name: 'RatePlayerCard',
  components: {
    // VueStarRating
  },
  props: {
    player: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    onMounted(() => {
      console.log(props.player)
    })

    const rating = ref(3)

    return {
      rating
    }
  }
}
</script>

<style lang="scss" scoped>
.b-player-card {
  border-top: 1px dashed #DFDEED;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  .b-player-card__left-part { 
    display: flex;
    align-items: center;
    .b-player-card__team-label { 
      margin-right: 8px;
      padding: 0px 4px;
      background: #2946E1;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    .b-player-card__player-name { 
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
    }
  }

  .b-player-card__right-part { 
    display: flex;
    align-items: center;
    .b-player-card__rating { 

    }

    .b-player-card__message { 
      margin-left: 22px;
    }
  }
}
</style>