import { InitialMessage } from '../message-types/notifications/initial.message';

import { SetActions, NotificationSetImage } from '../type.decorator';

import { MessageActionTypes } from '../message.action.types';
import { NotificationImage } from '../../../assets/img/notifications/notification.images';

@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.Action,
    buttonType: 'success',
    buttonText: 'Завантажити нові повідомлення',
    buttonWidth: 232,
    buttonHeight: 28,
  },
])
export class NewNotifications extends InitialMessage {
  countOfNewNotifications = 0;

  set texts(value) {}

  get texts() {}

  get title() {
    return `У вас є ${this.countOfNewNotifications} нових повідомлень`;
  }

  set title(value) {}

  createTitle() {}
}
