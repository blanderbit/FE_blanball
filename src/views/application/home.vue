<template>
  <div>
    <ModalFeedback 
      v-if="isModalActive"
      @close-modal="toggleModal"
    />
    <div v-for="item of routes">
      <button>{{ item.name }} - {{ item.path }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ModalFeedback from '../../components/ModalFeedback/index.vue'
import routerConfig from '../../router/index'

const routes = routerConfig.options.routes
const isModalActive = ref(true)

const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}
</script>

