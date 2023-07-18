import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { ROUTES } from '../../router.const';
import { MY_EVENTS_TOPICAL_ROUTE } from './my.events.topical.route';
import { MY_EVENTS_FINISHED_ROUTE } from './my.events.finished.route';

export const MY_EVENTS_INDEX_ROUTE = {
  path: ROUTES.APPLICATION.MY_EVENTS.index.relative,
  name: ROUTES.APPLICATION.MY_EVENTS.index.name,
  beforeEnter: routerAuthResolver.routeInterceptor(),
  redirect: ROUTES.APPLICATION.MY_EVENTS.TOPICAL.absolute,
  children: [MY_EVENTS_TOPICAL_ROUTE, MY_EVENTS_FINISHED_ROUTE],
};
