import { HINTS_DATA } from './hints.data';

export const getHintDataByName = (hintName) => {
  return Object.values(HINTS_DATA).find((hint) => hint.name === hintName);
};
