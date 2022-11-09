<template>
  <div class="b-rating-card">
    <div class="b-rating-card__top-table">
      <div class="b-rating-card__title">
        {{ $t('profile.your-rate') }}
      </div>
      <div class="b-rating-card__subtitle">
        {{ $t('profile.sub-rate') }}
      </div>
      <ReviewDetailsComponent 
        :user-rate="ratingScale" 
      />
      <div class="b-rating-card__btns-block">
        <div
          class="b-rating-card__left-btn"
          :style="{
            border: `1px solid ${rateStatus ? '#DFDEED' : '#148581'}`,
          }"
          @click="switchRate(false)"
        >
          {{ $t('profile.generally') }}
        </div>
        <div
          class="b-rating-card__right-btn"
          :style="{
            border: `1px solid ${rateStatus ? '#148581' : '#DFDEED'}`,
          }"
          @click="switchRate(true)"
        >
          {{ $t('profile.detailed') }}
        </div>
      </div>
      <transition>
        <div v-if="rateStatus" class="b-rating-card__cards-block">
          <div
            v-for="item in rateBlock"
            :key="item.id"
            class="b-rating-card__card"
            :style="{ 'border-top': item.id !== 0 && '1px dashed #DFDEED' }"
          >
            <div class="b-rating-card__top-line">
              <div class="b-rating-card__name">
                {{ item.name }}
              </div>
              <div class="b-rating-card__rate">
                <!-- rating stars -->
              </div>
            </div>
            <div class="b-rating-card__bottom-line">
              <div class="b-rating-card__date">
                {{ item.date }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import ReviewDetailsComponent from '../components/ReviewDetails.vue'

export default {
  name: 'RatingCard',
  components: {
    ReviewDetailsComponent
  },
  props: {
    rateBlock: {
      type: Array,
      default: () => []
    },
    ratingScale: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const rateStatus = ref(false)

    function switchRate(val) {
      rateStatus.value = val
    }

    onMounted(() => {
      console.log(props.rateBlock)
    })

    return {
      rateStatus,
      switchRate
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-rating-card {
    height: fit-content;
    background: #ffffff;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    padding: 20px 16px;
    @media (max-width: 768px) {
      width: 100%;
      min-width: 100%;
    }
    @media (min-width: 1400px) {
      margin-right: 16px;
    }
    @media (min-width: 992px) {
      width: 320px;
      min-width: 320px;
    }
    @media (max-width: 992px) {
      width: 100%;
      min-width: 100%;
      order: 2;
      margin-bottom: 10px;
      margin-right: 0;
    }
    .b-rating-card__top-table {
      .b-rating-card__title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
      }
      .b-rating-card__subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #575775;
      }
      .b-rating-card__scale-block {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 12px;
        margin-bottom: 12px;
      }
      .b-rating-card__btns-block {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        display: flex;
        .b-rating-card__left-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          color: #262541;
          border-radius: 6px 0px 0px 6px;
          flex-basis: 50%;
          cursor: pointer;
        }
        .b-rating-card__right-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          color: #575775;
          border-radius: 0px 6px 6px 0px;
          flex-basis: 50%;
          cursor: pointer;
        }
      }
      .b-rating-card__cards-block {
        margin-top: 20px;
        .b-rating-card__card {
          padding-top: 8px;
          margin-bottom: 8px;
          .b-rating-card__top-line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .b-rating-card__name {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 13px;
              line-height: 20px;
              color: #262541;
            }
          }
          .b-rating-card__bottom-line {
            display: flex;
            justify-content: flex-start;
            .b-rating-card__date {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              text-align: center;
              color: #575775;
            }
          }
        }
      }
    }
  }
</style>