import { AuthWebSocketWorkerInstance } from '../web-socket-worker';
import {
  MessageActionDataTypes,
  MessageActionTypes,
} from '../../workers/web-socket-worker/message.action.types';
import { DETAILS_TYPE_ENUM_VALUES } from '../type-request-message-worker';

export const AxiosQuery = (params) => {
  params = typeof params === 'object' ? params : {};
  const filteredObject = Object.keys(params)
    .filter((key) => params[key])
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: params[key],
      }),
      {}
    );

  // Object.entries(filteredObject).forEach(([key, value]) => {
  //   if (filterValidation[key]?.action(value)) {
  //     filteredObject[key] = filterValidation[key]?.action(value)
  //   }
  // });

  return {
    meta: 'AxiosQuery',
    data: filteredObject,
  };
};

export const AxiosSkipErrorMessageType = (enumList = []) => {
  enumList = enumList.filter((enumKey) =>
    DETAILS_TYPE_ENUM_VALUES.includes(enumKey)
  );
  return {
    meta: 'AxiosSkipErrorMessageType',
    data: enumList,
  };
};

export const AxiosParams = (...results) => {
  const allParameters = {};

  results.forEach((resultFromFunction) => {
    if (resultFromFunction.meta.includes('AxiosQuery')) {
      allParameters.params = resultFromFunction.data;
    } else if (resultFromFunction.meta.includes('AxiosSkipErrorMessageType')) {
      allParameters.skipErrorMessageType = resultFromFunction.data;
    }
  });

  return allParameters;
};

export const createQueryStringFromObject = (objQuery) => {
  if (typeof objQuery !== 'object') {
    return '';
  }

  const elements = Object.keys(objQuery).map(
    (key) => `${key}=${objQuery[key]}`
  );
  return elements.length ? '?' + elements.join('&') : '';
};

const fakeFunc = () => {};
export const checkIfFunction = (method) =>
  typeof method === 'function' ? method : fakeFunc;

export const createNotificationFromData = (message) => {
  message.notification_id = message.id;
  const constructor = AuthWebSocketWorkerInstance?.messages?.find(
    (item) => item.messageType === message.message_type
  );

  if (constructor) {
    return new constructor(message);
  }
};

export const notificationButtonHandlerMessage = async ({
  button,
  notificationInstance,
  activeNotification,
  router,
}) => {
  if (activeNotification) {
    activeNotification.value = notificationInstance.notification_id;
  }
  if (button.actionType === MessageActionDataTypes.Url) {
    router.push(button.action);
  }

  if (button.actionType === MessageActionDataTypes.UrlCallback) {
    router.push(button.action({ router, notificationInstance }));
  }

  if (button.actionType === MessageActionDataTypes.Callback) {
    await button.action({ notificationInstance });
  }

  if ([MessageActionTypes.Close].includes(button.type)) {
    notificationInstance.readAfterActiveActionCallBack(notificationInstance);
  } else if (
    [MessageActionTypes.ActionClose, MessageActionTypes.Action].includes(
      button.type
    )
  ) {
    notificationInstance.deleteAfterActiveActionCallBack(notificationInstance);
  }
  if (activeNotification) {
    activeNotification.value = 0;
  }
};
