<template>
  <div class="b-review-details">
    <div 
      v-for="item in lines"
      :key="item.id"
      class="b-review-details__line"
      :style="{ background: item.color }"
    >
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ReviewDetailsComponent',
  props: {
    userRate: {
      type: String,
      default: '0'
    }
  },
  setup(props) {
    const rateNumber = Math.floor(+props.userRate)

    const lines = computed(() => {
      const arr = Array.from({length: 25}, (v, idx) => {
        return {
          id: idx,
          color: '#DFDEED'
        }
      })

      switch(rateNumber) {
        case 5: return arr.map(item => ({...item, color: '#62C7FF'}))
        break;
        case 4: return arr.map(item => {
          return item.id < 20 ? {...item, color: '#79FFC7'} : item
        })
        break;
        case 3: return arr.map(item => {
          return item.id < 15 ? {...item, color: '#B2FF8E'} : item
        })
        break;
        case 2: return arr.map(item => {
          return item.id < 10 ? {...item, color: '#FFF61D'} : item
        })
        break;
        case 1: return arr.map(item => {
          return item.id < 5 ? {...item, color: '#FF1D1D'} : item
        })
        break;
        default: return arr
      }
    })

    return {
      lines
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-review-details {
    display: flex;
    justify-content: space-between;
    width: 250px;
    height: 36px;
    clip-path: polygon(0 88%, 100% 0, 100% 100%, 0 100%);
    .b-review-details__line {
      width: 4px;
      height: 100%;
    }
  }
</style>