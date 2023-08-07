<template>
  <div class="b-circular-progress-container">
    <div class="b-circular-progress-bar">
      <svg
        class="b-circular-progress"
        data-progress="10"
        x="0px"
        y="0px"
        viewBox="0 0 80 80"
      >
        <path
          class="b-circular-progress-track"
          d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
        />
        <path
          class="b-circular-progress-fill"
          d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
          :style="{ strokeDashoffset }"
        />
      </svg>
    </div>
  </div>
</template>

<script>
const STROKE_DASHOFFSET_MAX = -219.99078369140625;

export default {
  name: 'CircularProgress',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  setup({ percent }) {
    const strokeDashoffset = ((100 - percent) / 100) * STROKE_DASHOFFSET_MAX;

    return {
      strokeDashoffset,
    };
  },
};
</script>

<style lang="scss">
.b-circular-progress-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.b-circular-progress-bar {
  width: 156px;
  height: 156px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.b-circular-progress {
  z-index: 1;
}
.b-circular-progress .b-circular-progress-track,
.b-circular-progress .b-circular-progress-fill {
  fill: rgba(0, 0, 0, 0);
  stroke-width: 2;
  stroke-linecap: round;
  transform: rotate(90deg) translate(0px, -80px);
}
.b-circular-progress .b-circular-progress-track {
  stroke: transparent;
}
.b-circular-progress .b-circular-progress-fill {
  stroke: #148783;
  stroke-dasharray: 219.99078369140625;
  stroke-dashoffset: -219.99078369140625;
  transition: stroke-dashoffset 1s;
}
</style>
