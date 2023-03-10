<template>
  <div class="b-radio-btns">
    <input type="radio" id="men" :value="'Man'" v-model="genderRadio" />
    <label for="men">
      <img src="../../../assets/img/male-icon.svg" alt="" />
      {{ $t('users.men') }}
    </label>

    <input type="radio" id="women" :value="'Woman'" v-model="genderRadio" />
    <label for="women">
      <img src="../../../assets/img/female-icon.svg" alt="" />
      {{ $t('users.women') }}
    </label>

    <input type="radio" id="all" :value="'All'" v-model="genderRadio" />
    <label for="all">
      <img src="../../../assets/img/unisex.svg" alt="" />
      {{ $t('users.all') }}</label
    >
  </div>
</template>

<script>
import { watch, ref } from 'vue'

export default {
  name: 'RadioGenderBox',
  props: {
    gender: {
      type: String,
      default: '',
    },
  },
  emits: ['update:gender'],
  setup(props, { emit }) {
    const genderRadio = ref(props.gender)

    watch(
      () => props.gender,
      (newData) => {
        genderRadio.value = newData
      }
    )
    watch(
      () => genderRadio.value,
      () => {
        emit('update:gender', genderRadio.value)
      }
    )

    return {
      genderRadio,
    }
  },
}
</script>

<style lang="scss" scoped>


// SCSS variables for hex colors
 $color-dfdeed: #dfdeed;
 $color-148581: #148581;


.b-radio-btns {
  display: flex;
  input[type='radio'] {
    display: none;
    + label {
      padding: 8px 6px;
      border: 1px solid $color-dfdeed;
      border-radius: 6px;
      margin-right: 8px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: $--b-main-gray-color;
      min-width: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      img {
        margin-right: 6px;
      }
    }
    &:checked + label {
      border: 1px solid $color-148581;
      color: $color-148581;
    }
  }
}
</style>
