import { InitialChatMessage } from './initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.RemoveUserFromChat)
export class RemoveUserFromChat extends InitialChatMessage {
  removeUserFromChat(paginationElements) {
    if (!this.isError) {
      const userId = this.data.data.removed_user_id;
      paginationElements.value = paginationElements.value.filter(
        (element) => element.id !== userId
      );
    }
  }
}
