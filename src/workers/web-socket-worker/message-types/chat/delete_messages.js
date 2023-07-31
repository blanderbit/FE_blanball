import { InitialChatMessage } from './initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.DeleteMesssages)
export class DeleteChatMessagesMessage extends InitialChatMessage {
  deleteMessage(paginationElements) {
    if (!this.isError) {
      const messagesIDS = this.data.data.messages_ids;
      if (messagesIDS) {
        paginationElements.value = paginationElements.value.filter(
          (element) => !messagesIDS.includes(element.id)
        );
      }
    }
  }
}
