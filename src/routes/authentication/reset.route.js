import { routerResolverByLoginPage } from '@workers/resolver-worker/reolver.worker';

export const RESET_ROUTE = {
  path: ROUTES.AUTHENTICATIONS.RESET.relative,
  name: ROUTES.AUTHENTICATIONS.RESET.name,
  beforeEnter: routerResolverByLoginPage,
  component: () => import('../../views/authentication/Reset.vue'),
};
