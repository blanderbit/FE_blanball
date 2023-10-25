const monthNames = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const yearsToSkip = 7;
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
