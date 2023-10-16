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
import login from '@mainComponents/login/Login.vue';
import AuthenticationMain from '@components/AuthenticationMain.vue';

import bgTabPicture from '@images/registration-back-tab1.svg';
import rightSidePicture from '@images/registration-back-1.svg';

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
