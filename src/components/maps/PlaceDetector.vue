<template>
  <div>
    <div class="b-place-detector" @click="activeModal = true">
      <img src="../../assets/img/location-point.svg" alt="" />
      <p>{{ place?.place_name }}</p>
    </div>
    <teleport to="body">
      <ModalWindow v-if="activeModal" :isTitleShown="false">
        <Loading :is-loading="loading" />
        <div style="height: 400px">
          <position-map
            :coords="{ lat: place.lat, lng: place.lon }"
            @map-loaded="loading = false"
            disable-change-coords
          >
          </position-map>
        </div>
        <div class="d-flex justify-content-end align-items-center mt-3">
          <GreenBtn
            :text="'Скасувати'"
            :width="140"
            :height="40"
            @click-function="activeModal = false"
          />
        </div>
      </ModalWindow>
    </teleport>
  </div>
</template>

<script>
import ModalWindow from '../../components/ModalWindow.vue'
import PositionMap from '../../components/maps/PositionMap.vue'
import GreenBtn from '../../components/GreenBtn.vue'
import Loading from '../../workers/loading-worker/Loading.vue'

import { ref } from 'vue'

export default {
  name: 'PlaceDetector',
  components: {
    ModalWindow,
    PositionMap,
    GreenBtn,
    Loading,
  },
  props: {
    place: {},
  },
  setup() {
    const activeModal = ref(false)
    const loading = ref(true)

    return {
      activeModal,
      loading,
    }
  },
}
</script>

<style scoped lang="scss">
.b-place-detector {
  display: flex;
  background: #fafafa;
  padding: 0px 4px;
  margin-top: 4px;
  img {
    margin-right: 5px;
  }
  p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #575775;
    border-radius: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
