import { InitialMessage } from '../message-types/notifications/initial.message'

import { SetActions, NotificationSetImage } from '../type.decorator'

import { MessageActionTypes } from '../message.action.types'
import { NotificationImage } from '../../../assets/img/notifications/notification.images'

@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.Action,
    text: 'Завантажити нові повідомлення',
  },
])
export class NewNotifications extends InitialMessage {
  countOfNewNotifications = 0

  set texts(value) {}

  get texts() {
    return [`У вас новіе уведомления - ${this.countOfNewNotifications}`]
  }

  createTitle() {
    return 'System notification'
  }
}
