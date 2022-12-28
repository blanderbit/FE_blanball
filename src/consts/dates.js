export default {
  days: new Array(31).fill('l').map((i, idx) => ({ value: idx + 1, name: idx + 1})),
  months: [
    {
      value: 'Січня', 
      name: 'Січня'
    },
    {
      value: 'Лютого', 
      name: 'Лютого'
    },
    {
      value: 'Березня', 
      name: 'Березня'
    },
    {
      value: 'Квітня', 
      name: 'Квітня'
    },
    {
      value: 'Травня', 
      name: 'Травня'
    },
    {
      value: 'Червня', 
      name: 'Червня'
    },
    {
      value: 'Липня', 
      name: 'Липня'
    },
    {
      value: 'Серпня', 
      name: 'Серпня'
    },
    {
      value: 'Вересня', 
      name: 'Вересня'
    },
    {
      value: 'Жовтня', 
      name: 'Жовтня'
    },
    {
      value: 'Листопада', 
      name: 'Листопада'
    },
    {
      value: 'Грудня', 
      name: 'Грудня'
    }
  ],
  years: new Array(42).fill(1970).reduce((curr, next, idx) => {
    return [
      ...curr,
      { 
        value: next + idx,
        name: next + idx
      }
    ]
  }, [])
}