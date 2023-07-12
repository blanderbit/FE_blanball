import { InitialChatMessage } from './initial.message';

import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.GetInfoAboutMeInChat)
export class GetInfoAboutMeInChatMessage extends InitialChatMessage {
  getUserInfoData() {
    return this.data.data;
  }
}
