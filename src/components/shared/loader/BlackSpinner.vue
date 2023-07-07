<template>
  <div class="spiner-wrapper" v-if="loading">
    <div class="spiner-body">
      <div class="spiner">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const loading = ref(props.isLoading);
    watch(
      () => props.isLoading,
      (newData, oldData) => {
        loading.value = newData;
      }
    );
    return {
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.spiner-wrapper {
  background: rgba(239, 239, 246, 0.38);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .spiner-body {
    display: flex;
    padding: 36px 40px;
    position: absolute;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: transparent;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    .spiner {
      .lds-ring {
        display: inline-block;
        position: relative;
        width: 140px;
        height: 140px;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 140px;
        height: 140px;
        margin: 8px;
        border: 8px solid $--b-main-green-color;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: $--b-main-green-color transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .spiner-text {
      @include inter(14px, 400);
      line-height: 20px;
    }
  }
}

.spiner-text {
  display: none;
}
.spiner-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(239, 239, 246, 0.38);
  width: 100%;
}
.spiner-wrapper .spiner-body {
  background: transparent;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  .spiner {
    .lds-ring,
    .lds-ring div {
      width: 50px;
      height: 50px;
    }
    .lds-ring div {
      border-color: white transparent transparent transparent;
    }
  }
}
</style>
