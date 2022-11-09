import { ROUTES } from "../../router";
import { finishSpinner } from "../loading-worker/loading.worker";
import { TokenWorker } from "../token-worker";
import { createQueryStringFromObject } from "../utils-worker";

const _createLoginPath = (redirectUrl) => {
  const query = createQueryStringFromObject({
    redirectUrl
  });

  return `${ROUTES.AUTHENTICATIONS.LOGIN.absolute}?${query}`
};

const _checkAsyncIsAdmin = async () => {
  return true;
  try {
    // await $api.AuthRequest.getAdmin();
    return true;
  } catch (e) {
    return false;
  }
};

const isUserAuthorized = async (e) => {
  // let loginned = AltesiaTokenWorkerPlugin.isToken() && await _checkAsyncIsAdmin();
  // return Promise.resolve(!!loginned);
  const token = !!TokenWorker.getToken();

  return Promise.resolve(token);
};

const isAuthorizedError = ({to, next}) => {
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