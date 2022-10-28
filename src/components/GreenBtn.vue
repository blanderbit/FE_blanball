<template>
  <div
    class="b-green-btn"
    :style="btnStyle"
    @click="$emit('click-function')"
  >
    <img v-if="icon" :src="icon" alt="">
    {{ text }}
    <img v-if="iconRight" :src="iconRight" alt="">
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: 32
    },
    icon: {
      type: String,
      default: null
    },
    iconRight: {
      type: String,
      default: null
    },
    backgroundColor: {
      type: String,
      default: '#148783'
    },
    fontStyles: {
      type: Object,
      default: () => {}
    },
    isIconAndTextApart: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const btnStyle = computed(() => {
      return {
        ...props.fontStyles,
        width: props.width ? props.width + 'px' : '100%',
        height: props.height + 'px',
        background: props.backgroundColor,
        'justify-content': props.iconRight || props.icon ? 'space-around' : 'center'
      }
    })

    return {
      btnStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.b-green-btn {
  border-radius: 6px;
  color: #fff;
  height: 32px;
  display: flex;
  align-items: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  img {
    margin-right: 8px;
  }
}
</style>