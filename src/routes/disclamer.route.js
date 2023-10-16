import { routerDataResolver } from '@workers/resolver-worker/reolver.worker';

export const DISCLAMER_ROUTE = {
  path: ROUTES.DISCLAMER.relative,
  name: ROUTES.DISCLAMER.name,
  beforeEnter: routerDataResolver.routeInterceptor(),
  component: () => import('../views/policy/Disclamer.vue'),
};
