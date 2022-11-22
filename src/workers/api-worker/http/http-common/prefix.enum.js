export const EndpointsEnum = {
  Authorization: {
    Register: '/authentication/client/login',
    Login: '/authentication/client/login',
    ResetPasswordRequest: '/authentication/client/request-reset/password',
    VerifyCode: '/authentication/client/check/code',
    ResetComplete: '/authentication/client/password/reset-complete'
  },
  Notification: {
    Index: '/notifications/client/my/notifications/list',
    Count: '/notifications/client/my/not-read/notifications/count',
    Read: '/notifications/client/read/notifications',
    Delete: '/notifications/client/delete/notifications',
    Maintenance: '/notifications/admin/get/maintenance',
    DeleteAllMyNotifications: '/notifications/client/delete/all/notifications',
    ReadAllMyNotifications: '/notifications/client/read/all/notifications'
  },
  Events: {
    GetAllEvents: '/events/client/events/list',
    GetAllMyEvents: '/events/client/my/events/list',
    DeclineOrAcceptInvites: '/events/client/accept/or/decline/invites/to/events',
    DeclineOrAcceptParticipations: '/events/client/accept/or/decline/participations',
  },
  Users: {
    getMyProfile: '/authentication/client/me',
    deleteMyProfile: '/authentication/client/me',
    sendApproveCode: '/authentication/client/check/code',
    changePassword: '/authentication/client/request-change/password',
    updateProfileData: '/authentication/client/me/update'
  },
  Versions: {
    getAllVersions: '/versions/client/versions/list',
    getCurrentVersion: '/versions/admin/version/'
  }
};