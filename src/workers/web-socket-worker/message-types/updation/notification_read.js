import { InitialUpdation } from './initial.message';
import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator';
import { WebSocketTypes } from '../../web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.BulkNotificationRead)
export class NotificationBulkReadUpdation extends InitialUpdation {
  handleUpdate({ paginationElements }, callbackAfterRead) {
    paginationElements.value = paginationElements.value.map((item) => {
      const findReadedElement = this.data.objects.includes(
        item.notification_id
      );
      if (findReadedElement) {
        item.isRead = true;
      }
      return item;
    });

    if (typeof callbackAfterRead === 'function') {
      callbackAfterRead();
    }
  }
}