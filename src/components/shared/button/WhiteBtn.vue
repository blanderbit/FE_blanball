<template>
  <div
    class="b_white-btn"
    :style="styles"
    @click.stop="!disabled && $emit('click-function', $event)"
  >
    <img v-if="icon" class="b_wbite-btn-left-icon" :src="icon" alt="" />
    {{ btnText }}
    <img
      v-if="rightIcon"
      class="b_wbite-btn-right-icon"
      :src="rightIcon"
      alt=""
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    rightIcon: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: null,
    },
    height: {
      type: Number,
      default: 32,
    },
    mainColor: {
      type: String,
      default: '#148783',
    },
    fontStyles: {
      type: Object,
      default: () => {},
    },
    isBorder: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
    },
  },
  setup(props) {
    const btnWidth = computed(() => {
      return props.width ? props.width + 'px' : '100%';
    });

    const { t } = useI18n();

    const btnText = computed(() => {
      try {
        return t(props.text);
      } catch {
        return props.text;
      }
    });

    const styles = computed(() => {
      return {
        ...props.fontStyles,
        width: btnWidth.value,
        color: props.mainColor,
        border: `${
          props.isBorder
            ? `1px solid ${
                props.borderColor ? props.borderColor : props.mainColor
              }`
            : 'none'
        }`,
        height: props.height + 'px',
      };
    });

    return {
      btnWidth,
      btnText,
      styles,
    };
  },
};
</script>

<style lang="scss" scoped>
.b_white-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  .b_wbite-btn-left-icon {
    margin-right: 8px;
  }

  .b_wbite-btn-right-icon {
    margin-left: 8px;
  }
}
</style>
