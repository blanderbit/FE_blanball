const fullYear = new Date().getFullYear();
const lastAvailableYear = fullYear - 6;

export default {
  days: new Array(31).fill('l').map((i, k) => ({
    id: `${k >= 8 ? k + 1 : '0' + (k + 1)}`,
    value: k + 1,
    name: new String(k + 1),
  })),
  months: [
    {
      value: 'Січня',
      name: 'Січня',
    },
    {
      value: 'Лютого',
      name: 'Лютого',
    },
    {
      value: 'Березня',
      name: 'Березня',
    },
    {
      value: 'Квітня',
      name: 'Квітня',
    },
    {
      value: 'Травня',
      name: 'Травня',
    },
    {
      value: 'Червня',
      name: 'Червня',
    },
    {
      value: 'Липня',
      name: 'Липня',
    },
    {
      value: 'Серпня',
      name: 'Серпня',
    },
    {
      value: 'Вересня',
      name: 'Вересня',
    },
    {
      value: 'Жовтня',
      name: 'Жовтня',
    },
    {
      value: 'Листопада',
      name: 'Листопада',
    },
    {
      value: 'Грудня',
      name: 'Грудня',
    },
  ],
  years: Array.from({ length: 80 }, (v, k) => ({
    id: k,
    value: lastAvailableYear - k,
    name: new String(lastAvailableYear - k),
  })),
};
