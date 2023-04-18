import { TokenWorker } from '../workers/token-worker';
import { ROUTES } from '../router/router.const';
import router from '../router';
import { useUserDataStore } from '../stores/userData';


const userStore = useUserDataStore();

export const logOut = () => {
    router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute);
    userStore.$reset();
    TokenWorker.clearToken();
}