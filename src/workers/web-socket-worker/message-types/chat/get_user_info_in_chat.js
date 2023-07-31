import { InitialChatMessage } from './initial.message';

import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.GetChatDetailData)
export class GetChatDetailDataMessage extends InitialChatMessage {
  getUserInfoData() {
    return this.data.data.request_user_data;
  }
  getChatInfoData() {
    return this.data.data.chat_data;
  }

  onError(errorType, callback) {
    super.onError(errorType, callback);
  }
}
