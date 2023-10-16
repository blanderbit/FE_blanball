import { routerDataResolver } from '@workers/resolver-worker/reolver.worker';

export const LOGIN_ROUTE = {
  path: '/',
  beforeEnter: routerDataResolver.routeInterceptor(),
  redirect: ROUTES.AUTHENTICATIONS.LOGIN.absolute,
};
