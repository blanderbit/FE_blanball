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
    static EventHasBeenEnded = 'event_has_been_ended';
    static LastUserOnTheEvent = 'last_user_on_the_event';
    static LeftFeedback = 'left_feedback';

    static BulkNotificationRead = 'bulk_notifications_read';
    static UpdateMessageAcceptOrDeclineInviteToEvent = 'update_message_accept_or_decline_invite_to_event';
    static UpdateMessageAcceptOrDeclineParticipationToEvent = 'update_message_accept_or_decline_invite_to_participation';
    static BulkNotificationDelete = 'bulk_notifications_delete';
    static AllDeletedNotifications = 'all_user_notifications_deleted';
    static AllReadedNotifications = 'all_user_notifications_readed';
}
