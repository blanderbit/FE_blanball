import { InitialUpdation } from './initial.message';

import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator';

import { WebSocketTypes } from '../../web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.AllReadNotifications)
export class NotificationAllReadNotificationsUpdation extends InitialUpdation {
  handleUpdate({ paginationElements }, callbackAfterRead) {
    paginationElements = paginationElements.map((notificationForRead) => {
      notificationForRead.isRead = true;
      return notificationForRead;
    });

    if (typeof callbackAfterRead === 'function') {
      callbackAfterRead();
    }
  }
}
