<template>
  <div class="c-tabs">
    <div
      v-for="tab in tabs"
      :class="['c-tab', { active: tab.id === selectedTabId }]"
      @click="$emit('switchTab', tab.id)"
    >
      {{ tab.text }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { CONSTS } from '../../../consts';

export default {
  props: {
    selectedTabId: {
      type: Number,
      default: 1,
    },
  },
  emits: ['switchTab'],
  setup() {
    const { t } = useI18n();

    const mockData = computed(() => {
      return {
        tabs: CONSTS.scheduler.TABS_ENUM,
      };
    });

    const tabs = computed(() => {
      return [
        {
          id: mockData.value.tabs.MY_PLANNED,
          text: t('scheduler.my-planned-tab'),
        },
        {
          id: mockData.value.tabs.FRIENDS_PLANNED,
          text: t('scheduler.friends-planned-tab'),
        },
      ];
    });

    return {
      tabs,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-tabs {
  background: #efeff6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  border: 2px solid #efeff6;

  .c-tab {
    @include inter(13px, 400, $--b-main-gray-color);
    line-height: 20px;
    padding: 10px 0px;
    text-align: center;
    cursor: pointer;
    width: 50%;

    &.active {
      background: $--b-main-white-color;
      box-shadow: 1px 2px 5px 1px rgba(56, 56, 251, 0.08);
      border-radius: 4px;
      @include inter(13px, 500);
    }
  }
}
</style>
