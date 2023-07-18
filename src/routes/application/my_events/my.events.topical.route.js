import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { transpileInterseptorQueryToConfig } from '@/workers/api-worker/http/filter/filter.utils';
import { filterConfigForEvents } from '@/workers/api-worker/http/filter/filter.config';
import { API } from '@/workers/api-worker/api.worker';
import { ROUTES } from '../../router.const';
import { usersData } from '@/routes/helpers/usersData';
import { hintsData } from '@/routes/helpers/hintsData';

export const MY_EVENTS_TOPICAL_ROUTE = {
  path: ROUTES.APPLICATION.MY_EVENTS.TOPICAL.absolute,
  name: ROUTES.APPLICATION.MY_EVENTS.TOPICAL.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    eventData: () =>
      API.EventService.getMyTopicalEvents(
        transpileInterseptorQueryToConfig(filterConfigForEvents, to)
      ),
    usersData,
    hintsData,
  })),
  component: () => import('../../../views/application/events/MyEvents.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.myEvents',
    },
    tabId: 1,
  },
};
