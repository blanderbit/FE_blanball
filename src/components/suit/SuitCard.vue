<template>
 <div class="b-suit-card__wrapper d-flex justify-content-between">
   <div class="b-suit-card" v-for="item in values" :style="{
      width: `${100 / values.length }%`
     }">
     <div class="b-suit-card__name">
       {{item.name}}
     </div>
     <div class="b-suit-card__color">
       <ColorPicker :degree="degree" :gradients="grad" @colorChanged="triggerChanged"/>
     </div>
   </div>
 </div>
</template>

<script>

  import ColorPicker from './Colorpicker.vue';
  import {ref} from 'vue';

  export default {
    name: "SuitCard",
    components: {
      ColorPicker
    },
    props: {
      values: {
        type: Array,
        default: () => ([]),
      },
    },
    setup() {
      const degree = ref(90);
      const grad = ref([
        {id: 0, percent: 10, color: {r: 255, g: 10, b: 20, a: 1}},
        {id: 1, percent: 100, color: {r: 59, g: 50, b: 240, a: 1}},
      ]);

      function triggerChanged(color) {
        console.log('current color:', color)
      }

      return {
        grad,
        degree,
        triggerChanged,
      }
    }
  }
</script>

<style scoped lang="scss">
  .b-suit-card {
    margin-right: 8px;
    &:last-child {
      margin: 0;
    }
    &__wrapper {
      padding: 8px 8px 12px;
      background: #EFEFF6;
      border-radius: 4px;
    }

    &__name {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
      margin-bottom: 4px;
    }

    &__color {
      padding: 6px 12px;
      background: #FFFFFF;
      border: 1px solid #F0F0F4;
      border-radius: 6px;
    }

    ::v-deep {
      .cbtn {
        padding: 0;
        width: 12px;
        height: 12px;
        border: none;
        border-radius: 2px;

      }
    }
  }
</style>