export const EndpointsEnum = {
    Authorization: {
        Register: '/authentication/client/login',
        Login: '/authentication/client/login'
    },
    Notification: {
        Index: '/notifications/client/my/notifications/list',
        Count: '/notifications/client/my/not-read/notifications/count',
        Read: '/notifications/client/read/notifications',
        Delete: '/notifications/client/delete/notifications',
        DeleteAllMyNotifications: '/notifications/client/delete-all/notifications' // TODO
    },
    Events: {
        GetAllEvents: '/events/client/events/list',
        GetAllMyEvents: '/events/client/my/events/list',
        DeclineOrAcceptInvites: '/events/client/accept/or/decline/invites/to/events',
        DeclineOrAcceptParticipations: '/events/client/accept/or/decline/participations',
    }
};