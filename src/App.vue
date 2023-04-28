<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { GeneralSocketWorkerInstance } from './workers/web-socket-worker';
import { createQueryStringFromObject } from './workers/utils-worker';
import { API } from './workers/api-worker/api.worker';

import { WebSocketTypes } from './workers/web-socket-worker/web.socket.types';
import { ROUTES } from './router/router.const';

const router = useRouter();

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
