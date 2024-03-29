import { API } from '../workers/api-worker/api.worker';
import { refreshToken, accessToken } from '../workers/token-worker';
import { resolverFunctions } from '../workers/resolver-worker/resolver.functions';
import { useTokensStore } from '../stores/tokens';
import { BlanballEventBus } from '../workers/event-bus-worker';
import { resetUserData } from './logOut';
import { AuthWebSocketWorkerInstance } from '../workers/web-socket-worker';

import pinia from '../plugins/pinia';
import router from '../router';

import { ROUTES } from '../router/router.const';

const tokensStore = useTokensStore(pinia);

export async function refreshTokens() {
  let isRefreshSuccess;

  tokensStore.$patch({
    isTokensRefreshing: true,
  });
  AuthWebSocketWorkerInstance?.disconnect();

  try {
    const response = await API.AuthorizationService.refreshTokens({
      refresh: refreshToken.getToken(),
    });
    accessToken.clearToken();
    refreshToken.clearToken();
    accessToken.setToken(
      response.data.access,
      tokensStore.tokenSettedStoreType
    );
    refreshToken.setToken(
      response.data.refresh,
      tokensStore.tokenSettedStoreType
    );

    AuthWebSocketWorkerInstance.connect({
      token: accessToken.getToken(),
    });
    tokensStore.$patch({
      isTokensRefreshing: false,
    });

    isRefreshSuccess = true;
  } catch {
    const findCurRouteFromList = window.location.pathname.includes(
      ROUTES.APPLICATION.name
    );
    tokensStore.$patch({
      isTokensRefreshing: false,
    });

    resetUserData();
    await router.push(
      findCurRouteFromList
        ? resolverFunctions._createLoginPath(window.location.pathname)
        : ROUTES.AUTHENTICATIONS.LOGIN.absolute
    );
    BlanballEventBus.emit('SessionExpired');

    isRefreshSuccess = false;
  } finally {
    return isRefreshSuccess;
  }
}
