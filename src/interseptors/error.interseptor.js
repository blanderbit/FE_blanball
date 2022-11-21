import { TokenWorker } from "../workers/token-worker";
import router, { ROUTES } from "../router";
import { resolverFunctions } from "../workers/resolver-worker/resolver.functions";

export const ErrorInterceptor = (error) => {
    const getJsonErrorData = error.toJSON();
    error = error?.response?.data || getJsonErrorData;

    if (error?.status === 401 || getJsonErrorData?.status === 401) {
        const findCurRouteFromList = window.location.pathname.includes('application');
        TokenWorker.clearToken();

        router.push(
            findCurRouteFromList
                ? resolverFunctions._createLoginPath(window.location.pathname)
                : ROUTES.AUTHENTICATIONS.LOGIN.absolute
        );
    }

    return  Promise.reject(error)
};