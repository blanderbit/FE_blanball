import { routerAuthResolver } from '@workers/resolver-worker/reolver.worker';
import { ROUTES } from '../../router.const';
import { usersData } from '@/routes/helpers/usersData';

export const CHAT_ROUTE = {
  path: ROUTES.APPLICATION.CHAT.relative,
  name: ROUTES.APPLICATION.CHAT.name,
  component: () => import('@views/application/chat/Index.vue'),
  beforeEnter: routerAuthResolver.routeInterceptor(() => ({
    usersData,
  })),
  meta: {
    noPageContainer: true,
    noPageHeader: true,
  },
};