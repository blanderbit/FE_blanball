import { createQueryStringFromObject } from '../workers/utils-worker';
import router from '../router';
import { ROUTES } from '../router/router.const';

export const handleChangeMaintenanceMessage = (instance) => {
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
};
