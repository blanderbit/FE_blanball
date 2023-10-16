import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';

import { ROUTES } from '../router.const';
import { usersData } from '@routes/helpers/usersData';
import { hintsData } from '@routes/helpers/hintsData';

export const VERSIONS_ROUTE = {
  path: ROUTES.APPLICATION.VERSIONS.relative,
  name: ROUTES.APPLICATION.VERSIONS.name,
  beforeEnter: routerAuthResolver.routeInterceptor(() => ({
    allVersions: () => API.VersionsService.getAllVersions(),
    usersData,
    hintsData,
  })),
  component: () => import('../../views/application/Versions.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.versions',
    },
  },
};
