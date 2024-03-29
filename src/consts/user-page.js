import MaleIcon from '../assets/img/female-icon.svg';
import FemaleIcon from '../assets/img/male-icon.svg';
import UnisexIcon from '../assets/img/unisex.svg';

export default {
  months: {
    monthFromNumber: {
      '01': 'Січень',
      '02': 'Лютий',
      '03': 'Березень',
      '04': 'Квітень',
      '05': 'Травень',
      '06': 'Червень',
      '07': 'Липень',
      '08': 'Серпень',
      '09': 'Вересень',
      10: 'Жовтень',
      11: 'Листопад',
      12: 'Грудень',
    },
    numberFromMonth: {
      Січень: '01',
      Лютий: '02',
      Березень: '03',
      Квітень: '04',
      Травень: '05',
      Червень: '06',
      Липень: '07',
      Серпень: '08',
      Вересень: '09',
      Жовтень: '10',
      Листопад: '11',
      Грудень: '12',
    },
  },
  gender: [
    {
      value: 'Woman',
      iconSrc: FemaleIcon,
      name: 'Жінки',
    },
    {
      value: 'Man',
      iconSrc: MaleIcon,
      name: 'Чоловіки',
    },
    {
      value: 'All',
      iconSrc: UnisexIcon,
      name: 'Всі',
    },
  ],
};
