<template>
  <span class="b-counter">
    <p 
      v-if="seconds > 0" 
      class="sms-text"
    >
      {{ $t('modals.change_password.sms-code') }}
      {{ email }}
      {{ $t('modals.change_password.during') }}
      {{ seconds }}
      {{ $t('modals.change_password.seconds') }}
    </p>
    <p 
      v-if="seconds === 0" 
      class="sms-text"
    >
      {{ $t('modals.change_password.sms-not-came') }}
      <span @click="$emit('resendCodeAction')">
        {{ $t('modals.change_password.send-again') }}
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
      default: 30
    },
    email: {
      type: String,
      default: ''
    }
  },
  emits: ['resendCodeAction'],
  setup(props) {
    const seconds = ref(props.startTime)
    const interval = ref()

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
      seconds
    }
  }
}
</script>

<style>

</style>