import { InitialUpdation } from '../updation/initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.CreateMessage)
export class CreateChatMessage extends InitialUpdation {
  createNewMessageInChat({ paginationElements }, transformDataFunction) {
    const newMessageData = this.data.data.data.message_data;
    paginationElements.value.unshift(transformDataFunction(newMessageData));
  }

  updateChatInChatsList(paginationElements) {
    if (!this.isError) {
      const chatId = this.data.data.data.chat_id;
      const newMessageData = this.data.data.data.message_data;
      const createdMessageChat = paginationElements.find(
        (element) => element.id === chatId
      );
      createdMessageChat.unread_messages_count += 1;
      Object.assign(createdMessageChat.last_message, newMessageData);
    }
  }
}
