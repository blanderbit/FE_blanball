import { InitialChatMessage } from './initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.AddUserToChat)
export class AddUserToChatMessage extends InitialChatMessage {
  addUserToChat(paginationElements) {
    if (!this.isError) {
      const newUserData = this.data.data.new_user_data;
      paginationElements.value.unshift(newUserData);
    }
  }

  createNewUserJoinedChatServiceMessage(paginationElements) {
    if (!this.isError) {
      const newServiceMessageData = this.data.data.service_message;
      paginationElements.value.unshift(newServiceMessageData);
    }
  }
}
