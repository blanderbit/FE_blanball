<template>
  <div class="input">
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
    >
      <img :src="icon" alt="">
    </div>
    <input 
      :type="inputType" 
      :placeholder="placeholder"
      :style="inputStyle"
    >
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    icon: {
      type: String,
      default: ''
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
    inputType: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    inputStyle() {
      return {
        'padding-left': 10 + this.titleWidth + 'px',
        'padding-right': this.hasIcon ? '52px' : '5px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .input {
    width: 100%;
    height: 40px;
    border: 1px solid #DFDEED;
    position: relative;
    border-radius: 6px;
    margin: 12px 0;
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