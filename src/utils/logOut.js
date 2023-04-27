import { accessToken, refreshToken } from '../workers/token-worker';
import { ROUTES } from '../router/router.const';
import router from '../router';
import { useUserDataStore } from '../stores/userData';

import { API } from '../workers/api-worker/api.worker';

const userStore = useUserDataStore();

export const logOut = async () => {
    await API.AuthorizationService.Logout({
        refresh: refreshToken.getToken()
    });
    router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute);
    userStore.$reset();
    accessToken.clearToken();
    refreshToken.clearToken();
}