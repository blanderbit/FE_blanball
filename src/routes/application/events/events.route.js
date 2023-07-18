import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { API } from '@/workers/api-worker/api.worker';
import { ROUTES } from '../../router.const';
import { transpileInterseptorQueryToConfig } from '@/workers/api-worker/http/filter/filter.utils';
import { filterConfigForEvents } from '@/workers/api-worker/http/filter/filter.config';
import { usersData } from '@/routes/helpers/usersData';
import { hintsData } from '@/routes/helpers/hintsData';

export const EVENTS_ROUTE = {
  path: ROUTES.APPLICATION.EVENTS.relative,
  name: ROUTES.APPLICATION.EVENTS.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    eventData: () =>
      API.EventService.getAllEvents(
        transpileInterseptorQueryToConfig(filterConfigForEvents, to)
      ),
    usersData,
    hintsData,
  })),
  component: () => import('../../../views/application/events/Index.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.events',
    },
  },
};