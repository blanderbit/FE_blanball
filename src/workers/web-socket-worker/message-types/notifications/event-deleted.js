import { InitialMessage } from './initial.message'

import {
  SetActions,
  SetMessageType,
  SetPushNotificationTheme,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator'

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types'
import { WebSocketTypes } from '../../web.socket.types'
import { NotificationImage } from '../../../../assets/img/notifications/notification.images'
import { ROUTES } from '../../../../router/router.const'

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventDeleted)
@SetPushNotificationTheme('error')
@NotificationSetImage(NotificationImage.NotificationError)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    text: 'Зрозуміло',
  },
  {
    type: MessageActionTypes.Action,
    text: 'Знайти інші події',
    action: ROUTES.APPLICATION.EVENTS.absolute,
    actionType: MessageActionDataTypes.Url,
    buttonType: 'stroked',
  },
])
export class EventDeletedMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Подія, на якій ви брали участь, була видалена, але ви можете знайти інші події "${this.actions[1].text}."`,
    ]
  }

  createTitle() {
    return 'Подія видалена'
  }
}
