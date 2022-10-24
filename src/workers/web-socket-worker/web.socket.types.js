export class WebSocketTypes {
    static NewRequestToParticipation = 'new_request_to_participation';
    static ResponseToRequestForParticipation = 'response_to_request_for_participation';
    static ResponseToInviteForEvent = 'response_to_invite_user_to_event';
    static UserRemoveFromEvent = 'remove_from_event';
    static NewUserOnTheEvent = 'new_user_on_the_event';
    static InviteUserToEvent = 'invite_user_to_event';
    static EventDeleted = 'event_deleted';
    static EventUpdated = 'event_updated';
    static LeaveUserFromTheEvent = 'leave_from_the_event';
    static EventTimeNotification = 'event_time_notification';
    static ChangeMaintenance = 'change_maintenance';
}