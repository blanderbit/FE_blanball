import { routerResolverByLoginPage } from '@workers/resolver-worker/reolver.worker';

export const LOGIN_PAGE_ROUTE = {
  path: ROUTES.AUTHENTICATIONS.LOGIN.relative,
  name: ROUTES.AUTHENTICATIONS.LOGIN.name,
  beforeEnter: routerResolverByLoginPage,
  component: () => import('../../views/authentication/Login.vue'),
  meta: {
    noGuards: true,
  },
};
