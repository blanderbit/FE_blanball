import { TokenServiceWorker } from './token.worker';

export const accessToken = new TokenServiceWorker();
export const refreshToken = new TokenServiceWorker();

accessToken.setKeyName('accessToken');
refreshToken.setKeyName('refreshToken');