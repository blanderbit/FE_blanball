export default {
  contextMenuItems: [
    {
      id: 0,
      text: 'Створити подію',
      type: 'select',
    },
    {
      id: 1,
      text: 'Зайнятість інших',
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
};
