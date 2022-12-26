import { createRouter, createWebHistory } from 'vue-router'
import { routerResolverByLoginPage, routerAuthResolver } from "../workers/resolver-worker/reolver.worker"
import { API } from "../workers/api-worker/api.worker";
import { filterConfigForEvents, filterConfigForUsers } from "../workers/api-worker/http/filter/filter.config";
import { transpileInterseptorQueryToConfig } from "../workers/api-worker/http/filter/filter.utils";
import { ROUTES } from "./router.const";
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
          component: () => import('../views/authentication/login.vue')
        },
        {
          path: ROUTES.AUTHENTICATIONS.REGISTER.relative,
          name: ROUTES.AUTHENTICATIONS.REGISTER.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/register.vue')
        },
        {
          path: ROUTES.AUTHENTICATIONS.RESET.relative,
          name: ROUTES.AUTHENTICATIONS.RESET.name,
          beforeEnter: routerResolverByLoginPage,
          component: () => import('../views/authentication/reset.vue')
        }
      ]
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
            allVersions: () => API.VersionsService.getAllVersions()
          })),
          component: () => import('../views/application/versions.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Versions'}
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.PROFILE.MY_PROFILE.relative,
          name: ROUTES.APPLICATION.PROFILE.MY_PROFILE.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            usersData: () => API.UserService.getMyProfile(),
          })),
          component: () => import('../views/application/profile/my-profile.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Profile'}
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.MY_EVENTS.relative,
          name: ROUTES.APPLICATION.MY_EVENTS.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            eventData: () => API.EventService.getAllMyEvents(
              transpileInterseptorQueryToConfig(
                filterConfigForEvents,
                to
              )
            )
          })),
          component: () => import('../views/application/events/my-events.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Events', path: '/application/events'},
              {name: 'My events'}
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.EVENTS.relative,
          name: ROUTES.APPLICATION.EVENTS.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            eventData: () => API.EventService.getAllEvents(
              transpileInterseptorQueryToConfig(
                filterConfigForEvents,
                to
              )
            )
          })),
          component: () => import('../views/application/events/index.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Events'}
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.EVENTS.CREATE.relative,
          name: ROUTES.APPLICATION.EVENTS.CREATE.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            // usersData: () => $api.UsersRequest.getAll(to.query),
          })),
          component: () => import('../views/application/events/manage.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Events', path: '/application/events'},
              {name: 'Event creation'}
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.EVENTS.EDIT.relative,
          name: ROUTES.APPLICATION.EVENTS.EDIT.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            // usersData: () => $api.UsersRequest.getAll(to.query),
          })),
          component: () => import('../views/application/events/manage.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Events', path: '/application/events'},
              {name: 'Event edit'},
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.EVENTS.GET_ONE.relative,
          name: ROUTES.APPLICATION.EVENTS.GET_ONE.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            // usersData: () => $api.UsersRequest.getAll(to.query),
          })),
          component: () => import('../views/application/events/event-info.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Events', path: '/application/events'},
              {name: 'Event '},
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.USERS.GENERAL.relative,
          name: ROUTES.APPLICATION.USERS.GENERAL.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            usersData: () => API.UserService.getAllUsers(
              transpileInterseptorQueryToConfig(
                filterConfigForUsers,
                to
              )
            )
          })),
          component: () => import('../views/application/users/general.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Users' },
            ]
          }
        },
        { // TODO
          path: ROUTES.APPLICATION.USERS.PLAYERS.relative,
          name: ROUTES.APPLICATION.USERS.PLAYERS.name,
          beforeEnter: routerAuthResolver.routeInterceptor(() => ({
            // usersData: () => $api.UsersRequest.getAll(to.query),
          })),
          component: () => import('../views/application/users/players.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Users'},
            ]
          }
        },
        { // TODO
          path: ROUTES.APPLICATION.USERS.REFEREE.relative,
          name: ROUTES.APPLICATION.USERS.REFEREE.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            // usersData: () => $api.UsersRequest.getAll(to.query),
          })),
          component: () => import('../views/application/users/referee.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Users'},
            ]
          }
        },
        { // TODO
          path: ROUTES.APPLICATION.USERS.TEAMS.relative,
          name: ROUTES.APPLICATION.USERS.TEAMS.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            // usersData: () => $api.UsersRequest.getAll(to.query),
          })),
          component: () => import('../views/application/users/teams.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Users'},
            ]
          }
        },
        {// TODO
          path: ROUTES.APPLICATION.USERS.TRAINERS.relative,
          name: ROUTES.APPLICATION.USERS.TRAINERS.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
            // usersData: () => $api.UsersRequest.getAll(to.query),
          })),
          component: () => import('../views/application/users/trainers.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Users'},
            ]
          }
        },
        {
          path: ROUTES.APPLICATION.USERS.GET_ONE.relative,
          name: ROUTES.APPLICATION.USERS.GET_ONE.name,
          beforeEnter: routerAuthResolver.routeInterceptor((to) => ( {
            publicUserData: () => API.UserService.getUserPublicProfile(to.params.userId),
          })),
          component: () => import('../views/application/users/profile.vue'),
          meta: {
            breadcrumbs: [
              {name: 'Main', path: '/'},
              {name: 'Users', path: '/application/users'},
              {name: 'Show profile', path: ''},
            ]
          }
        },
      ]
    },
    {
      path: ROUTES.WORKS.relative,
      name: ROUTES.WORKS.name,
      component: () => import('../views/application/works.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404.vue')
    },
    {
      path: '/',
      redirect: ROUTES.AUTHENTICATIONS.LOGIN.absolute
    }
  ]
});

export default router