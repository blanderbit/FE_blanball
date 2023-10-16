import { notifionsFormatTime } from '@utils/notificationsFormatTime';

import {
  PushNotification,
  ReadAfterActiveAction,
  DeleteAfterActiveAction,
  SetPushNotificationTheme,
  TimeForCloseIfInactive,
  Notification,
} from '../../type.decorator';
import dayjs from 'dayjs';

notifionsFormatTime();

@PushNotification()
@Notification()
@TimeForCloseIfInactive(15000)
@ReadAfterActiveAction((instance) =>
  API.NotificationService.readNotifications([instance.notification_id])
)
@DeleteAfterActiveAction((instance) =>
  API.NotificationService.deleteNotifications([instance.notification_id])
)
@SetPushNotificationTheme('standard')
export class InitialMessage {
  date;
  texts;
  title;
  isRead;
  notification_id;
  metadata = {};

  get profileImage() {
    return this.data?.sender?.avatar;
  }

  get sender() {
    return this.fullName || 'Blanball';
  }

  get fullName() {
    return [this?.data?.sender?.last_name, this.data?.sender?.name]
      .filter((_) => !!_)
      .join(' ');
  }

  get parseDate() {
    return dayjs().locale('uk').to(dayjs(this.date));
  }

  constructor(message) {
    this.data = message?.data;
    this.date = message?.date_time || message?.time_created;
    this.isRead = message?.type === 'Read';
    this.notification_id = message?.notification_id;
    this.texts = this.createTexts(message?.data);
    this.title = this.createTitle(message?.data);
    this.onInit();
  }

  createTexts(data) {
    return [];
  }

  createTitle(data) {
    return '';
  }

  onInit() {}

  onUpdate() {}

  update(data) {
    this.texts = this.createTexts(data);
    this.title = this.createTitle(data);
    this.onUpdate();
  }
}
