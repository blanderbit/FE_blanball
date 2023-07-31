import { InitialChatMessage } from './initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.SetOrUnsetChatAdmin)
export class SetOrUnsetChatAdminMessage extends InitialChatMessage {
  setOrUnsetAdmin(paginationElements) {
    if (!this.isError) {
      const userId = this.data.data.user_id;
      const action = this.data.data.action;
      const foundUser = paginationElements.value.find(
        (element) => element.id == userId
      );
      foundUser.admin = action == 'set';
    }
  }

  onError(errorType, callback) {
    super.onError(errorType, callback);
  }
}
