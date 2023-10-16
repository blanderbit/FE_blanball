<template>
  <div
    :class="['b-green-btn', { animated: animation }, { disabled: disabled }]"
    :style="btnStyle"
    @click.stop="!disabled && $emit('click-function', $event)"
  >
    <img class="b-green-btn__left-icon" v-if="icon" :src="icon" alt="" />
    {{ text }}
    <img
      class="b-green-btn__right-icon"
      v-if="iconRight"
      :src="iconRight"
      alt=""
    />
  </div>
</template>

<script>
 

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: 32,
    },
    icon: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    backgroundColor: {
      type: String,
      default: '#148783',
    },
    fontStyles: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      default: '',
    },
    animation: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const btnStyle = computed(() => {
      return {
        ...props.fontStyles,
        width: props.width ? props.width + 'px' : '100%',
        height: props.height + 'px',
        background: props.backgroundColor,
        border: `${
          props.borderColor ? `1px solid ${props.borderColor}` : 'none'
        }`,
        'justify-content': 'center',
      };
    });

    return {
      btnStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-c6c7c7: #c6c7c7;

.b-green-btn {
  @include inter(14px, 500, $--b-main-white-color);

  box-shadow: 0px 4px 12px rgba(42, 145, 141, 0.2);
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &__left-icon {
    margin-right: 10px;
  }
  &__right-icon {
    margin-left: 10px;
  }

  &.disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.animated {
    &:hover {
      &:before {
        content: '';
        display: block;
        position: absolute;
        opacity: 30%;
        left: -100%;
        width: 32px;
        height: 100%;
        background: $color-c6c7c7;
        filter: blur(6px);
        animation: blink 5s ease-in-out infinite;
      }
    }
  }
}
@keyframes blink {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}
</style>
