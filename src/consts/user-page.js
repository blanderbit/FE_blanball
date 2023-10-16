import MaleIcon from '@images/female-icon.svg';
import FemaleIcon from '@images/male-icon.svg';
import UnisexIcon from '@images/unisex.svg';
import { i18n } from '@plugins/i18n.plugin';

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
      //TODO: refactor to avoid object keys in Ukrainian
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
      name: i18n.global.t('user_page.women'),
    },
    {
      value: 'Man',
      iconSrc: MaleIcon,
      name: i18n.global.t('user_page.men'),
    },
    {
      value: 'All',
      iconSrc: UnisexIcon,
      name: i18n.global.t('user_page.all'),
    },
  ],
};
