import { AuthWebSocketWorker, GeneralWebSocketWorker } from "./web.socket.worker";

import './message-types/notifications'
import './message-types/updation'
import './message-types/general'

export const AuthWebSocketWorkerInstance = new AuthWebSocketWorker({
    SOCKET_URL: `${process.env.WS_BASE_URL}/ws/notifications/`
});


export const GeneralSocketWorkerInstance = new GeneralWebSocketWorker({
    SOCKET_URL: `${process.env.WS_BASE_URL}/ws/general/`
});
