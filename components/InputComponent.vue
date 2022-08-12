<template>
  <div class="input">
    <div class="title" :style="{width: titleWidth + 'px'}">
      <span>{{title}}</span>
    </div>
    <input 
      :type="inputType" 
      :placeholder="placeholder"
      :style="{'padding-left': 10 + titleWidth + 'px'}"
    >
  </div>
</template>

<script>
export default {
  name: 'input-component',
  props: {
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    titleWidth: {
      type: Number,
      default: 108
    },
    inputType: {
      type: String,
      default: 'text'
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
    .title {
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
      padding-right: 5px;
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