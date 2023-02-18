import { InitialMessage } from './initial.message'

import {
  SetActions,
  SetMessageType,
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
@SetMessageType(WebSocketTypes.UserRemoveFromEvent)
@NotificationSetImage(NotificationImage.NotificationError)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    text: 'Зрозуміло',
  },
  {
    type: MessageActionTypes.Action,
    text: 'Найти ивенты',
    action: ROUTES.APPLICATION.EVENTS.absolute,
    actionType: MessageActionDataTypes.Url,
    buttonType: 'stroked',
  },
])
export class RemoveUserFromTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.recipient.name} - вас удалили с события. По причине - "${data.reason.text}"`,
      `Для того что бы подобрать другое событие нажмите кнопку "${this.actions[1].text}"`,
    ]
  }

  createTitle() {
    return 'Вы удалены с ивента!'
  }
}
