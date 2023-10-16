import { i18n } from '@plugins/i18n.plugin';

export default {
  type_of_sport_dropdown: [
    {
      id: 0,
      name: i18n.global.t('football'),
      value: 'Football',
    },
    {
      id: 1,
      name: i18n.global.t('futsal'),
      value: 'Futsal',
    },
  ],
  tags: [
    {
      id: 0,
      text: i18n.global.t('all'),
      isActive: true,
    },
    {
      id: 1,
      text: i18n.global.t('players'),
      isActive: false,
    },
    {
      id: 2,
      text: i18n.global.t('events'),
      isActive: false,
    },
  ],
};
