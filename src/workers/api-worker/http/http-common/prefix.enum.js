export const EndpointsEnum = {
    Authorization: {
        Register: '/authentication/client/login',
        Login: '/authentication/client/login'
    },
    Notification: {
        Index: '/notifications/admin/notifications/list',
        Read: '/notifications/client/read/notifications',
        Delete: '/notifications/client/delete/notifications',
        DeleteAllMyNotifications: '/notifications/client/delete-all/notifications' // TODO
    }
};