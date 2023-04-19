<template>
  <div class="b-modal-position__map-wrapper">
    <div class="b-modal-position__map-main" @click="activeModal = true">
      <span class="b-modal-position__map-title">
        {{ $t('register.select-on-map') }}
      </span>
      <div>
        <img src="../../assets/img/location-point.svg" />
      </div>
    </div>
    <span class="b-modal-position__map-optional">
      {{ $t('register.optionally') }}
    </span>

    <ModalWindow v-show="activeModal" :isTitleShown="false">
      <loader :is-loading="loading" />
      <div class="b-modal-position__block b-modal-position__map">
        <position-map
          @map-loaded="loading = false"
          :coords="coords"
          @update:coords="updateCoords"
        ></position-map>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <GreenBtn
          :text="$t('buttons.save')"
          :width="140"
          :height="40"
          @click-function="save(data)"
        />
      </div>
    </ModalWindow>
  </div>
</template>

<script>
import { ref } from 'vue';

import PositionMap from './PositionMap.vue';
import ModalWindow from '../ModalWindows/ModalWindow.vue';
import GreenBtn from '../shared/button/GreenBtn.vue';
import loader from '../shared/loader/Loader.vue';

export default {
  components: {
    ModalWindow,
    PositionMap,
    GreenBtn,
    loader,
  },
  props: {
    modelValue: Object,
    default: () => ({}),
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const coords = ref({});
    const activeModal = ref(false);
    function updateCoords(e) {
      coords.value = {
        lat: e.lat,
        lng: e.lng,
      };
    }

    return {
      async save(data) {
        activeModal.value = false;
      },
      coords,
      updateCoords,
      activeModal,
    };
  },
};
</script>

<style scoped lang="scss">
// SCSS variables for hex colors
$color-efeff6: #efeff6;

.b-modal-position__block {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

.b-modal-position__map {
  height: 300px;
}

.b-modal-position__clear {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: $--b-main-gray-color;
}

.b-modal-position__map-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.b-modal-position__map-title {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: $--b-main-black-color;
}

.b-modal-position__map-optional {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: $--b-main-gray-color;
  background: $color-efeff6;
  border-radius: 4px;
  padding: 0px 2px;
}

.b-modal-position__map-main {
  display: flex;
  gap: 8px;
}
</style>
