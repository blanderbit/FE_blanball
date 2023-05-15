<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

import { GeneralSocketWorkerInstance } from './workers/web-socket-worker';
import { API } from './workers/api-worker/api.worker';
import { setHeightVH } from './utils/calcHeight';
import { handleChangeMaintenanceMessage } from './utils/handleChangeMaintenanceMessage';

import { WebSocketTypes } from './workers/web-socket-worker/web.socket.types';

onMounted(() => {
  window.addEventListener('resize', setHeightVH);
  setHeightVH();
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', setHeightVH);
});

const handleMessageGeneral = (instance) => {
  switch (instance.messageType) {
    case WebSocketTypes.ChangeMaintenance: {
      handleChangeMaintenanceMessage(instance);
    }
  }
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
</script>
