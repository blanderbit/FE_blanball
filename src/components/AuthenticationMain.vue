<template>
  <div class="b-auth" :style="authBlockStyles">
    <div v-if="backgroundTab" class="b-auth__background-tab">
      <img :src="backgroundTab" :alt="'background_image_tablet'" />
    </div>
    <Transition>
      <div v-if="backgroundMob" class="b-auth__background-mob">
        <img :src="backgroundMob" :alt="'background image mobile'" />
      </div>
    </Transition>
    <div class="b-auth__central-block">
      <img
        v-if="blockType === mockData.LOGIN"
        src="@images/ball-colored.svg"
        alt="ball-big"
        class="b-auth__ball-big"
      />
      <img
        v-if="blockType === mockData.LOGIN"
        src="@images/ball-colored.svg"
        alt="ball-small"
        class="b-auth__ball-small"
      />
      <div class="b-auth__left-part">
        <slot name="main-content"></slot>
      </div>

      <Transition>
        <div
          class="b-auth__right-part"
          :style="rightSideStyle"
          v-show="currentStep !== 10"
        >
          <div class="b-auth__google-play-block">
            <img src="@images/google-play.svg" alt="" />
            <span>
              {{ $t('register.load-app') }}
            </span>
          </div>
        </div>
      </Transition>
      <div
        class="b-auth__right-part"
        v-if="currentStep === 10 && windowWidth > 768"
      >
        <position-map></position-map>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import PositionMap from './maps/PositionMap.vue';
import { CONSTS } from '@consts/index';
import { useWindowWidth } from '@workers/window-size-worker/widthScreen';

export default {
  name: 'Auth',
  components: {
    PositionMap,
  },
  props: {
    backgroundTab: {
      type: String,
      default: '',
    },
    backgroundMob: {
      type: String,
      default: '',
    },
    rightSideStyle: {
      type: Object,
      default: () => {},
    },
    currentStep: {
      type: Number,
      default: null,
    },
    blockType: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { windowWidth, isMobileSmall } = useWindowWidth();
    const mockData = computed(() => {
      return {
        LOGIN: CONSTS.register.authBlockTypes.login,
      };
    });

    const authBlockStyles = computed(() => {
      if (isMobileSmall.value) {
        return {
          'align-items': props.currentStep < 3 ? 'flex-start' : 'flex-end',
        };
      } else {
        return { 'align-items': 'center' };
      }
    });

    return {
      mockData,
      windowWidth,
      authBlockStyles,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@sytles/mixins/device.scss';

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
.b-auth {
  position: relative;
  @include calc-height;
  display: flex;
  justify-content: center;
  @include tablet {
    padding-top: 132px;
    overflow: hidden;
  }
  @include mobile {
    padding-top: 140px;
    padding-top: 0;
    // display: block;
  }

  .b-auth__background-tab {
    display: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    @include tablet {
      display: block;
    }
    img {
      width: 100%;
    }
  }
  .b-auth__background-mob {
    display: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    @include mobile {
      display: block;
      width: 100%;
    }
    img {
      width: 100%;
    }
  }
  .b-auth__central-block {
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    height: 650px;
    width: 992px;
    display: flex;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    @media (min-width: 992px) and (max-width: 1200px) {
      width: 890px;
    }
    @include tablet {
      width: 464px;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 8px;
    }
    @include mobile {
      border-radius: 28px 28px 0px 0px;
      width: 100%;
      box-shadow: none;
    }
    .b-auth__ball-big {
      position: absolute;
      width: 100px;
      top: -30px;
      left: -30px;
      @media (min-width: 576px) {
        display: none;
      }
    }
    .b-auth__ball-small {
      position: absolute;
      top: 0;
      right: 0;
      @include tablet {
        display: none;
      }
    }
    .b-auth__left-part {
      width: 432px;
      background: $--b-main-white-color;
      @media (max-width: 992px) {
        width: 100%;
      }

      @media (min-width: 320px) and (max-width: 576px) {
        border-radius: 28px 28px 0px 0px;
      }
    }
    .b-auth__right-part {
      background-image: var(--back-picture);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 0 0;
      width: 560px;
      position: relative;
      height: 100%;
      @media (max-width: 992px) {
        display: none;
      }
      .b-auth__google-play-block {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        @include inter(14px, 400, $--b-main-gray-color);
        line-height: 20px;
        padding: 24px;
        img {
          margin-right: 12px;
        }
        span {
          width: 280px;
        }
      }
    }
  }
}
</style>
