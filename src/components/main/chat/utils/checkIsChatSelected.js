import { isEmpty } from 'lodash';

export function checkIsChatSelected(chatData) {
  return !isEmpty(chatData);
}
