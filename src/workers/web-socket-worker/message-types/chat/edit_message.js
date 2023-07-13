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

  editMessage(paginationElements) {
    if (!this.isError) {
      const messagesIDS = this.data.data.data.messages_ids;
      if (messagesIDS) {
        paginationElements.value = paginationElements.value.filter(
          (element) => !messagesIDS.includes(element.id)
        );
      }
    }
  }
}
