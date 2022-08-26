<template>
  <div 
    class="input-wrapper"
    :style="inputWrapper"
  >
    <div v-if="outsideTitle" class="outer-title">
      <span>{{title}}</span>
    </div>
    <div 
      v-if="insideTitle" 
      class="inner-title" 
      :style="{width: titleWidth + 'px'}"
    >
      <span>{{title}}</span>
    </div>
    <div 
      v-if="hasIcon" 
      class="input-icon"
      @click="iconClickAction"
    >
      <img :src="rightIcon" alt="">
    </div>
    <input 
      :type="inputType" 
      :placeholder="placeholder"
      :style="inputStyle"
      :disabled="isDisabled"
      v-model="mainValue"
    >
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    icon:            {
      type: Array,
      default: () => []
    },
    hasIcon: {
      type: Boolean,
      default: false
    },
    insideTitle: {
      type: Boolean,
      default: false
    },
    outsideTitle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    titleWidth: {
      type: Number,
      default: 108
    },
    type: {
      type: Array,
      default: () => ['text']
    },
    height: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      mainValue: '',
      iconCount: 0,
      inputType: null
    }
  },
  computed: {
    inputStyle() {
      return {
        'padding-left': 10 + this.titleWidth + 'px',
        'padding-right': this.hasIcon ? '52px' : '10px'
      }
    },
    inputWrapper() {
      return {
        height: this.height ? this.height + 'px' : '100%'
      }
    },
    rightIcon() {
      return this.icon[this.iconCount]
    }
  },
  methods: {
    iconClickAction() {
      if (this.inputType === 'password') {
        this.iconCount = this.iconCount === 0 ? 1 : 0
        this.inputType = this.inputType === 'password' ? 'text' : 'password'
      } else {
        console.log('blaaaa')
        this.$emit('icon-click')
      }
    }
  },
  mounted() {
    this.inputType = this.type[0]
  }
}
</script>

<style lang="scss" scoped>
  .input-wrapper {
    width: 100%;
    border: 1px solid #DFDEED;
    position: relative;
    border-radius: 6px;
    .input-icon {
      display: flex;
      height: 100%;
      width: 48px;
      position: absolute;
      top: 0;
      right: 0;
      background: #fff;
      img {
        margin: auto;
      }
    }
    .outer-title {
      padding: 0px 4px;
      position: absolute;
      left: 8px;
      top: -8px;
      background: #FFFFFF;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
    .inner-title {
      display: table;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #575775;
      background: #fff;
      border-radius: 6px;
      span {
        display: table-cell;
        text-align: left;
        vertical-align: middle;
        border-right: 1px solid #DFDEED;
        padding-left: 12px;
      }
    }
    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      border-radius: 6px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type=number] {
        -moz-appearance: textfield;
      }
    }
  }
</style>