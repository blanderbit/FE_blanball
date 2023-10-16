import { routerDataResolver } from '@workers/resolver-worker/reolver.worker';


export const PRIVACY_POLICY_ROUTE = {
  path: ROUTES.PRIVACY_POLICY.relative,
  name: ROUTES.PRIVACY_POLICY.name,
  beforeEnter: routerDataResolver.routeInterceptor(),
  component: () => import('../views/policy/PrivacyPolicy.vue'),
};
