<template>
  <div class="spiner-wrapper" v-show="loading">
    <div class="spiner-body">
      <div class="spiner">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="spiner-text">Завантаження</div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'loadingSamll',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const loading = ref(props.isActive)

    watch(
      () => props.isActive,
      (newData, oldData) => {
        loading.value = newData
      }
    )

    return {
      loading,
    }
  },
}
</script>

<style lang="scss" scoped>
.spiner-wrapper {
  background: rgba(255, 255, 255, 0.514);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  .spiner-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 36px 40px;
    position: absolute;
    width: 220px;
    height: 248px;
    background: #ffffff;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        border: 8px solid #148783;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #148783 transparent transparent transparent;
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
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #262541;
    }
  }
}
</style>
