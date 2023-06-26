import { InitialChatMessage } from './initial.message';

import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.GetChatMessagesList)
export class GetChatMessagesListChatMessage extends InitialChatMessage {
  handleUpdate({ paginationElements }) {
    const notificationForUpdate = paginationElements.value.find(
      (item) => item.notification_id === this.data.notification.id
    );
    if (notificationForUpdate) {
      notificationForUpdate.data.response = this.data.notification.response;
      notificationForUpdate.update(notificationForUpdate.data);
    }
  }
}
