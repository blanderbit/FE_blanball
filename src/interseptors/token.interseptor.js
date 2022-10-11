import { TokenWorker } from "../workers/token-worker";

export const TokenInterceptor = (request) => {
    const jwt = TokenWorker.getToken();

    if (jwt) {
        request.headers.Authorization = `Bearer ${jwt}`;
        request.headers.Accept = `application/json`
    }

    return request
};