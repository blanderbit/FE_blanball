<template>
  <PlayerPageComponent page-mode="public" :user-data="publicUserData" />
</template>

<script>
import PlayerPageComponent from '../../../components/PlayerPageComponent.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'PlayerPage',
  components: {
    PlayerPageComponent,
  },
  setup() {
    const route = useRoute()

    const publicUserData = ref(route.meta.publicUserData?.data)

    return {
      publicUserData,
    }
  },
}
</script>
