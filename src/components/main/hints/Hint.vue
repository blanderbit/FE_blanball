<template>
  <div class="b-hint-wrapper" @click.self="$emit('closeHint')">
    <div class="b-hint" :style="hintConfig.style">
      <div class="b-hint-top-side">
        <img v-if="hintConfig.headerImg" :src="hintConfig.headerImg" alt="" />
        <span class="b-hint-title" :style="hintConfig.titleStyle">{{
          $t(hintConfig.title)
        }}</span>
      </div>
      <div class="b-hint-main-side">
        <div
          v-for="text in hintConfig.texts"
          class="b-hint-main-text"
          :style="hintConfig.textsStyle"
        >
          <span>{{ $t(text) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';

export default {
  props: {
    hintData: {
      type: Object,
      required: true,
    },
  },
  emits: ['closeHint'],
  setup({ hintData }) {
    const hintConfig = computed(() => {
      return {
        title: hintData.title,
        texts: hintData.texts,
        headerImg: hintData.headerImg,
        style: {
          background: hintData.backgroundColor,
          width: `${hintData?.width}px`,
          top: `${hintData?.top}px`,
          left: `${hintData?.left}px`,
          bottom: `${hintData?.bottom}px`,
          right: `${hintData?.right}px`,
        },
        titleStyle: {
          color: hintData.titleColor,
        },
        textsStyle: {
          color: hintData.textsColor,
        },
      };
    });

    return {
      hintConfig,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-hint-wrapper {
  @include modal-wrapper;

  .b-hint {
    box-shadow: 36px 36px 31px rgba(8, 72, 221, 0.02),
      16px 16px 23px rgba(8, 72, 221, 0.03), 4px 4px 12px rgba(8, 72, 221, 0.03),
      0px 0px 0px rgba(8, 72, 221, 0.03);
    border-radius: 12px;
    padding: 16px;
    position: absolute;
    height: fit-content;

    .b-hint-top-side {
      display: flex;
      align-items: center;
      gap: 10px;

      .b-hint-title {
        @include exo(20px, 700);
        line-height: 28px;
        width: fit-content;
      }
    }
    .b-hint-main-side {
      .b-hint-main-text {
        @include inter(16px, 400);
        line-height: 24px;
        margin-top: 12px;
        width: fit-content;
      }
    }
  }
}
</style>
