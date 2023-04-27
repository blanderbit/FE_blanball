import { accessToken, refreshToken } from '../workers/token-worker';
import { ROUTES } from '../router/router.const';
import router from '../router';
import pinia from '../plugins/pinia';
import { useUserDataStore } from '../stores/userData';

import { API } from '../workers/api-worker/api.worker';

const userStore = useUserDataStore(pinia);

export const resetUserData = () => {
  userStore.$reset();
  accessToken.clearToken();
  refreshToken.clearToken();
}

export const logOut = async () => {
  try {
    await API.AuthorizationService.Logout({
      refresh: refreshToken.getToken(),
    });
  } catch {}
  router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute);
  resetUserData();
};
