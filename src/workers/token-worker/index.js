import { TokenServiceWorker } from "./token.worker";

export const TokenWorker = new TokenServiceWorker();

TokenWorker.setKeyName('token');