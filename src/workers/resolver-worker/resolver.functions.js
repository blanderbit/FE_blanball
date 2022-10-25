// import { AltesiaTokenWorkerPlugin } from "../plugins/token.plugin";
// import { $api } from "../api";
// import { finishSpinner } from "../../packages/blanball-loading-worker";
import { ROUTES } from "../../router";
import { finishSpinner } from "../loading-worker/loading.worker";
import { TokenWorker } from "../token-worker";

const $createQuery = (objQuery) => Object
    .keys(objQuery)
    .map((key) => `${key}=${objQuery[key]}`)
    .join('&');

const _createLoginPath = (redirectUrl) => {
    const query = $createQuery({
        redirectUrl
    });

    return `${ROUTES.AUTHENTICATIONS.LOGIN.absolute}?${query}`
};

const _checkAsyncIsAdmin = async () => {
    return true;
    try {
        // await $api.AuthRequest.getAdmin();
        return true;
    } catch ( e ) {
        return false;
    }
};

const isUserAuthorized = async (e) => {
    // let loginned = AltesiaTokenWorkerPlugin.isToken() && await _checkAsyncIsAdmin();
    // return Promise.resolve(!!loginned);
    const token = !!TokenWorker.getToken();

    return Promise.resolve(token);
};

const isAuthorizedError = ({ to, next }) => {
    return next(_createLoginPath(to.fullPath));
};

const isResolveDataError = async (error) => {
    // TOAST show
    finishSpinner()
    console.log('TOAST_SHOWED_BY_ERROR', error);
};

export const resolverFunctions = {
    isUserAuthorized,
    isAuthorizedError,
    isResolveDataError,
    _createLoginPath
};