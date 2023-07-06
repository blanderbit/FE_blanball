export const EndpointsEnum = {
  Authorization: {
    Register: '/authentication/client/register',
    Login: '/authentication/client/login',
    Logout: '/authentication/client/logout',
    RefreshTokens: '/authentication/client/refresh/tokens',
    ResetPasswordRequest: '/authentication/client/request-reset/password',
    VerifyCode: '/authentication/client/check/code',
    VerifyCodeResetPassword:
      '/authentication/client/validate/reset-password/code',
    ResetComplete: '/authentication/client/password/reset-complete',
    AddAvatar: '/authentication/client/update/my/profile/avatar',
    VerifyEmail: '/authentication/client/request-verify/email',
    ValidateRefreshToken: '/authentication/client/validate/refresh/token',
  },
  Notification: {
    Index: '/notifications/client/my/notifications/list',
    Count: '/notifications/client/my/not-read/notifications/count',
    Read: '/notifications/client/read/notifications',
    Delete: '/notifications/client/delete/notifications',
    Maintenance: '/notifications/admin/get/maintenance',
    DeleteAllMyNotifications: '/notifications/client/delete/all/notifications',
    ReadAllMyNotifications: '/notifications/client/read/all/notifications',
    GetAllMyNotificationsIds:
      '/notifications/client/get/all/my/notifications/ids',
  },
  Events: {
    GetAllEvents: '/events/client/planned/events/list',
    GetAllMyEvents: '/events/client/my/events/list',
    GetMyTopicalEvents: '/events/client/my/topical/events/list',
    GetMyFinishedEvents: '/events/client/my/finished/events/list',
    GetOneEvent: (eventId) => `/events/client/event/${eventId}`,
    DeclineOrAcceptInvites:
      '/events/client/accept/or/decline/invites/to/events',
    PopularEventsList: '/events/client/popular/events/list',
    CreateOneEvent: '/events/client/event/create',
    EditOneEvent: (eventId) => `/events/client/event/update/${eventId}`,
    ShowOrHideMyEvents: '/events/client/show/or/hide/my/events',
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
    GetMyPlannedEvents: '/events/client/my/planned/events/list',
    GetPlannedUserEvents: (userId) =>
      `/events/client/user/planned/events/list/${userId}`,
  },
  Users: {
    GetMyProfile: '/authentication/client/me',
    DeleteMyProfile: '/authentication/client/me',
    SendApproveCode: '/authentication/client/check/code',
    ChangePassword: '/authentication/client/request-change/password',
    UpdateProfileData: '/authentication/client/me/update',
    GetAllUsers: '/authentication/client/users/list',
    GetRelevantUsers: '/authentication/client/users/relevant/list',
    ChangeUserEmail: '/authentication/client/request-change/email',
    UserPublicProfile: (userId) => `/authentication/client/profile/${userId}`,
  },
  Reviews: {
    GetUserReviews: (userId) => `/reviews/client/user/reviews/list/${userId}`,
    GetMyReviews: '/reviews/client/my/reviews/list',
    CreateEventReview: '/reviews/client/review/event/review/create',
  },
  Versions: {
    GetAllVersions: '/versions/client/versions/list',
    GetCurrentVersion: '/versions/admin/version/',
  },
  BugReports: {
    CreateBugReport: '/bugs/client/create/bug',
  },
  Scheduler: {
    GetScheduledEventsData: '/scheduler/client/user/scheduler/events',
    getScheduledEventsDataOnSpecificDay:
      '/scheduler/client/user/scheduler/events/on/specific/day',
  },
  Hints: {
    GetAllHints: '/hints/client/hints/list',
  },
  Chats: {
    GetChatMessages: (chatId) => `/chat/client/chat/messages/list/${chatId}`,
    CreateChatMessage: '/chat/client/create/message',
  },
};
