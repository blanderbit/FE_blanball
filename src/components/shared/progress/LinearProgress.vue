<template>
  <div class="b-linear-progress">
    <div class="b-linear-progress-value" :style="progressValueStyle"></div>
  </div>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'LinearProgress',
  props: {
    value: {
      default: 0,
      type: [Number, String],
    },
  },
  setup({ value }) {
    const progressValueStyle = computed(() => ({
      width: isFinite(value) ? `${value}%` : 0,
    }));

    return {
      progressValueStyle,
    };
  },
};
</script>
<style lang="scss">
.b-linear-progress {
  height: 4px;
  width: 100%;
  border-radius: 2px;
  background-color: #e2e2e9;
  overflow: hidden;
}
.b-linear-progress-value {
  height: 4px;
  width: 0;
  z-index: 1;
  background: $--b-main-green-color;
}
</style>
