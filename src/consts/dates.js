export default {
  days: new Array(31).fill('l').map((i, idx) => ({ value: idx + 1})),
  months: [
    {value: 'Січень'},
    {value: 'Лютий'},
    {value: 'Березень'},
    {value: 'Квітень'},
    {value: 'Травень'},
    {value: 'Червень'},
    {value: 'Липень'},
    {value: 'Серпень'},
    {value: 'Вересень'},
    {value: 'Жовтень'},
    {value: 'Листопад'},
    {value: 'Грудень'}
  ],
  years: new Array(42).fill(1970).reduce((curr, next, idx) => {
    return [
      ...curr,
      { value: next + idx }
    ]
  }, [])
}