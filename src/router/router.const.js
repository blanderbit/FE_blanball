
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
      absolute: '/application/smart-list',
      name: 'application-smart-list',
      GENERAL: {
        relative: 'smart-list/general',
        absolute: '/application/smart-list/general',
        name: 'application-smart-list-general'
      },
      PLAYERS: {
        relative: 'smart-list/players',
        absolute: '/application/smart-list/players',
        name: 'application-smart-list-players'
      },
      REFEREE: {
        relative: 'smart-list/referee',
        absolute: '/application/smart-list/referee',
        name: 'application-smart-list-referee'
      },
      TEAMS: {
        relative: 'smart-list/teams',
        absolute: '/application/smart-list/teams',
        name: 'application-smart-list-teams'
      },
      TRAINERS: {
        relative: 'smart-list/trainers',
        absolute: '/application/smart-list/trainers',
        name: 'application-smart-list-trainers'
      },
      GET_ONE: {
        relative: 'smart-list/:id',
        absolute: (userId) => `/application/users/${userId}`,
        name: 'application-smart-list'
      }
    }
  },
  WORKS: {
    relative: '/works',
    absolute: '/works',
    name: 'works'
  }
};