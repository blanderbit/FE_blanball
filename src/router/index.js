import { createRouter, createWebHistory } from 'vue-router';
import {
  routerResolverByLoginPage,
  routerAuthResolver,
  routerDataResolver,
} from '../workers/resolver-worker/reolver.worker';
import { API } from '../workers/api-worker/api.worker';
import {
  filterConfigForEvents,
  filterConfigForUsers,
} from '../workers/api-worker/http/filter/filter.config';
import { transpileInterseptorQueryToConfig } from '../workers/api-worker/http/filter/filter.utils';
import { ROUTES } from './router.const';
import { useUserDataStore } from '../stores/userData';
import { prepareEventUpdateData } from '../utils/prepareEventUpdateData';

const usersData = () => {
  const userStore = useUserDataStore();
  if (!Object.keys(userStore.user).length) {
    return API.UserService.getMyProfile().then((res) => {
      userStore.$patch({
        user: res.data,
      });
      return res;
    });
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.AUTHENTICATIONS.index.path,
      name: ROUTES.AUTHENTICATIONS.index.name,
      beforeEnter: routerResolverByLoginPage,
      component: () => import('../views/authentication/Index.vue'),
      redirect: ROUTES.AUTHENTICATIONS.LOGIN.absolute,
      children: [
        {
          path: ROUTES.AUTHENTICATIONS.LOGIN.relative,
          name: ROUTES.AUTHENTICATIONS.LOGIN.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/Login.vue'),
          meta: {
            noGuards: true
          }
        },
        {
          path: ROUTES.AUTHENTICATIONS.REGISTER.relative,
          name: ROUTES.AUTHENTICATIONS.REGISTER.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/Register.vue'),
        },
        {
          path: ROUTES.AUTHENTICATIONS.RESET.relative,
          name: ROUTES.AUTHENTICATIONS.RESET.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/Reset.vue'),
        },
      ],
    },
    {
      path: ROUTES.APPLICATION.index.path,
      name: ROUTES.APPLICATION.index.name,
      beforeEnter: routerAuthResolver.routeInterceptor(),
      component: () => import('../views/application/Index.vue'),
      redirect: ROUTES.APPLICATION.EVENTS.absolute,
      children: [
        {
          path: ROUTES.APPLICATION.VERSIONS.relative,
          name: ROUTES.APPLICATION.VERSIONS.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            allVersions: () => API.VersionsService.getAllVersions(),
            usersData,
          })),
          component: () => import('../views/application/Versions.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.versions',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.PROFILE.MY_PROFILE.relative,
          name: ROUTES.APPLICATION.PROFILE.MY_PROFILE.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            usersData,
            allReviewsData: () => API.ReviewService.getMyReviews(),
          })),
          component: () => import('../views/application/profile/Index.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.profile',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.MY_EVENTS.index.relative,
          name: ROUTES.APPLICATION.MY_EVENTS.index.name,
          beforeEnter: routerAuthResolver.routeInterceptor(),
          redirect: ROUTES.APPLICATION.MY_EVENTS.TOPICAL.absolute,
          children: [
            {
              path: ROUTES.APPLICATION.MY_EVENTS.TOPICAL.absolute,
              name: ROUTES.APPLICATION.MY_EVENTS.TOPICAL.name,
              beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                eventData: () =>
                  API.EventService.getMyTopicalEvents(
                    transpileInterseptorQueryToConfig(filterConfigForEvents, to)
                  ),
                usersData,
              })),
              component: () => import('../views/application/events/MyEvents.vue'),
              meta: {
                breadcrumbs: {
                  i18n: 'breadcrumbs.myEvents',
                },
                tabId: 1
              },
            },
            {
              path: ROUTES.APPLICATION.MY_EVENTS.FINISHED.absolute,
              name: ROUTES.APPLICATION.MY_EVENTS.FINISHED.name,
              beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                eventData: () =>
                  API.EventService.getMyFinishedEvents(
                    transpileInterseptorQueryToConfig(filterConfigForEvents, to)
                  ),
                usersData,
              })),
              component: () => import('../views/application/events/MyEvents.vue'),
              meta: {
                breadcrumbs: {
                  i18n: 'breadcrumbs.myEvents',
                },
                tabId: 2
              },
            },
          ]
        },
        {
          path: ROUTES.APPLICATION.EVENTS.relative,
          name: ROUTES.APPLICATION.EVENTS.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            eventData: () =>
              API.EventService.getAllEvents(
                transpileInterseptorQueryToConfig(filterConfigForEvents, to)
              ),
            usersData,
          })),
          component: () => import('../views/application/events/Index.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.events',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.EVENTS.CREATE.relative,
          name: ROUTES.APPLICATION.EVENTS.CREATE.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            action: () => 'CREATE',
            usersData,
          })),
          component: () => import('../views/application/events/Manage.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.createOneEvent',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.EVENTS.EDIT.relative,
          name: ROUTES.APPLICATION.EVENTS.EDIT.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            action: () => 'EDIT',
            usersData,
            eventData: async () => {
              return prepareEventUpdateData(to.params.id);
            },
          })),
          component: () => import('../views/application/events/Manage.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.editOneEvent',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.EVENTS.GET_ONE.relative,
          name: ROUTES.APPLICATION.EVENTS.GET_ONE.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            usersData,
            eventData: () => API.EventService.getOneEvent(to.params.id),
            eventRequestsToParticipationData: () =>
              API.EventService.requestsToParticipations(to.params.id),
          })),
          component: () => import('../views/application/events/EventInfo.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.getOneEvent',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.USERS.GENERAL.relative,
          name: ROUTES.APPLICATION.USERS.GENERAL.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            allUsersData: () =>
              API.UserService.getAllUsers(
                transpileInterseptorQueryToConfig(filterConfigForUsers, to)
              ),
            usersData,
          })),
          component: () => import('../views/application/users/General.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.users',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.USERS.GET_ONE.relative,
          name: ROUTES.APPLICATION.USERS.GET_ONE.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            publicUserData: () =>
              API.UserService.getUserPublicProfile(to.params.userId),
            usersData,
          })),
          component: () => import('../views/application/users/Profile.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.userProfile',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.DONATIONS.relative,
          name: ROUTES.APPLICATION.DONATIONS.name,
          component: () => import('../views/application/donations/DonationList.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.donations',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.DONATIONS.ITEM.relative,
          name: ROUTES.APPLICATION.DONATIONS.ITEM.name,
          component: () => import('../views/application/donations/DonationItem.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.donation',
            },
          },
        },
      ],
    },
    {
      path: ROUTES.WORKS.relative,
      name: ROUTES.WORKS.name,
      beforeEnter: routerDataResolver.routeInterceptor(),
      component: () => import('../views/application/Works.vue'),
    },
    {
      path: ROUTES.PRIVACY_POLICY.relative,
      name: ROUTES.PRIVACY_POLICY.name,
      beforeEnter: routerDataResolver.routeInterceptor(),
      component: () => import('../views/policy/PrivacyPolicy.vue'),
    },
    {
      path: ROUTES.COOKIE_POLICY.relative,
      name: ROUTES.COOKIE_POLICY.name,
      beforeEnter: routerDataResolver.routeInterceptor(),
      component: () => import('../views/policy/CookiePolicy.vue'),
    },
    {
      path: ROUTES.DISCLAMER.relative,
      name: ROUTES.DISCLAMER.name,
      beforeEnter: routerDataResolver.routeInterceptor(),
      component: () => import('../views/policy/Disclamer.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      beforeEnter: routerDataResolver.routeInterceptor(),
      component: () => import('../views/404.vue'),
    },
    {
      path: '/',
      beforeEnter: routerDataResolver.routeInterceptor(),
      redirect: ROUTES.AUTHENTICATIONS.LOGIN.absolute,
    },
  ],
});

export default router;


router.beforeEach(async (to, from, next) => {
  if (to.name === ROUTES.WORKS.name) {
    const response = await API.NotificationService.getMaintenance();
    if (response.data.isMaintenance) {
      next();
    } else {
      next(ROUTES.APPLICATION.EVENTS.absolute);
    }
  } else if (to.name === ROUTES.APPLICATION.VERSIONS.name) {
    next();
  } else {
    next();
  }
});
