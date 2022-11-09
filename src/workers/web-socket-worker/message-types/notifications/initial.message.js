import { API } from "../../../api-worker/api.worker";

import {
  PushNotification,
  ReadAfterActiveAction,
  SetPushNotificationTheme,
  TimeForCloseIfInactive,
  Notification
} from "../../type.decorator";
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);


dayjs.updateLocale('uk', {
  relativeTime: {
    future: "через %s",
    past: "%s назад",
    s: 'несколько мекунд',
    m: "минута",
    mm: "%d минут",
    h: "час",
    hh: "%d часов",
    d: "день",
    dd: "%d дней",
    M: "месяц",
    MM: "%d месяцев",
    y: "год",
    yy: "%d годов"
  }
});

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
  date;
  texts;
  title;
  isRead;
  notification_id;
  textsAfterAction;

  get parseDate() {
    return dayjs().locale('uk').to(dayjs(this.date))
  }

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

  onUpdate() {

  }

  update(data) {
    this.texts = this.createTexts(data);
    this.title = this.createTitle(data);
    this.onUpdate()
  }
}