import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';

import { usersData } from '@routes/helpers/usersData';
import { hintsData } from '@routes/helpers/hintsData';
import { ukraineCitiesData } from '@routes/helpers/ukraineCitiesData';

export const EVENTS_CREATE_ROUTE = {
  path: ROUTES.APPLICATION.EVENTS.CREATE.relative,
  name: ROUTES.APPLICATION.EVENTS.CREATE.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    action: () => 'CREATE',
    usersData,
    hintsData,
    ukraineCitiesData,
  })),
  component: () => import('../../../views/application/events/Manage.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.createOneEvent',
    },
  },
};
