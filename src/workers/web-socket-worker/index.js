import {WebSocketWorker} from "./web.socket.worker";
import './message-types/notifications'

export const WebSocketWorkerInstance = new WebSocketWorker({
    SOCKET_URL: `${process.env.WS_BASE_URL}/my/notifications/?token=`
    // SOCKET_URL: 'ws://178.151.201.167:49299/my/notifications/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4MjY1NTg2LCJpYXQiOjE2NjY1Mzc1ODYsImp0aSI6IjM0NTBkNTAyZDg4YzQ0MTE5MzRkZmVjM2VlYmQwMTg2IiwidXNlcl9pZCI6Mn0.ncoSnCTYrqoeXzKZ5meI8f--rkwpImJfx2b3P2duv4w'
});

