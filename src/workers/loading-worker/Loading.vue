<template>
  <div class="spiner-wrapper" v-show="isLoading">
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
export default {
  name: 'loading',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
 $color-148783: #148783;


.spiner-wrapper {
  background: rgba(255, 255, 255, 0.514);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .spiner-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 36px 40px;
    position: absolute;
    width: 220px;
    height: 248px;
    background: $--b-main-white-color;
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
        border: 8px solid $--b-main-green-color;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: $color-148783 transparent transparent transparent;
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
</style>
