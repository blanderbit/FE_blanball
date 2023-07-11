export const EventsEnpointsEnum = {
  GetAllEvents: '/events/client/planned/events/list',
  GetAllMyEvents: '/events/client/my/events/list',
  GetMyTopicalEvents: '/events/client/my/topical/events/list',
  GetMyFinishedEvents: '/events/client/my/finished/events/list',
  GetOneEvent: (eventId) => `/events/client/event/${eventId}`,
  DeclineOrAcceptInvites: '/events/client/accept/or/decline/invites/to/events',
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
};
