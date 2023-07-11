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
import { ref, computed, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

import ActionModal from '../../components/main/events/modals/ActionModal.vue';

import { BlanballEventBus } from '../../workers/event-bus-worker';

import NoEditPermIcon from '../../assets/img/no-edit-perm-modal-icon.svg';

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

    BlanballEventBus.on('SessionExpired', () => {
      showExpiredSessionModal();
    });

    onBeforeUnmount(() => {
      BlanballEventBus.off('SessionExpired');
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
