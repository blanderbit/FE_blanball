export default {
  days: new Array(31).fill('l').map((i, idx) => ({ value: idx + 1})),
  months: [
    {value: 'Січня'},
    {value: 'Лютого'},
    {value: 'Березня'},
    {value: 'Квітня'},
    {value: 'Травня'},
    {value: 'Червня'},
    {value: 'Липня'},
    {value: 'Серпня'},
    {value: 'Вересня'},
    {value: 'Жовтня'},
    {value: 'Листопада'},
    {value: 'Грудня'}
  ],
  years: new Array(42).fill(1970).reduce((curr, next, idx) => {
    return [
      ...curr,
      { value: next + idx }
    ]
  }, [])
}