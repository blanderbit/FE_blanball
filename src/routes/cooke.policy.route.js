import { routerDataResolver } from '@workers/resolver-worker/reolver.worker';


export const COOKIE_POLICY_ROUTE = {
  path: ROUTES.COOKIE_POLICY.relative,
  name: ROUTES.COOKIE_POLICY.name,
  beforeEnter: routerDataResolver.routeInterceptor(),
  component: () => import('../views/policy/CookiePolicy.vue'),
};
