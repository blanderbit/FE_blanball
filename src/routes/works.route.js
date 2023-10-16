import { routerDataResolver } from '@workers/resolver-worker/reolver.worker';


export const WORKS_ROUTE = {
  path: ROUTES.WORKS.relative,
  name: ROUTES.WORKS.name,
  beforeEnter: routerDataResolver.routeInterceptor(),
  component: () => import('../views/application/Works.vue'),
};
