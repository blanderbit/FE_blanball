import { API } from '../workers/api-worker/api.worker';
import { refreshToken, accessToken } from '../workers/token-worker';
import { resolverFunctions } from '../workers/resolver-worker/resolver.functions';
import { useRefreshTokenStore } from '../stores/refresh';
import { resetUserData } from './logOut';

import pinia from '../plugins/pinia';
import router from '../router';

import CONSTS from '../consts';
import { ROUTES } from '../router/router.const';

const refreshTokenStore = useRefreshTokenStore(pinia);

export async function refreshTokens() {
  refreshTokenStore.$patch({
    isTokensRefreshing: true,
  });

  try {
    const response = await API.AuthorizationService.refreshTokens({
      refresh: refreshToken.getToken(),
    });

    accessToken.setToken(response.data.access, CONSTS.storages.LOCAL_STORAGE);
    refreshToken.setToken(response.data.refresh, CONSTS.storages.LOCAL_STORAGE);
  } catch (e) {
    const findCurRouteFromList =
      window.location.pathname.includes('application');

    router.push(
      findCurRouteFromList
        ? resolverFunctions._createLoginPath(window.location.pathname)
        : ROUTES.AUTHENTICATIONS.LOGIN.absolute
    );
    resetUserData();
  }
}
