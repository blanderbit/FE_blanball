export const EndpointsEnum = {
  Authorization: {
    Register: '/authentication/client/register',
    Login: '/authentication/client/login',
    ResetPasswordRequest: '/authentication/client/request-reset/password',
    VerifyCode: '/authentication/client/check/code',
    VerifyCodeResetPassword:
      '/authentication/client/validate/reset-password/code',
    ResetComplete: '/authentication/client/password/reset-complete',
    AddAvatar: '/authentication/client/update/my/profile/avatar',
    VerifyEmail: '/authentication/client/request-verify/email',
  },
  Notification: {
    Index: '/notifications/client/my/notifications/list',
    Count: '/notifications/client/my/not-read/notifications/count',
    Read: '/notifications/client/read/notifications',
    Delete: '/notifications/client/delete/notifications',
    Maintenance: '/notifications/admin/get/maintenance',
    DeleteAllMyNotifications: '/notifications/client/delete/all/notifications',
    ReadAllMyNotifications: '/notifications/client/read/all/notifications',
    GetAllMyNotificationsIds: '/notifications/client/get/all/my/notifications/ids',
  },
  Events: {
    GetAllEvents: '/events/client/planned/events/list',
    GetAllMyEvents: '/events/client/my/events/list',
    GetMyTopicalEvents: '/events/client/my/topical/events/list',
    GetMyFinishedEvents: '/events/client/my/finished/events/list',
    getOneEvent: (eventId) => `/events/client/event/${eventId}`,
    DeclineOrAcceptInvites:
      '/events/client/accept/or/decline/invites/to/events',
    PopularEventsList: '/events/client/popular/events/list',
    CreateOneEvent: '/events/client/event/create',
    EditOneEvent: (eventId) => `/events/client/event/update/${eventId}`,
    DeleteEvents: '/events/client/events/delete',
    EventJoinAsPlayer: '/events/client/event/join',
    EventLeaveAsPlayer: '/events/client/event/leave',
    EventLeaveAsFan: '/events/client/fan/event/leave',
    EventJoinAsFan: '/events/client/fan/event/join',
    PinEvents: '/events/client/events/pin',
    UnPinEvents: '/events/client/events/unpin',
    InviteUsersToEvent: '/events/client/invite/users/to/event',
    GetCountPinnedEvents: '/events/client/my/pinned/events/count',
    EventRequestsToParticipations: (eventId) =>
      `/events/client/requests/participations/list${eventId}`,
    DeclineOrAcceptParticipations:
      '/events/client/accept/or/decline/participations',
    getPlannedUserEvents: (userId) =>
      `/events/client/user/planned/events/list/${userId}`,
  },
  Users: {
    getMyProfile: '/authentication/client/me',
    deleteMyProfile: '/authentication/client/me',
    sendApproveCode: '/authentication/client/check/code',
    changePassword: '/authentication/client/request-change/password',
    updateProfileData: '/authentication/client/me/update',
    getAllUsers: '/authentication/client/users/list',
    getRelevantUsers: '/authentication/client/users/relevant/list',
    changeUserEmail: '/authentication/client/request-change/email',
    userPublicProfile: (userId) => `/authentication/client/profile/${userId}`,
  },
  Reviews: {
    getUserReviews: (userId) => `/reviews/client/user/reviews/list/${userId}`,
    getMyReviews: '/reviews/client/my/reviews/list',
    createEventReview: '/reviews/client/review/event/review/create',
  },
  Versions: {
    getAllVersions: '/versions/client/versions/list',
    getCurrentVersion: '/versions/admin/version/',
  },
  BugReports: {
    createBugReport: '/bugs/client/create/bug',
  },
};
