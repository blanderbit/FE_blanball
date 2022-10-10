<template>
  <div class="b-review-details">
    <div class="b-review-details__emoji">
      <img :src="emoji" alt="">
    </div>
    <div class="b-review-details__lines">
      <div 
        v-for="item in lines"
        :key="item.id"
        class="b-review-details__line"
        :style="{ background: item.color }"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import emoji_1 from '../assets/img/emojies/1.svg'
import emoji_2 from '../assets/img/emojies/2.svg'
import emoji_3 from '../assets/img/emojies/3.svg'
import emoji_4 from '../assets/img/emojies/4.svg'
import emoji_5 from '../assets/img/emojies/5.svg'

const COLORS = {
  grey: '#DFDEED',
  red: '#FF1D1D',
  yellow: '#FFF61D',
  green: '#B2FF8E',
  turquoise: '#79FFC7',
  blue: '#62C7FF'
}

export default {
  name: 'ReviewDetailsComponent',
  props: {
    userRate: {
      type: String,
      default: '0'
    }
  },
  setup(props) {
    const lines = computed(() => {
      const rateNumber = Math.floor(+props.userRate)
      const arr = Array.from({length: 25}, (v, idx) => {
        return {
          id: idx,
          color: COLORS.grey
        }
      })

      switch(rateNumber) {
        case 5: return arr.map(item => ({...item, color: COLORS.blue}))
        break;
        case 4: return arr.map(item => {
          return item.id < 20 ? {...item, color: COLORS.turquoise} : item
        })
        break;
        case 3: return arr.map(item => {
          return item.id < 15 ? {...item, color: COLORS.green} : item
        })
        break;
        case 2: return arr.map(item => {
          return item.id < 10 ? {...item, color: COLORS.yellow} : item
        })
        break;
        case 1: return arr.map(item => {
          return item.id < 5 ? {...item, color: COLORS.red} : item
        })
        break;
        default: return arr
      }
    })
    const emoji = computed(() => {
      const rateNumber = Math.floor(+props.userRate)
      switch(rateNumber) {
        case 5: return emoji_5
        break;
        case 4: return emoji_4
        break;
        case 3: return emoji_3
        break;
        case 2: return emoji_2
        break;
        case 1: return emoji_1
        break;
        default: return emoji_1
      }
    })

    return {
      lines,
      emoji
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-review-details {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    margin-bottom: 12px;
    .b-review-details__lines {
      display: flex;
      justify-content: space-between;
      width: 250px;
      height: 36px;
      clip-path: polygon(0 88%, 100% 0, 100% 100%, 0 100%);
      .b-review-details__line {
        width: 4px;
        height: 100%;
        border-radius: 4px;
      }
    }
  }
</style>