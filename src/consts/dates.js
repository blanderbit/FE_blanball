import { i18n } from '@plugins/i18n.plugin'

const monthNames = [
  i18n.global.t('dates.january'),
  i18n.global.t('dates.february'),
  i18n.global.t('dates.march'),
  i18n.global.t('dates.april'),
  i18n.global.t('dates.may'),
  i18n.global.t('dates.june'),
  i18n.global.t('dates.july'),
  i18n.global.t('dates.august'),
  i18n.global.t('dates.september'),
  i18n.global.t('dates.october'),
  i18n.global.t('dates.november'),
  i18n.global.t('dates.december'),
];

const yearsToSkip = 7
const fullYear = new Date().getFullYear();
const lastAvailableYear = fullYear - yearsToSkip;

export default {
  monthNames,
  days: new Array(31).fill('l').map((i, k) => ({
    id: `${k >= 8 ? k + 1 : '0' + (k + 1)}`,
    value: k + 1,
    name: new String(k + 1),
  })),
  months: Array.from({ length: 12 }, (v, k) => ({
    id: `${k > 8 ? k + 1 : '0' + (k + 1)}`,
    value: monthNames[k],
  })),
  years: Array.from({ length: 81 - yearsToSkip }, (v, k) => ({
    id: k,
    value: lastAvailableYear - k,
    name: new String(lastAvailableYear - k),
  })),
};
