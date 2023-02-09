<template>
  <AuthenticationMain
    :block-type="mockData.LOGIN"
    :backgroundTab="backgroundTab"
    :right-side-style="rightSideStyle"
  >
    <template #main-content>
      <LoginComponent />
    </template>
  </AuthenticationMain>
</template>

<script>
import { computed } from 'vue'

import LoginComponent from '../../components/login-components/LoginComponent.vue'
import AuthenticationMain from '../../components/AuthenticationMain.vue'

import bgTabPicture from '../../assets/img/registration-back-tab1.svg'
import rightSidePicture from '../../assets/img/registration-back-1.svg'

import CONSTANTS from '../../consts/index'

export default {
  name: 'login',
  components: {
    LoginComponent,
    AuthenticationMain,
  },
  setup() {
    const mockData = computed(() => {
      return {
        LOGIN: CONSTANTS.register.authBlockTypes.login,
      }
    })
    const backgroundTab = computed(() => {
      return bgTabPicture
    })
    const rightSideStyle = computed(() => {
      return { '--back-picture': `url(${rightSidePicture})` }
    })

    return {
      mockData,
      backgroundTab,
      rightSideStyle,
    }
  },
}
</script>
