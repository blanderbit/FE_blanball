<template>
  <div class="spiner-wrapper" v-show="loading">
    <div class="spiner-body">
      <div class="spinner">
    <div class="spinner__ring"></div>
  </div>
      <div class="spiner-text">Завантаження</div>
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

    watch(() => props.isLoading,
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
  
    .spiner-text {
      @include inter(14px, 400, $--b-main-gray-color);
      line-height: 20px;
      margin-top: 20px;
    }
  }
}


.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner__ring {
  width: 140px;
  height: 140px;
  border: 12px solid transparent;
  border-top-color: #148783;
  border-right-color: #148783;
  border-left-color: #EFEFF6;
  border-bottom-color: #EFEFF6;
  border-radius: 50%;
  position: relative;
  animation: spinner-rotate 1.3s linear infinite;
}

.spinner__ring::before,
.spinner__ring::after {
  content: "";
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 100px;
  background: linear-gradient(rgba(20,135,131,0) 50%, #148783 50%), linear-gradient(106.25deg, #148783 12.19%, rgba(69, 208, 204, 0.1) 102.49%);
}

.spinner__ring::before {
  transform: rotate(45deg);
}

.spinner__ring::after {
  transform: rotate(-45deg);
}

.spinner__ring::before {
  position: absolute;
  top: 8px;
  left: 6px;
}

.spinner__ring::after {
  position: absolute;
  bottom: 8px;
  right: 6px;
}

@keyframes spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
