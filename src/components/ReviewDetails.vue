<template>
  <div class="b-review-details">
    <div class="b-review-details__emoji">
      <img :src="emoji" alt="" />
    </div>
    <div class="b-review-details__lines">
      <div
        v-for="(block, idx) in lines"
        :key="idx"
        class="b-review-details__block"
      >
        <div
          v-for="item in block"
          :key="item.id"
          class="b-review-details__line"
          :style="{ background: item.color }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import emoji_1 from '../assets/img/emojies/1.svg'
import emoji_2 from '../assets/img/emojies/2.svg'
import emoji_3 from '../assets/img/emojies/3.svg'
import emoji_4 from '../assets/img/emojies/4.svg'
import emoji_5 from '../assets/img/emojies/5.svg'
import noReviews from '../assets/img/no-records/no-reviews.svg'

const COLORS = {
  0: '#DFDEED',
  1: '#FF1D1D',
  2: '#FFF61D',
  3: '#B2FF8E',
  4: '#79FFC7',
  5: '#62C7FF',
}

export default {
  name: 'ReviewDetailsComponent',
  props: {
    userRate: {
      type: [String, Number],
      default: '0',
    },
  },
  setup(props) {
    const rateNumber = ref(Math.round(+props.userRate))
    const lines = computed(() => {
      const arr = Array.from({ length: 5 }, (v, idx) => {
        return Array.from({ length: 5 }, (v, idx) => ({
          id: idx,
          color: COLORS[0],
        }))
      })

      return arr.map((item, idx) => {
        if (idx < rateNumber.value) {
          return item.map((element) => ({
            ...element,
            color: COLORS[rateNumber.value],
          }))
        } else {
          return item
        }
      })
    })

    const emoji = computed(() => {
      switch (rateNumber.value) {
        case 5:
          return emoji_5
          break
        case 4:
          return emoji_4
          break
        case 3:
          return emoji_3
          break
        case 2:
          return emoji_2
          break
        case 1:
          return emoji_1
          break
        default:
          return noReviews
      }
    })

    return {
      lines,
      emoji,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-review-details {
  display: flex;
  justify-content: flex-start;
  margin-top: 12px;
  margin-bottom: 12px;
  .b-review-details__lines {
    display: flex;
    justify-content: space-between;
    width: 250px;
    min-width: 250px;
    height: 36px;
    clip-path: polygon(0 88%, 100% 0, 100% 100%, 0 100%);
    margin-left: 12px;
    .b-review-details__block {
      display: flex;
      justify-content: space-between;
      width: 43px;
      .b-review-details__line {
        width: 4px;
        height: 100%;
        border-radius: 4px;
      }
    }
  }
}
</style>
