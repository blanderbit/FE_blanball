import { resolverFunctions } from '@workers/resolver-worker/resolver.functions';

import { resetUserData } from './logOut';

import router from '../router';

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
  EventBusInstance.emit('SessionExpired');
}
