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
)
@SetPushNotificationTheme('standard')
export class InitialMessage {
    date = new Date();
    texts;
    title;
    notification_id;

    constructor(message) {
        this.data = message.data;
        this.date = message.date_time;
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