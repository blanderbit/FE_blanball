import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { ROUTES } from '../../router.const';
import { prepareEventUpdateData } from '@/utils/prepareEventUpdateData';
import { usersData } from '@/routes/helpers/usersData';
import { hintsData } from '@/routes/helpers/hintsData';

export const EVENTS_EDIT_ROUTE = {
  path: ROUTES.APPLICATION.EVENTS.EDIT.relative,
  name: ROUTES.APPLICATION.EVENTS.EDIT.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    action: () => 'EDIT',
    usersData,
    hintsData,
    eventData: async () => {
      return prepareEventUpdateData(to.params.id);
    },
  })),
  component: () => import('../../../views/application/events/Manage.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.editOneEvent',
    },
  },
};
