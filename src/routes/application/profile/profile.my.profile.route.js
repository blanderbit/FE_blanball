import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { API } from '@/workers/api-worker/api.worker';
import { ROUTES } from '../../router.const';
import { usersData } from '@/routes/helpers/usersData';
import { hintsData } from '@/routes/helpers/hintsData';

export const MY_PROFILE_ROUTE = {
  path: ROUTES.APPLICATION.PROFILE.MY_PROFILE.relative,
  name: ROUTES.APPLICATION.PROFILE.MY_PROFILE.name,
  beforeEnter: routerAuthResolver.routeInterceptor(() => ({
    usersData,
    hintsData,
    allReviewsData: () => API.ReviewService.getMyReviews(),
  })),
  component: () => import('../../../views/application/profile/Index.vue'),
  meta: {
    breadcrumbs: {
      i18n: 'breadcrumbs.profile',
    },
  },
};
