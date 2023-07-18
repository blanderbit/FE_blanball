import { routerDataResolver } from '@workers/resolver-worker/reolver.worker';
import { ROUTES } from './router.const';

export const LOGIN_ROUTE = {
  path: '/',
  beforeEnter: routerDataResolver.routeInterceptor(),
  redirect: ROUTES.AUTHENTICATIONS.LOGIN.absolute,
};
