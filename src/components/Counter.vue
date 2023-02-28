<template>
  <span class="b-counter">
    <p v-if="seconds" class="b-counter__sms-text">
      {{ counterText }}
      {{ email }}
      {{ $t('counter.during') }}
      {{ seconds }}
      {{ $t('counter.seconds') }}
    </p>
    <p v-else class="b-counter__sms-text">
      {{ $t('counter.sms-not-came') }}
      <span @click="resendCodeMethod">
        {{ $t('counter.send-again') }}
      </span>
    </p>
  </span>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'

export default {
  name: 'Counter',
  props: {
    startTime: {
      type: Number,
      default: 30,
    },
    counterText: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  emits: ['resendCodeAction'],
  setup(props, { emit }) {
    const seconds = ref(props.startTime)
    const interval = ref()

    const resendCodeMethod = () => {
      emit('resendCodeAction')
      seconds.value = props.startTime
    }

    interval.value = setInterval(() => {
      if (seconds.value !== 0) {
        seconds.value--
      }
    }, 1000)

    onBeforeUnmount(() => {
      clearInterval(interval.value)
      seconds.value = props.startTime
    })

    return {
      seconds,
      resendCodeMethod,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-counter {
  &__sms-text {
    @include inter(12px, 500, $--b-main-gray-color);
    line-height: 20px;
    color: $--b-main-gray-color;
    margin-bottom: 4px;
    span {
      border-bottom: 1px solid $--b-main-gray-color;
      cursor: pointer;
    }
  }
}
</style>
