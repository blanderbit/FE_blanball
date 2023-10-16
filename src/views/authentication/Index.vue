<template>
  <div @contextmenu.prevent>
    <router-view />
    <ActionModal
      v-if="isUserSessionExpiredModalOpened"
      :modalData="sessionExpiredModalConfig"
      @closeModal="closeExpiredSessionModal"
    />
  </div>
</template>

<script>
import ActionModal from '@mainComponents/events/modals/ActionModal.vue';

import NoEditPermIcon from '@images/no-edit-perm-modal-icon.svg';

export default {
  name: 'index',
  components: {
    ActionModal,
  },
  setup() {
    const isUserSessionExpiredModalOpened = ref(false);
    const { t } = useI18n();

    const sessionExpiredModalConfig = computed(() => {
      return {
        title: t('modals.session_expired.title'),
        description: t('modals.session_expired.main-text'),
        image: NoEditPermIcon,
      };
    });

    const showExpiredSessionModal = () => {
      isUserSessionExpiredModalOpened.value = true;
    };

    const closeExpiredSessionModal = () => {
      isUserSessionExpiredModalOpened.value = false;
    };

    EventBusInstance.on('SessionExpired', showExpiredSessionModal);

    onBeforeUnmount(() => {
      EventBusInstance.off('SessionExpired', showExpiredSessionModal);
    });

    return {
      isUserSessionExpiredModalOpened,
      sessionExpiredModalConfig,
      closeExpiredSessionModal,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
