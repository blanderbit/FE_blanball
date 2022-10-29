import { API } from "../../../api-worker/api.worker";

import {
    PushNotification,
    ReadAfterActiveAction,
    SetPushNotificationTheme,
    TimeForCloseIfInactive,
    Notification
} from "../../type.decorator";

@PushNotification()
@Notification()
@TimeForCloseIfInactive(15000)
@ReadAfterActiveAction((instance) => API.NotificationService
    .readNotifications([
        instance.notification_id
    ])
    .then(() => instance.isRead = true)
)
@SetPushNotificationTheme('standard')
export class InitialMessage {
    date;
    texts;
    title;
    isRead;
    notification_id;

    constructor(message) {
        this.data = message.data;
        this.date = message.date_time || message.time_created;
        this.isRead = message.type === 'Read';
        this.notification_id = message.notification_id;
        this.texts = this.createTexts(message.data);
        this.title = this.createTitle(message.data);
        this.onInit()
    }

    createTexts(data) {
        return []
    }

    createTitle(data) {
        return ''
    }

    onInit() {

    }
}