<template>
  <div class="dropdown">
    <div class="title">
      <span>Гендер</span>
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
import { ref } from 'vue'

export default {
  name: 'dropdown-component',
  setup() {
    const isOpened = ref(false)
    const options = [
      {
        id: 0,
        value: 'Жінка'
      },
      {
        id: 1,
        value: 'Чоловик'
      },
    ]
    const currentValue = ref(options[0].value)
    const toggleDropdown = () => {
      isOpened.value = !isOpened.value
    }
    const setNewValue = val => {
      console.log(val)
      currentValue.value = val
    }

    return {
      options,
      currentValue,
      isOpened,
      toggleDropdown,
      setNewValue
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
    .title {
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