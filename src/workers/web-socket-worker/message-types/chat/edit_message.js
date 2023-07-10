import { InitialUpdation } from '../updation/initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.EditMessage)
export class EditChatMessageMessage extends InitialUpdation {
  editMessage() {
    console.log(this.data)
  }
}
