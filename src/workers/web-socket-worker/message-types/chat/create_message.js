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
}
