<template>
  <div v-if="loading" class="b-preloader__wrapper">
    <div class="b-preloader__body">
      <div class="b-preloader__percent">{{ currentLoadPercentage }}%</div>
      <span class="b-preloader__loading">Завантаження</span>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue';

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    fullLoadingTime: {
      type: Number,
      default: 0,
    },
    loadingDelay: {
      type: Number,
      default: 0,
    },
    loadingProgress: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const loading = ref(props.isActive);
    const intervalStep = 20;

    watch(
      () => props.isActive,
      (newData, oldData) => {
        loading.value = newData;
      }
    );
    const timer = ref(0);

    const currentLoadPercentage = computed(() => {
      const elapsedRatio = timer.value / props.fullLoadingTime?.value;
      if (props.loadingProgress?.value) {
        return Math.min(
          props.loadingProgress?.value +
            elapsedRatio * (100 - props.loadingProgress?.value),
          100
        ).toFixed(1);
      }
      return timer.value / intervalStep;
    });

    onMounted(() => {
      setInterval(() => {
        timer.value += intervalStep;
      }, intervalStep);
    });

    return {
      loading,
      currentLoadPercentage,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-preloader__wrapper {
  background: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;

  .b-preloader__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 36px 40px;
    position: absolute;
    width: 312px;
    height: 312px;
    background: $--b-main-white-color;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .b-preloader__percent {
      @include exo(23px, 700);
      line-height: 28px;
      text-align: center;
    }

    .b-preloader__loading {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #262541;
    }
  }
}
</style>
