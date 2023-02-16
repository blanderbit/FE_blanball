<template>
  <div
    class="b-button-details__filters"
    :class="{
      'b-button-details__filters': active,
    }"
    @click="$emit('update:active', !active)"
  >
    <img class="b-main-search__set-filter" :src="icon" alt="" />
  </div>
</template>

<script>
import { computed } from 'vue'

import CrossIcon from '../../../assets/img/cross.svg'
import SettingsIcon from '../../../assets/img/set-filter.svg'

export default {
  name: 'ButtonDetailsFilters',
  emits: ['update:active'],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const icon = computed(() => {
      return props.active ? CrossIcon : SettingsIcon
    })

    return {
      icon,
    }
  },
}
</script>

<style scoped lang="scss">
.b-button-details__filters {
  width: 32px;
  min-width: 32px;
  height: 32px;
  background: #efeff6;
  border-radius: 6px;
  display: flex;
  margin-right: 8px;
  cursor: pointer;
  img {
    margin: auto;
  }
}
</style>
