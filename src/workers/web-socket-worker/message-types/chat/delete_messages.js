import { InitialUpdation } from '../updation/initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.DeleteMesssages)
export class DeleteChatMessagesMessage extends InitialUpdation {
  deleteMessage() {
    console.log(this.data);
  }
}
