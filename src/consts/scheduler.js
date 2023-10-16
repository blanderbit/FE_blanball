import { i18n } from '@plugins/i18n.plugin';

export default {
  contextMenuItems: [
    {
      id: 0,
      text: i18n.global.t('profile.create_event'),
      type: 'select',
    },
    {
      id: 1,
      text: i18n.global.t('profile.engagement_of_others'),
      type: 'read',
    },
  ],
  TABS_ENUM: {
    MY_PLANNED: 1,
    FRIENDS_PLANNED: 2,
  },

  USER_CARD_TYPE: {
    ME: 'me',
    FRIEND: 'friend',
  },

  SCHEDULER_ACTIVE_VIEWS: {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
    YEARS: 'years',
  },
};
