import { routerResolverByLoginPage } from '@workers/resolver-worker/reolver.worker';


export const REGISTER_ROUTE = {
  path: ROUTES.AUTHENTICATIONS.REGISTER.relative,
  name: ROUTES.AUTHENTICATIONS.REGISTER.name,
  beforeEnter: routerResolverByLoginPage,
  component: () => import('../../views/authentication/Register.vue'),
};
