import { InitialUpdation } from './initial.message'

import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator'

import { WebSocketTypes } from '../../web.socket.types'

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.AllReadedNotifications)
export class NotificationAllReadedNotificationsUpdation extends InitialUpdation {
  handleUpdate({ paginationElements }, callbackAfterRead) {
    paginationElements.value = paginationElements.value.map(
      (notificationForRead) => {
        notificationForRead.isRead = true
        return notificationForRead
      }
    )

    if (typeof callbackAfterRead === 'function') {
      callbackAfterRead()
    }
  }
}
