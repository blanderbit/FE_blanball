import circleTick from '@images/tick-in-circle.svg';
import bucket from '@images/bucket.svg';
import pin from '@images/pin.svg';
import unpin from '@images/unpin.svg';
import edit from '@images/edit-gray.svg';
import { i18n } from '@plugins/i18n.plugin';

export default {
  sport_type_dropdown: [
    {
      id: 1,
      value: 'Football',
      name: i18n.global.t('event_page.football'),
    },
    {
      id: 2,
      value: 'Futsal',
      name: i18n.global.t('event_page.futsal'),
    },
  ],
  gender_dropdown: [
    {
      id: 0,
      value: 'men',
    },
    {
      id: 1,
      value: 'women',
    },
    {
      id: 2,
      value: 'all',
    },
  ],
  menu_text: (eventPinned) => [
    {
      id: 0,
      text: i18n.global.t('event_page.hightlight'),
      img: circleTick,
      type: 'select',
    },
    {
      id: 1,
      text: t('event_page.remove'),
      img: bucket,
      type: 'delete',
    },
    {
      id: 2,
      text: !eventPinned
        ? i18n.global.t('event_page.attach')
        : i18n.global.t('event_page.detach'),
      img: !eventPinned ? pin : unpin,
      type: !eventPinned ? 'pin' : 'unpin',
    },
    {
      id: 3,
      text: i18n.global.t('event_page.edit'),
      img: edit,
      type: 'edit',
    },
  ],
  status_ropdown: [
    {
      value: 'Planned',
      name: i18n.global.t('event_page.planned'),
    },
    {
      value: 'Active',
      name: i18n.global.t('event_page.active'),
    },
    {
      value: 'Finished',
      name: i18n.global.t('event_page.complete'),
    },
  ],
};
