<template>
  <div>
    <div
      class="b-place-detector"
      @click.stop="!disabled ? (activeModal = true) : null"
    >
      <img src="@images/location-point.svg" alt="" />
      <span class="b-place-name">{{ place?.place_name }}</span>
    </div>
    <teleport to="body">
      <ModalWindow v-if="activeModal" :isTitleShown="false">
        <div style="height: 400px">
          <position-map
            :coords="{ lat: place.lat, lng: place.lon }"
            disable-change-coords
          >
          </position-map>
        </div>
        <div class="d-flex justify-content-end align-items-center mt-3">
          <GreenBtn
            :text="$t('buttons.cancel')"
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
import { ref } from 'vue';

import ModalWindow from '@sharedComponents/modals/ModalWindow.vue';
import PositionMap from './PositionMap.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';

export default {
  name: 'PlaceDetectorModal',
  components: {
    ModalWindow,
    PositionMap,
    GreenBtn,
  },
  props: {
    place: {},
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const activeModal = ref(false);

    return {
      activeModal,
    };
  },
};
</script>

<style scoped lang="scss">
// SCSS variables for hex colors
$color-fafafa: #fafafa;

.b-place-detector {
  display: flex;
  background: $color-fafafa;
  padding: 0px 4px;
  margin-top: 4px;
  img {
    margin-right: 5px;
  }
  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: $--b-main-gray-color;
    border-radius: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
