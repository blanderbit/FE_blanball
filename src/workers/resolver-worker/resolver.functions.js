import { finishSpinner } from '../loading-worker/loading.worker';
import { accessToken } from '../token-worker';
import { createQueryStringFromObject } from '../utils-worker';
import { ROUTES } from '../../router/router.const';

const _createLoginPath = (redirectUrl) => {
  const query = createQueryStringFromObject({
    redirectUrl,
  });

  return `${ROUTES.AUTHENTICATIONS.LOGIN.absolute}?${query}`;
};

const isUserAuthorized = async () =>
  !!accessToken.getToken();

const isAuthorizedError = ({ to, next }) => {
  finishSpinner();
  return next(_createLoginPath(to.fullPath));
};

const isResolveDataError = async (error) => {
  // TODO remove router import on every function call
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
