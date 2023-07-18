import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { ROUTES } from '../../router.const';
import { usersData } from '@/routes/helpers/usersData';
import { hintsData } from '@/routes/helpers/hintsData';

export const EVENTS_CREATE_ROUTE = {
  path: ROUTES.APPLICATION.EVENTS.CREATE.relative,
  name: ROUTES.APPLICATION.EVENTS.CREATE.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    action: () => 'CREATE',
    usersData,
    hintsData,
  })),
  component: () => import('../../../views/application/events/Manage.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.createOneEvent',
    },
  },
};
