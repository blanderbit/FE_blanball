import ball_icon from '../assets/img/ball-icon.svg';
import members from '../assets/img/members.svg';
import couch from '../assets/img/couch.svg';
import user_with_plus from '../assets/img/add-user.svg';

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
