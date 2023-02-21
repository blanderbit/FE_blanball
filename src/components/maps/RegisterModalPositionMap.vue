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
      <Loading :is-loading="loading" />
      <div class="b-modal-position__block b-modal-position__map">
        <position-map
          @map-loaded="loading = false"
          :coords="coords"
          @update:coords="updateCoords"
        ></position-map>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <GreenBtn
          :text="'Зберегти'"
          :width="140"
          :height="40"
          @click-function="save(data)"
        />
      </div>
    </ModalWindow>
  </div>
</template>

<script>
import { ref } from 'vue'

import PositionMap from './PositionMap.vue'
import ModalWindow from '../ModalWindows/ModalWindow.vue'
import GreenBtn from '../../components/GreenBtn.vue'
import Loading from '../../workers/loading-worker/Loading.vue'

export default {
  components: {
    ModalWindow,
    PositionMap,
    GreenBtn,
    Loading,
  },
  props: {
    modelValue: Object,
    default: () => ({}),
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const coords = ref({})
    const activeModal = ref(false)
    function updateCoords(e) {
      coords.value = {
        lat: e.lat,
        lng: e.lng,
      }
    }

    return {
      async save(data) {
        activeModal.value = false
      },
      coords,
      updateCoords,
      activeModal,
    }
  },
}
</script>

<style scoped lang="scss">
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
  color: #575775;
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
  color: #262541;
}

.b-modal-position__map-optional{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #575775;
  background: #EFEFF6;
  border-radius: 4px;
  padding: 0px 2px;
}

.b-modal-position__map-main {
  display: flex;
  gap: 8px;
}
</style>
