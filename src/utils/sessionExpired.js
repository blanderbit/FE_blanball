import { resolverFunctions } from '@workers/resolver-worker/resolver.functions';
import { BlanballEventBus } from '@workers/event-bus-worker';
import { resetUserData } from './logOut';

import router from '../router';

import { ROUTES } from '../routes/router.const';

export async function sessionExpired() {
  const findCurRouteFromList = window.location.pathname.includes(
    ROUTES.APPLICATION.name
  );
  resetUserData();
  await router.push(
    findCurRouteFromList
      ? resolverFunctions._createLoginPath(window.location.pathname)
      : ROUTES.AUTHENTICATIONS.LOGIN.absolute
  );
  BlanballEventBus.emit('SessionExpired');
}
