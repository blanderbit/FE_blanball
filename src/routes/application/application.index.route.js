import { ROUTES } from '../router.const';
import { routerAuthResolver } from '@/workers/resolver-worker/reolver.worker';
import { VERSIONS_ROUTE } from './versions.route';
import { CHAT_ROUTE } from './chat/chat.route';
import { MY_PROFILE_ROUTE } from './profile/profile.my.profile.route';
import { EVENTS_CREATE_ROUTE } from './events/events.create.route';
import { EVENTS_EDIT_ROUTE } from './events/events.edit.route';
import { EVENTS_GET_ONE_ROUTE } from './events/events.get.one.route';
import { EVENTS_ROUTE } from './events/events.route';
import { MY_EVENTS_INDEX_ROUTE } from './my_events/my.events.index.route';
import { USERS_GENERAL_ROUTE } from './users/users.general.route';
import { USERS_GET_ONE_ROUTE } from './users/users.get.one.route';

export const APPLICATION_INDEX_ROUTE = {
  path: ROUTES.APPLICATION.index.path,
  name: ROUTES.APPLICATION.index.name,
  beforeEnter: routerAuthResolver.routeInterceptor(),
  component: () => import('../../views/application/Index.vue'),
  redirect: ROUTES.APPLICATION.EVENTS.absolute,
  children: [
    EVENTS_ROUTE,
    VERSIONS_ROUTE,
    CHAT_ROUTE,
    MY_PROFILE_ROUTE,
    EVENTS_CREATE_ROUTE,
    EVENTS_EDIT_ROUTE,
    EVENTS_GET_ONE_ROUTE,
    MY_EVENTS_INDEX_ROUTE,
    USERS_GENERAL_ROUTE,
    USERS_GET_ONE_ROUTE,
  ],
};
