import { InitialChatMessage } from './initial.message';

import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator';

import { ChatWebSocketTypes } from './web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.GetChatsList)
export class GetChatsListChatMessage extends InitialChatMessage {}
