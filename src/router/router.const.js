export const ROUTES = {
  AUTHENTICATIONS: {
    index: {
      path: '/authentication',
      name: 'authentication',
    },
    LOGIN: {
      relative: 'login',
      absolute: '/authentication/login',
      name: 'authentication-login',
    },
    REGISTER: {
      relative: 'register',
      absolute: '/authentication/register',
      name: 'authentication-register',
    },
    RESET: {
      relative: 'reset',
      absolute: '/authentication/reset',
      name: 'authentication-reset',
    },
  },
  APPLICATION: {
    index: {
      path: '/application',
      name: 'application',
    },
    VERSION: {
      relative: 'versions',
      absolute: '/application/versions',
      name: 'application-versions',
    },
    COMPANY: {
      relative: 'company',
      absolute: '/application/company',
      name: 'application-company',
    },
    PROFILE: {
      relative: 'profile',
      absolute: '/application/profile',
      name: 'application-profile',
      MY_PROFILE: {
        relative: 'profile/my-profile',
        absolute: '/application/profile/my-profile',
        name: 'application-events-my-profile',
      },
      RATE_PLAN: {
        relative: 'profile/rate-plan',
        absolute: '/application/profile/rate-plan',
        name: 'application-events-rate-plan',
      },
      NOTIFICATIONS: {
        relative: 'profile/notifications',
        absolute: '/application/profile/notifications',
        name: 'application-events-notifications',
      },
    },
    EVENTS: {
      relative: 'events',
      absolute: '/application/events',
      name: 'application-events',
      CREATE: {
        relative: 'events/create',
        absolute: '/application/events/create',
        name: 'application-events-create',
      },
      EDIT: {
        relative: 'events/:id/edit',
        absolute: (eventId) => `/application/events/${eventId}/edit`,
        name: 'application-events-edit',
      },
      GET_ONE: {
        relative: 'events/:id',
        absolute: (eventId) => `/application/events/${eventId}`,
        name: 'application-events-get_one',
      },
    },
    MY_EVENTS: {
      index: {
        relative: 'my-events',
        absolute: '/application/my-events',
        name: 'application-my-events',
      },
      TOPICAL: {
        relative: 'my-events/topical',
        absolute: '/application/my-events/topical',
        name: 'application-my-events-topical',
      },
      FINISHED: {
        relative: 'my-events/finished',
        absolute: '/application/my-events/finished',
        name: 'application-my-events-finished',
      },
    },
    USERS: {
      relative: 'users',
      absolute: '/application/users',
      name: 'application-users',
      GENERAL: {
        relative: 'users/general',
        absolute: '/application/users/general',
        name: 'application-users-general',
      },
      PLAYERS: {
        relative: 'users/players',
        absolute: '/application/smart-list/players',
        name: 'application-users-players',
      },
      REFEREE: {
        relative: 'users/referee',
        absolute: '/application/smart-list/referee',
        name: 'application-users-referee',
      },
      TEAMS: {
        relative: 'users/teams',
        absolute: '/application/smart-list/teams',
        name: 'application-users-teams',
      },
      TRAINERS: {
        relative: 'users/trainers',
        absolute: '/application/smart-list/trainers',
        name: 'application-users-trainers',
      },
      GET_ONE: {
        relative: 'users/public/:userId',
        absolute: (userId) => `/application/users/public/${userId}`,
        name: 'application-users-one',
      },
    },
  },
  WORKS: {
    relative: '/works',
    absolute: '/works',
    name: 'works',
  },
};
