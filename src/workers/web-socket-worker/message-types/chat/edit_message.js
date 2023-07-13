import { InitialChatMessage } from './initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.EditMessage)
export class EditChatMessageMessage extends InitialChatMessage {
  editMessage(paginationElements) {
    if (!this.isError) {
      const editedMessageId = this.data.data.message_data.id;
      if (editedMessageId) {
        const editedMessage = paginationElements.value.find(
          (element) => element.id === editedMessageId
        );
        if (editedMessage) {
          Object.assign(editedMessage, this.data.data.message_data);
        }
      }
    }
  }

  onError(errorType, callback) {
    super.onError(errorType, callback);
  }
}
