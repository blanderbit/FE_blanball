<template>
  <div 
    class="dropdown"
    :style="dropdownStyle"
  >
    <div v-if="outsideTitle" class="outer-title">
      <span>{{mainTitle}}</span>
    </div>
    <div v-if="insideTitle" class="inner-title">
      <span>{{mainTitle}}</span>
    </div>
    <div class="drop-current" @click="toggleDropdown">
      <div class="current-name">{{currentValue}}</div>
      <div class="arrow-down">
        <img src="../assets/img/arrow-down.svg" alt="">
      </div>
      <ul v-if="isOpened">
        <li 
          v-for="item of options"
          :key="item.id"
          @click="setNewValue(item.value)"
        >
          {{item.value}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown-component',
  props: {
    insideTitle: {
      type: Boolean,
      default: false
    },
    outsideTitle: {
      type: Boolean,
      default: false
    },
    mainTitle: {
      type: String,
      default: 'Title'
    },
    options: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isOpened: false,
      currentValue: this.options[0].value
    }
  },
  computed: {
    dropdownStyle() {
      return {
        width: this.width ? this.width + 'px' : '100%'
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpened = !this.isOpened
    },
    setNewValue(val) {
      this.currentValue = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdown {
    width: 100%;
    height: 40px;
    border: 1px solid #DFDEED;
    border-radius: 6px;
    margin: 12px 0;
    display: flex;
    position: relative;
    .outer-title {
      width: 53px;
      height: 16px;
      background: linear-gradient(180deg, #F9F9FC 0%, #FFFFFF 100%);
      border-radius: 4px;
      position: absolute;
      top: -8px;
      left: 8px;
      z-index: 1;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #262541;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .inner-title {
      width: 108px;
      min-width: 108px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #575775;
      background: #fff;
      border-radius: 6px 0 0 6px;
      border-right: 1px solid #DFDEED;
      display: flex;
      align-items: center;
      span {
        text-align: left;
        padding-left: 12px;
      }
    }
    .drop-current {
      display: flex;
      flex-basis: 100%;
      padding: 0 12px;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      position: relative;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: #262541;
      background: #fff;
      ul {
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        background: #fff;
        border-right: 1px solid #DFDEED;
        border-left: 1px solid #DFDEED;
        border-bottom: 1px solid #DFDEED;
        li {
          list-style: none;
          padding: 2px 12px;
          &:hover {
            background: rgba(47, 32, 255, 0.795);
            color: #fff;
          }
        }
      }
    }
  }
</style>