import OpenAPIClientAxios from 'openapi-client-axios';
import swaggerJson from '../../../swagger.json';

if(!process.env.API_BASE_URL) {
    throw new Error(`Please create .env (npm run create:env) and change variable correctly, focus on API_BASE_URL`);
}

const excludedMethods = [
    "request",
    "getUri",
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch",
    "defaults",
    "interceptors",
    "create",
    "paths",
    "api"
];

const getAvailableMethods = (instance = {}, skippedMethods = []) => {
    if(!instance) return [];
    return Object
        .keys(instance)
        .filter(key => !skippedMethods.find(item => item === key))
};

const updateMethodName = (e) => { // TODO will use or delete a bit later
    return e
}
const updateMethod = (e, operationToTransform) => { // TODO will use or delete a bit later
    return e
}

export const apiOpenClient = new OpenAPIClientAxios({
    withServer: {
        url: process.env.API_BASE_URL
    },
    definition: swaggerJson,
    transformOperationName: updateMethodName,
    transformOperationMethod: updateMethod,
});


export class API {
    static excludedMethods = excludedMethods;
    static apiClient = apiOpenClient.initSync();
    static availableMethods = getAvailableMethods(apiOpenClient.instance, excludedMethods);
    static apiOpenClient = apiOpenClient;
}

