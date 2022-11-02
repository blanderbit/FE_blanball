import { createRouter, createWebHistory } from 'vue-router'
import { routerResolverByLoginPage, routerAuthResolver } from "../workers/resolver-worker/reolver.worker"
import {  EventService, UserService } from '../workers/api-worker/http/http-services/authorization.service'

const CONSTANTS = {
    first_page_events: 1
}

export const ROUTES = {
    AUTHENTICATIONS: {
        index: {
            path: '/authentication',
            name: 'authentication'
        },
        LOGIN: {
            relative: 'login',
            absolute: '/authentication/login',
            name: 'authentication-login'
        },
        REGISTER: {
            relative: 'register',
            absolute: '/authentication/register',
            name: 'authentication-register'
        },
        RESET: {
            relative: 'reset',
            absolute: '/authentication/reset',
            name: 'authentication-reset'
        },
    },
    APPLICATION: {
        index: {
            path: '/application',
            name: 'application'
        },
        HOME: {
            relative: 'home',
            absolute: '/application/home',
            name: 'application-home'
        },
        VERSION: {
            relative: 'versions',
            absolute: '/application/versions',
            name: 'application-versions'
        },
        COMPANY: {
            relative: 'company',
            absolute: '/application/company',
            name: 'application-company'
        },
        PROFILE: {
            relative: 'profile',
            absolute: '/application/profile',
            name: 'application-profile',
            MY_PROFILE: {
                relative: 'profile/my-profile',
                absolute: '/application/profile/my-profile',
                name: 'application-events-my-profile'
            },
            RATE_PLAN: {
                relative: 'profile/rate-plan',
                absolute: '/application/profile/rate-plan',
                name: 'application-events-rate-plan'
            },
            NOTIFICATIONS: {
                relative: 'profile/notifications',
                absolute: '/application/profile/notifications',
                name: 'application-events-notifications'
            },
        },
        EVENTS: {
            relative: 'events',
            absolute: '/application/events',
            name: 'application-events',
            CREATE: {
                relative: 'events/create',
                absolute: '/application/events/create',
                name: 'application-events-create'
            },
            EDIT: {
                relative: 'events/:id/edit',
                absolute: (eventId) => `/application/events/${eventId}/edit`,
                name: 'application-events-edit'
            },
            GET_ONE: {
                relative: 'events/:id',
                absolute: (eventId) => `/application/events/${eventId}`,
                name: 'application-events-get_one'
            }
        },
        MY_EVENTS: {
            relative: 'my-events',
            absolute: '/application/my-events',
            name: 'application-my_events'
        },
        USERS: {
            relative: 'users',
            absolute: '/application/users',
            name: 'application-users',
            GENERAL: {
                relative: 'users/general',
                absolute: '/application/users/general',
                name: 'application-users-general'
            },
            PLAYERS: {
                relative: 'users/players',
                absolute: '/application/users/players',
                name: 'application-users-players'
            },
            REFEREE: {
                relative: 'users/referee',
                absolute: '/application/users/referee',
                name: 'application-users-referee'
            },
            TEAMS: {
                relative: 'users/teams',
                absolute: '/application/users/teams',
                name: 'application-users-teams'
            },
            TRAINERS: {
                relative: 'users/trainers',
                absolute: '/application/users/trainers',
                name: 'application-users-trainers'
            },
            GET_ONE: {
                relative: 'users/:id',
                absolute: (userId) => `/application/users/${userId}`,
                name: 'application-users'
            }
        }
    },
    WORKS: {
        relative: '/works',
        absolute: '/works',
        name: 'works'
    }
};

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
                    path: ROUTES.APPLICATION.HOME.relative,
                    name: ROUTES.APPLICATION.HOME.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/home.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main' }
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.VERSION.relative,
                    name: ROUTES.APPLICATION.VERSION.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/versions.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Versions'}
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.COMPANY.relative,
                    name: ROUTES.APPLICATION.COMPANY.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/company.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'company'}
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.PROFILE.MY_PROFILE.relative,
                    name: ROUTES.APPLICATION.PROFILE.MY_PROFILE.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        usersData: () => UserService.getMyProfile(),
                    })),
                    component: () => import('../views/application/profile/my-profile.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Profile'}
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.PROFILE.RATE_PLAN.relative,
                    name: ROUTES.APPLICATION.PROFILE.RATE_PLAN.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/profile/rate-plan.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Profile'}
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.PROFILE.NOTIFICATIONS.relative,
                    name: ROUTES.APPLICATION.PROFILE.NOTIFICATIONS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/profile/notifications.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Profile'}
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.MY_EVENTS.relative,
                    name: ROUTES.APPLICATION.MY_EVENTS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        eventData: () => EventService.getAllMyEvents(CONSTANTS.first_page_events)
                    })),
                    component: () => import('../views/application/events/my-events.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Events', path: '/application/events' },
                            { name: 'My events' }
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.EVENTS.relative,
                    name: ROUTES.APPLICATION.EVENTS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        eventData: () => EventService.getAllEvents(CONSTANTS.first_page_events)
                    })),
                    component: () => import('../views/application/events/index.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Events'}
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
                            { name:'Main', path: '/' },
                            { name: 'Events', path: '/application/events' },
                            { name: 'Event creation' }
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.EVENTS.EDIT.relative,
                    name: ROUTES.APPLICATION.EVENTS.EDIT.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/events/manage.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Events', path: '/application/events'},
                            { name: 'Event edit', path: '/application/events'},
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.EVENTS.GET_ONE.relative,
                    name: ROUTES.APPLICATION.EVENTS.GET_ONE.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/events/event-info.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Events', path: '/application/events'},
                            { name: 'Event ' },
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.USERS.GENERAL.relative,
                    name: ROUTES.APPLICATION.USERS.GENERAL.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/users/general.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Users' },
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.USERS.PLAYERS.relative,
                    name: ROUTES.APPLICATION.USERS.PLAYERS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/users/players.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Users' },
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.USERS.REFEREE.relative,
                    name: ROUTES.APPLICATION.USERS.REFEREE.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/users/referee.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Users' },
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.USERS.TEAMS.relative,
                    name: ROUTES.APPLICATION.USERS.TEAMS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/users/teams.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Users' },
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.USERS.TRAINERS.relative,
                    name: ROUTES.APPLICATION.USERS.TRAINERS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/users/trainers.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Users' },
                        ]
                    }
                },
                {
                    path: ROUTES.APPLICATION.USERS.GET_ONE.relative,
                    name: ROUTES.APPLICATION.USERS.GET_ONE.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/users/profile.vue'),
                    meta: {
                        breadcrumbs: [
                            { name:'Main', path: '/' },
                            { name: 'Users', path: '/application/users'},
                            { name: 'Show profile', path: ''},
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
        }
    ]
});

export default router