import { InitialChatMessage } from './initial.message';

import {
  SetMessageType,
  AuthWebSocketMessage,
  UpdateWebSocketMessage,
} from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';
import { useChatDataStore } from '../../../../stores/chatData';
import { pinia } from '../../../../plugins/pinia.plugin';

@AuthWebSocketMessage()
@UpdateWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.OffOrOnPushNotifications)
export class OffOrOnChatPushNotificationsMessage extends InitialChatMessage {
  offOrOnChatPushNotifications(chatDataStore) {
    if (!this.isError) {
      chatDataStore.$patch({
        infoAboutMe: {
          ...chatDataStore.infoAboutMe,
          push_notifications: this.data.data.action == 'on',
        },
      });
    }
  }
}
