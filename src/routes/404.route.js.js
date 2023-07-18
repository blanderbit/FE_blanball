import { routerDataResolver } from '@workers/resolver-worker/reolver.worker';

export const ROUTE_404 = {
  path: '/:pathMatch(.*)*',
  beforeEnter: routerDataResolver.routeInterceptor(),
  component: () => import('../views/404.vue'),
};
