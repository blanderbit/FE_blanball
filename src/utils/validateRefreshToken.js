import { refreshToken } from '../workers/token-worker';
import { API } from '../workers/api-worker/api.worker';
import { sessionExpired } from './sessionExpired';

export const validateRefreshToken = async () => {
  try {
    await API.AuthorizationService.ValidateRefreshToken({
      refresh: refreshToken.getToken(),
    });
  } catch (err) {
    if (err.code === 400) {
      sessionExpired();
    }
  }
};
