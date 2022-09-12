import { createRouter, createWebHistory } from 'vue-router'
import { routerResolverByLoginPage, routerAuthResolver } from "../workers/resolver-worker/reolver.worker";

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
            GET_ONE: {
                relative: 'users/:id',
                absolute: (userId) => `/application/users/${userId}`,
                name: 'application-users'
            }
        }
    },
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
                    path: ROUTES.APPLICATION.MY_EVENTS.relative,
                    name: ROUTES.APPLICATION.MY_EVENTS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/events/index.vue'),
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
                        // usersData: () => $api.UsersRequest.getAll(to.query),
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
                    path: ROUTES.APPLICATION.USERS.relative,
                    name: ROUTES.APPLICATION.USERS.name,
                    beforeEnter: routerAuthResolver.routeInterceptor((to) => ({
                        // usersData: () => $api.UsersRequest.getAll(to.query),
                    })),
                    component: () => import('../views/application/users/users.vue'),
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
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: import('../views/404.vue')
        },
    ]
});

export default router
