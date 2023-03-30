import { finishSpinner } from '../loading-worker/loading.worker';
import { TokenWorker } from '../token-worker';
import { createQueryStringFromObject } from '../utils-worker';
import { ROUTES } from '../../router/router.const';

const _createLoginPath = (redirectUrl) => {
  const query = createQueryStringFromObject({
    redirectUrl,
  });

  return `${ROUTES.AUTHENTICATIONS.LOGIN.absolute}?${query}`;
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

const isUserAuthorized = async () =>
  !!TokenWorker.getToken() && _checkAsyncIsAdmin();

const isAuthorizedError = ({ to, next }) => {
  finishSpinner();
  return next(_createLoginPath(to.fullPath));
};

const isResolveDataError = async (error) => {
  if (error.errorDetails.code === 404) {
    import('../../router').then((router) => {
      return router.default.push('/404')
    })
  }
  finishSpinner();
};

export const resolverFunctions = {
  isUserAuthorized,
  isAuthorizedError,
  isResolveDataError,
  _createLoginPath,
};
