import router from '../router';

import { API } from '@workers/api-worker/api.worker';

import { ROUTES } from '../routes/router.const';

router.beforeEach(async (to, from, next) => {
  if (to.name === ROUTES.WORKS.name) {
    const response = await API.NotificationService.getMaintenance();
    if (response.data.isMaintenance) {
      next();
    } else {
      next(ROUTES.APPLICATION.EVENTS.absolute);
    }
  } else if (to.name === ROUTES.APPLICATION.VERSIONS.name) {
    next();
  } else {
    next();
  }
});
