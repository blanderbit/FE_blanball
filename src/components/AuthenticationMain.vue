<template>
  <div class="b-auth">
    <div
      v-if="backgroundTab"
      class="b-auth__background-tab"
    >
      <img 
        :src="backgroundTab" 
        alt="background image tablet"
      />
    </div>
    <div 
      v-if="backgroundMob"
      class="b-auth__background-mob"
    >
      <img 
        :src="backgroundMob" 
        alt="background image mobile"
      />
    </div>

    <div class="b-auth__central-block">
      <img
        v-if="blockType === mockData.LOGIN"
        src="../assets/img/ball-colored.svg"
        alt="ball-big"
        class="b-auth__ball-big"
      />
      <img
        v-if="blockType === mockData.LOGIN"
        src="../assets/img/ball-colored.svg"
        alt="ball-small"
        class="b-auth__ball-small"
      />
      <div class="b-auth__left-part">
        <slot name="main-content"></slot>
      </div>

      <div 
        class="b-auth__right-part" 
        :style="rightSideStyle" 
        v-show="currentStep !== 6"
      >
        <div class="b-auth__google-play-block" >
          <img 
            src="../assets/img/google-play.svg" 
            alt=""
          />
          <span>
            {{ $t('register.load-app') }}
          </span>
        </div>
        <!--<template v-else>-->
        <!--</template>-->
      </div>
      <div 
        class="b-auth__right-part" 
        v-if="currentStep === 6" 
        style="height: 600px"
      >
        <position-map></position-map>
      </div>
    </div>

  </div>
</template>

<script>
  import { computed } from 'vue'
  import PositionMap from './maps/PositionMap.vue'
  import CONSTANTS from '../consts/index'

  export default {
    name: 'Auth',
    components: {
      PositionMap
    },
    props: {
      backgroundTab: {
        type: String,
        default: ''
      },
      backgroundMob: {
        type: String,
        default: ''
      },
      rightSideStyle: {
        type: Object,
        default: () => {}
      },
      currentStep: {
        type: Number,
        default: null
      },
      blockType: {
        type: String,
        default: ''
      }
    },
    setup() {
      const mockData = computed(() => {
        return {
          LOGIN: CONSTANTS.register.authBlockTypes.login
        }
      })

      return {
        mockData
      }
    },
  }
</script>

<style lang="scss" scoped>
  .b-auth {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 576px) and (max-width: 992px) {
      padding-top: 132px;
      overflow: hidden;
    }
    @media (max-width: 576px) {
      padding-top: 140px;
    }
    .b-auth__background-tab {
      display: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      @media (min-width: 576px) and (max-width: 992px) {
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
      @media (max-width: 576px) {
        display: block;
        width: 100%;
      }
      img {
        width: 100%;
      }
    }
    .b-auth__central-block {
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      height: 555px;
      width: 992px;
      display: flex;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      @media (min-width: 992px) and (max-width: 1200px) {
        width: 890px;
      }
      @media (min-width: 576px) and (max-width: 992px) {
        width: 464px;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 8px;
      }
      @media (max-width: 576px) {
        border-radius: 28px 28px 0px 0px;
        width: 100%;
      }
      .b-auth__ball-big {
        position: absolute;
        width: 80px;
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
        @media (min-width: 576px) {
          display: none;
        }
      }
      .b-auth__left-part {
        width: 432px;
        background: #FFFFFF;
        @media (max-width: 992px) {
          width: 100%;
        }
      }
      .b-auth__right-part {
        background-image: var(--back-picture);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 560px;
        position: relative;
        @media (max-width: 992px) {
          display: none;
        }
        .b-auth__google-play-block {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
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