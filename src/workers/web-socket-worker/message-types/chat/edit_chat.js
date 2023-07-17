import { InitialChatMessage } from './initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.EditChat)
export class EditGroupChatMessage extends InitialChatMessage {
  editChat(chatData) {
    if (!this.isError) {
      Object.assign(chatData.value, this.data.data.new_data);
    }
  }

  onError(errorType, callback) {
    super.onError(errorType, callback);
  }
}
