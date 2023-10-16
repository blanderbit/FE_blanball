import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';


import { usersData } from '@routes/helpers/usersData';
import { hintsData } from '@routes/helpers/hintsData';


export const USERS_GET_ONE_ROUTE = {
  path: ROUTES.APPLICATION.USERS.GET_ONE.relative,
  name: ROUTES.APPLICATION.USERS.GET_ONE.name,
  beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
    publicUserData: () =>
      API.UserService.getUserPublicProfile(to.params.userId),
    usersData,
    hintsData,
  })),
  component: () => import('../../../views/application/users/Profile.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.userProfile',
    },
  },
};
