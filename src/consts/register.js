export default {
  days: new Array(31).fill('l').map((i, idx) => ({
    id: idx, 
    value: idx + 1
  })),
  months: Array.from({ length: 12 }, (v,k) => ({
    id: k,
    value: 'Июль'
  })),
  years: Array.from({ length: 23 }, (v,k) => ({
    id: k,
    value: 2000 + k
  })),
  cities: ['Воркута', 'Колыма', 'Магадан', 'Махачкала']
          .map((item, idx) => ({ id: idx, value: item })),
  district: ['Степок', 'Погребок', 'Ромашка', 'Грибок']
            .map((item, idx) => ({ id: idx, value: item })),
}