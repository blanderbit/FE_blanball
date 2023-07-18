import { routerResolverByLoginPage } from '@/workers/resolver-worker/reolver.worker';
import { ROUTES } from '../router.const';
import { REGISTER_ROUTE } from './register.route';
import { LOGIN_PAGE_ROUTE } from './login.page.route';
import { RESET_ROUTE } from './reset.route';

export const AUTHENTICATION_INDEX_ROUTE = {
  path: ROUTES.AUTHENTICATIONS.index.path,
  name: ROUTES.AUTHENTICATIONS.index.name,
  beforeEnter: routerResolverByLoginPage,
  component: () => import('../../views/authentication/Index.vue'),
  redirect: ROUTES.AUTHENTICATIONS.LOGIN.absolute,
  children: [REGISTER_ROUTE, LOGIN_PAGE_ROUTE, RESET_ROUTE],
};
