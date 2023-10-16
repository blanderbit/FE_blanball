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
import Stepper from '@mainComponents/passwordReset/Stepper.vue';
import AuthenticationMain from '@components/AuthenticationMain.vue';

import backTab from '@images/registration-back-tab4.svg';
import backMob from '@images/registration-back-mob4.svg';
import rightSidePicture from '@images/registration-back-4.svg';

export default {
  name: 'reset',
  components: {
    Stepper,
    AuthenticationMain,
  },
  setup() {
    const backgroundTab = computed(() => backTab);
    const backgroundMob = computed(() => backMob);
    const rightSideStyle = computed(() => {
      return { '--back-picture': `url(${rightSidePicture})` };
    });

    return {
      backgroundTab,
      backgroundMob,
      rightSideStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.b-auth__left-part) {
  @include mobile {
    margin-top: 170px;
  }
}
</style>
