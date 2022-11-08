export const AxiosQuery = (e) => {
    return e
}

export const AxiosParams = (functionResult) => {
    const allParameters = {};
    if (functionResult.name.includes('AxiosQuery')) {
        allParameters.params = functionResult()
    }

    return allParameters;
};

export const createUniqueId = () => 'id' + Math.random().toString(16).slice(2);

export const createQueryStringFromObject = (objQuery) => Object
  .keys(objQuery)
  .map((key) => `${key}=${objQuery[key]}`)
  .join('&');