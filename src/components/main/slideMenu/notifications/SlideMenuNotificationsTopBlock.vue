<template>
  <div class="b-slide-menu-notifications-top-block">
    <div class="b-slide-menu-manage-buttons">
      <WhiteBtn
        v-if="!selectedNotificationsCount"
        :text="'slide_menu.read-all'"
        :isBorder="false"
        :mainColor="'#575775'"
        :fontStyles="{ 'font-size': '12px' }"
        :icon="ReadAllNotificationsIcon"
        :height="32"
        :width="120"
        @click="readAllNotifications"
      />

      <div v-else class="b-selected-elements__count">
        <img src="@images/cross.svg" alt="" @click="clearSelectedList" />
        <span>{{ selectedNotificationsCount }}</span>
        <div
          v-if="selectedNotificationsCount >= 100"
          class="b-selected-elements__max"
        >
          (макс.)
        </div>
      </div>

      <WhiteBtn
        :text="
          !isSelectable
            ? 'slide_menu.notifications-manage'
            : 'slide_menu.cancel-manage'
        "
        :isBorder="true"
        :borderColor="'#DFDEED'"
        :mainColor="'#575775'"
        :fontStyles="{ 'font-size': '12px' }"
        :rightIcon="!isSelectable ? ManageNotificationsIcon : null"
        :height="32"
        :width="!isSelectable ? 205 : 170"
        @click="cancelSelectable"
      />
    </div>

    <div
      v-if="selectedNotificationsCount"
      class="b-manage-selected-notifications-block"
    >
      <WhiteBtn
        text="slide_menu.mark-as-viewed"
        :isBorder="false"
        :mainColor="'#575775'"
        :fontStyles="{ 'font-size': '12px' }"
        :icon="ReadAllNotificationsIcon"
        :height="32"
        :width="170"
        @click="readAllNotifications"
      />
      <WhiteBtn
        text="buttons.delete"
        :isBorder="true"
        :borderColor="'#DFDEED'"
        :mainColor="'#262541'"
        :fontStyles="{ 'font-size': '12px' }"
        :icon="DeleteNotificationsIcon"
        :height="32"
        :width="110"
        @click="$emit('deleteSelected')"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import WhiteBtn from '@/components/shared/button/WhiteBtn.vue';

import { API } from '@/workers/api-worker/api.worker';

import ReadAllNotificationsIcon from '@images/notifications/double-check.svg';
import ManageNotificationsIcon from '@images/dots.svg';
import DeleteNotificationsIcon from '@images/notifications/trash.svg';

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

const isSelectable = computed(() => {
  return props.config.activeTab?.selectable;
});

const selectedNotificationsCount = computed(() => {
  return props.config.activeTab?.records.selectedList.length;
});

const clearSelectedList = () => {
  props.config.activeTab.clearSelectedList();
};

const readAllNotifications = () => {
  API.NotificationService.readAllMyNotifications().then(() => {
    if (
      props.config.activeTab.uniqueName ===
        'notification.slideConfig.not_read_notifications' &&
      props.config.activeTab.paginationElemenets.length
    ) {
      props.config.activeTab.paginationClearData();
      props.config.slideConfig.updateBadgesCountFn();
    }
  });
};

const cancelSelectable = () => {
  props.config.activeTab.selectable = !props.config.activeTab.selectable;
  clearSelectedList();
  props.config.activeTab.load;
};
</script>

<style lang="scss" scoped>
.b-slide-menu-manage-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.b-manage-selected-notifications-block {
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
}
.b-selected-elements__count {
  span {
    font-family: 'Inter';
    background: $--b-main-gray-color;
    border-radius: 100px;
    padding: 0px 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    width: fit-content;
    height: 20px;
    min-width: 20px;
    color: $--b-main-white-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    cursor: pointer;
  }
}
</style>
