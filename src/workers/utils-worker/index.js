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