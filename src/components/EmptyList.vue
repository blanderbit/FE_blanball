<template>
  <div class="b-empty-list d-flex justify-content-between">
    <div class="b-empty-list__left-side">
      <div class="b-empty-list__titles-block">
        <div class="b-empty-list__title">
        {{ title }}
      </div>
      <div class="b-empty-list__description">
        {{ description }}
      </div>
      </div>
      <div v-if="buttonText" class="b-empty-list__actions">
        <GreenBtn
          :width="170"
          :height="40"
          :text="buttonText"/>
      </div>
    </div>
    <div class="b-empty-list__right-side">
      <img :src="imageLink" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import GreenBtn from './GreenBtn.vue'

import EmptyNotificationsSvg from '../assets/img/no-records/empty-notifications.svg'
import NoData from '../assets/img/no-records/no-data.svg'

export default {
  name: 'EmptyList',
  props: {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    buttonText: {
      type: String,
      default: ''
    },
    isNotification: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  components: {
    GreenBtn
  },
  setup({ isNotification }) {
    const imageLink = computed(() => {
      return isNotification ? EmptyNotificationsSvg : NoData
    })

    return {
      imageLink,
    }
  },
}
</script>

<style scoped lang="scss">

// SCSS variables for hex colors
 $color-f9f9fc: #f9f9fc;


.b-empty-list {
  padding: 20px;
  background: $color-f9f9fc;
  border-radius: 12px;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  .b-empty-list__left-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }

  .b-empty-list__actions {
    margin-bottom: 10px;
  }

  &__title {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
    color: $--b-main-black-color;
    margin-bottom: 12px;
  }
  &__description {
    @include inter(12px, 500, $--b-main-gray-color);
    line-height: 20px;
  }
}
</style>
