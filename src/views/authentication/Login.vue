<template>
  <AuthenticationMain
    :block-type="mockData.LOGIN"
    :backgroundTab="backgroundTab"
    :right-side-style="rightSideStyle"
  >
    <template #main-content>
      <login />
    </template>
  </AuthenticationMain>
</template>

<script>
import { computed } from 'vue';

import login from '../../components/main/login/Login.vue';
import AuthenticationMain from '../../components/AuthenticationMain.vue';

import { CONSTS } from '../../consts/index';

import bgTabPicture from '../../assets/img/registration-back-tab1.svg';
import rightSidePicture from '../../assets/img/registration-back-1.svg';

export default {
  components: {
    login,
    AuthenticationMain,
  },
  setup() {
    const mockData = computed(() => {
      return {
        LOGIN: CONSTS.register.authBlockTypes.login,
      };
    });
    const backgroundTab = computed(() => {
      return bgTabPicture;
    });
    const rightSideStyle = computed(() => {
      return { '--back-picture': `url(${rightSidePicture})` };
    });

    return {
      mockData,
      backgroundTab,
      rightSideStyle,
    };
  },
};
</script>
