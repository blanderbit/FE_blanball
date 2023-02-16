import { createRouter, createWebHistory } from 'vue-router'
import {
  routerResolverByLoginPage,
  routerAuthResolver,
} from '../workers/resolver-worker/reolver.worker'
import { API } from '../workers/api-worker/api.worker'
import {
  filterConfigForEvents,
  filterConfigForUsers,
} from '../workers/api-worker/http/filter/filter.config'
import { transpileInterseptorQueryToConfig } from '../workers/api-worker/http/filter/filter.utils'
import { ROUTES } from './router.const'
import { useUserDataStore } from '../stores/userData'

const usersData = () => {
  const userStore = useUserDataStore()
  if (!Object.keys(userStore.user).length) {
    return API.UserService.getMyProfile().then((res) => {
      userStore.$patch({
        user: res.data,
      })
      return res
    })
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.AUTHENTICATIONS.index.path,
      name: ROUTES.AUTHENTICATIONS.index.name,
      beforeEnter: routerResolverByLoginPage,
      component: () => import('../views/authentication/index.vue'),
      children: [
        {
          path: ROUTES.AUTHENTICATIONS.LOGIN.relative,
          name: ROUTES.AUTHENTICATIONS.LOGIN.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/login.vue'),
        },
        {
          path: ROUTES.AUTHENTICATIONS.REGISTER.relative,
          name: ROUTES.AUTHENTICATIONS.REGISTER.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/register.vue'),
        },
        {
          path: ROUTES.AUTHENTICATIONS.RESET.relative,
          name: ROUTES.AUTHENTICATIONS.RESET.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/reset.vue'),
        },
      ],
    },
    {
      path: ROUTES.APPLICATION.index.path,
      name: ROUTES.APPLICATION.index.name,
      beforeEnter: routerAuthResolver.routeInterceptor(),
      component: () => import('../views/application/index.vue'),
      children: [
        {
          path: ROUTES.APPLICATION.VERSION.relative,
          name: ROUTES.APPLICATION.VERSION.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            allVersions: () => API.VersionsService.getAllVersions(),
            usersData,
          })),
          component: () => import('../views/application/versions.vue'),
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
            allReviewsData: () => API.ReviewService.getMyReviews()
          })),
          component: () =>
            import('../views/application/profile/my-profile.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.profile',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.MY_EVENTS.relative,
          name: ROUTES.APPLICATION.MY_EVENTS.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            eventData: () =>
              API.EventService.getAllMyEvents(
                transpileInterseptorQueryToConfig(filterConfigForEvents, to)
              ),
            usersData,
          })),
          component: () => import('../views/application/events/my-events.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.myEvents',
            },
          },
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
          component: () => import('../views/application/events/index.vue'),
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
            usersData,
          })),
          component: () => import('../views/application/events/manage.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.createOneEvent',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.EVENTS.EDIT.relative,
          name: ROUTES.APPLICATION.EVENTS.EDIT.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            usersData,
          })),
          component: () => import('../views/application/events/manage.vue'),
          meta: {
            breadcrumbs: {
              i18n: 'breadcrumbs.editOneEvent',
            },
          },
        },
        {
          path: ROUTES.APPLICATION.EVENTS.GET_ONE.relative,
          name: ROUTES.APPLICATION.EVENTS.GET_ONE.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            usersData,
          })),
          component: () => import('../views/application/events/event-info.vue'),
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
          component: () => import('../views/application/users/general.vue'),
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
          component: () => import('../views/application/users/profile.vue'),
          meta: {
            publicUserData: () => API.UserService.getUserPublicProfile(to.params.userId),
            usersData,
            breadcrumbs: {
              i18n: 'breadcrumbs.userProfile',
            },
          },
        },
      ],
    },
    {
      path: ROUTES.WORKS.relative,
      name: ROUTES.WORKS.name,
      component: () => import('../views/application/works.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404.vue'),
    },
    {
      path: '/',
      redirect: ROUTES.AUTHENTICATIONS.LOGIN.absolute,
    },
  ],
})

export default router
