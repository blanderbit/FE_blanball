import {
  AuthWebSocketWorker,
  GeneralWebSocketWorker,
} from './web.socket.worker';

import './message-types/notifications';
import './message-types/updation';
import './message-types/general';
import './message-types/chat';

export const AuthWebSocketWorkerInstance = new AuthWebSocketWorker({
  SOCKET_URL: `${process.env.WS_BASE_URL}/notifications/`,
});

export const GeneralSocketWorkerInstance = new GeneralWebSocketWorker({
  SOCKET_URL: `${process.env.WS_BASE_URL}/general/`,
});

export const ChatSocketWorkerInstance = new AuthWebSocketWorker({
  SOCKET_URL: `${process.env.WS_BASE_URL}/chat/`,
});
