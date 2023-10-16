import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';

import { ROUTES } from '../../router.const';
import { usersData } from '@routes/helpers/usersData';
import { hintsData } from '@routes/helpers/hintsData';


export const EVENTS_GET_ONE_ROUTE = {
  path: ROUTES.APPLICATION.EVENTS.GET_ONE.relative,
  name: ROUTES.APPLICATION.EVENTS.GET_ONE.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    usersData,
    hintsData,
    eventData: () => API.EventService.getOneEvent(to.params.id),
    eventRequestsToParticipationData: () =>
      API.EventService.requestsToParticipations(to.params.id),
  })),
  component: () => import('../../../views/application/events/EventInfo.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.getOneEvent',
    },
  },
};
