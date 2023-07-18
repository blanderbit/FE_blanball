import ball_icon from '@images/ball-icon.svg';
import members from '@images/members.svg';
import couch from '@images/couch.svg';
import user_with_plus from '@images/add-user.svg';

export default {
  tabs: (eventData, userId) => {
    return [
      {
        id: 0,
        name: 'events.list-of-users',
        img: ball_icon,
        isDisabled: false,
        isShown: true,
      },
      {
        id: 1,
        name: 'events.registered-fans',
        img: members,
        isDisabled: false,
        isShown: true,
      },
      {
        id: 2,
        name: 'events.apps-for-participation',
        img: user_with_plus,
        isDisabled: false,
        isShown: eventData.privacy && userId === eventData.author.id,
      },
      {
        id: 3,
        name: 'events.couch-list',
        img: couch,
        isDisabled: true,
        isShown: true,
      },
    ];
  },
};
