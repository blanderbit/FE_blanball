<template>
  <div>
    <NewVersionModal
      v-if="isNewVersionModalActive"
      @closeModal="closeNewVersionModal" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import NewVersionModal from './components/modals/newVersionModal/NewVersionModal.vue';

import { GeneralSocketWorkerInstance } from './workers/web-socket-worker';
import { createQueryStringFromObject } from './workers/utils-worker';
import { VersionDetectorWorker } from './workers/version-detector-worker';
import { API } from './workers/api-worker/api.worker';

import { WebSocketTypes } from './workers/web-socket-worker/web.socket.types';
import { ROUTES } from './router/router.const';

const router = useRouter();
const isNewVersionModalActive = ref(false);

const handleMessageGeneral = (instance) => {
  switch (instance.messageType) {
    case WebSocketTypes.ChangeMaintenance: {
      const maintenance = instance.data.maintenance.type;
      const ifCurrentRouteMaintenance = location.pathname.includes(
        ROUTES.WORKS.absolute
      );

      if (ifCurrentRouteMaintenance && maintenance) {
        return;
      } else if (!ifCurrentRouteMaintenance && maintenance) {
        const query = createQueryStringFromObject({
          redirectUrl: window.location.pathname,
        });

        return router.push(`${ROUTES.WORKS.absolute}${query}`);
      } else if (!maintenance && ifCurrentRouteMaintenance) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const redirectUrl = params.redirectUrl;

        const resolveRouter = redirectUrl && router.resolve(redirectUrl);
        if (
          !redirectUrl ||
          resolveRouter?.matched?.find((match) =>
            match?.path?.includes('pathMatch')
          )
        ) {
          return router.push(ROUTES.APPLICATION.EVENTS.absolute);
        }
        return router.push(redirectUrl);
      }
    }
  }
};

const VersionHandling = {
  handleDifferentVersion: () => {
    isNewVersionModalActive.value = true;
  },
  closeVersionModal: () => (isNewVersionModalActive.value = false),
};
try {
  API.NotificationService.getMaintenance().then((result) =>
    handleMessageGeneral({
      messageType: WebSocketTypes.ChangeMaintenance,
      data: {
        maintenance: {
          type: result.data.isMaintenance,
        },
      },
    })
  );
} catch {}

try {
  GeneralSocketWorkerInstance.registerCallback(handleMessageGeneral).connect();
} catch {}

VersionDetectorWorker(VersionHandling.handleDifferentVersion);

function closeNewVersionModal() {
  VersionHandling.closeVersionModal();
}
</script>
