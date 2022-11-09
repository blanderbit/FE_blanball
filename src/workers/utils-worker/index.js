export const AxiosQuery = (params) => {
  params = typeof params === 'object' ? params : {};
  const filteredObject =  Object
    .keys(params)
    .filter(key => params[key])
    .reduce((acc, key) => ({
      ...acc,
      [key]: params[key],
    }), {});
  return {
    meta: 'AxiosQuery',
    data: filteredObject
  }
};

export const AxiosParams = (functionResult) => {
  const resultFromFunction = functionResult();
  const allParameters = {};
  if (resultFromFunction.meta.includes('AxiosQuery')) {
    allParameters.params = resultFromFunction.data
  }

  return allParameters;
};

export const createUniqueId = () => 'id' + Math.random().toString(16).slice(2);

export const createQueryStringFromObject = (objQuery) => Object
  .keys(objQuery)
  .map((key) => `${key}=${objQuery[key]}`)
  .join('&');

