<template>
  <div
    class="b-search-block"
    :style="windowStyle"
  >
    <div class="b-search-block__window">
      {{ height }}
      <Spinner v-if="isSpinnerActive"/>
      <slot v-else name="users">
      </slot>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import Spinner from '../workers/infinit-load-worker/Spinner.vue'

export default {
  name: 'SearchBlockAll',
  components: {
    Spinner
  },
  props: {
    width: {
      type: [String, Number],
      default: 'auto'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {

    const isSpinnerActive = ref(props.loading)

    watch(() => props.loading, (newData, oldData) => {
      isSpinnerActive.value = newData
    })

    const windowStyle = computed(() => {
      if (String(props.width).split('').includes('%')) {
        return { width: props.width }
      } else {
        return { width: `${props.width}px` }
      }
    })

    return {
      windowStyle,
      isSpinnerActive,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-search-block {
  padding: 12px;
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  margin-top: 8px;
  position: relative;

  .b-search-block__window {
    overflow: hidden;
    position: relative;
  }
}
</style>
