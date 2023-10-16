import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { transpileInterseptorQueryToConfig } from '@workers/api-worker/http/filter/filter.utils';
import { filterConfigForUsers } from '@workers/api-worker/http/filter/filter.config';


import { usersData } from '@routes/helpers/usersData';
import { hintsData } from '@routes/helpers/hintsData';


export const USERS_GENERAL_ROUTE = {
  path: ROUTES.APPLICATION.USERS.GENERAL.relative,
  name: ROUTES.APPLICATION.USERS.GENERAL.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    allUsersData: () =>
      API.UserService.getAllUsers(
        transpileInterseptorQueryToConfig(filterConfigForUsers, to)
      ),
    hintsData,
    usersData,
  })),
  component: () => import('../../../views/application/users/General.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.users',
    },
  },
};
