<template>
  <AuthenticationMain
    :background-tab="backgroundTab"
    :background-mob="backgroundMob"
    :right-side-style="rightSideStyle"
  >
    <template #main-content>
      <Stepper />
    </template>
  </AuthenticationMain>
</template>

<script>
import { computed } from 'vue'

import Stepper from '../../components/reset-components/Stepper.vue'
import AuthenticationMain from '../../components/AuthenticationMain.vue'

import backTab from '../../assets/img/registration-back-tab4.svg'
import backMob from '../../assets/img/registration-back-mob4.svg'
import rightSidePicture from '../../assets/img/registration-back-4.svg'

export default {
  name: 'reset',
  components: {
    Stepper,
    AuthenticationMain,
  },
  setup() {
    const backgroundTab = computed(() => backTab)
    const backgroundMob = computed(() => backMob)
    const rightSideStyle = computed(() => {
      return { '--back-picture': `url(${rightSidePicture})` }
    })

    return {
      backgroundTab,
      backgroundMob,
      rightSideStyle,
    }
  },
}
</script>
<style lang="scss" scoped>
::v-deep(.b-auth__left-part) {

  @media (max-width: 576px) {
    margin-top: 170px; 
  }
} 
</style>