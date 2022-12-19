export const EndpointsEnum = {
  Authorization: {
    Register: '/authentication/client/register',
    Login: '/authentication/client/login',
    ResetPasswordRequest: '/authentication/client/request-reset/password',
    VerifyCode: '/authentication/client/check/code',
    VerifyCodeResetPassword: '/authentication/client/validate/reset-password/code',
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
    getPlannedUserEvents: '/events/client/user/planned/events/list/'
  },
  Users: {
    getMyProfile: '/authentication/client/me',
    deleteMyProfile: '/authentication/client/me',
    sendApproveCode: '/authentication/client/check/code',
    changePassword: '/authentication/client/request-change/password',
    updateProfileData: '/authentication/client/me/update',
    getAllUsers: '/authentication/client/users/list',
    changeUserEmail: '/authentication/client/request-change/email'
  },
  Reviews: {
    getUserReviews: '/reviews/client/user/reviews/list/',
    getMyReviews: '/reviews/client/my/reviews/list'
  },
  Versions: {
    getAllVersions: '/versions/client/versions/list',
    getCurrentVersion: '/versions/admin/version/'
  }
};