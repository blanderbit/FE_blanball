<template>
  <span class="b-counter">
    {{ seconds }}
  </span>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'

export default {
  name: 'Counter',
  props: {
    startTime: {
      type: Number,
      default: 30
    }
  },
  emits: ['secondTick'],
  setup(props, {emit}) {
    const seconds = ref(props.startTime)
    const interval = ref()

    interval.value = setInterval(() => {
      if (seconds.value !== 0) {
        seconds.value--
        emit('secondTick', seconds.value)
      }
    }, 1000)

    onBeforeUnmount(() => {
      clearInterval(interval.value)
      seconds.value = props.startTime
    })

    return {
      seconds
    }
  }
}
</script>

<style>

</style>