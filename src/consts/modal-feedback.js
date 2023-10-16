import Emoji_1 from '@images/emojies/1.svg';
import Emoji_2 from '@images/emojies/2.svg';
import Emoji_3 from '@images/emojies/3.svg';
import Emoji_4 from '@images/emojies/4.svg';
import Emoji_5 from '@images/emojies/5.svg';
import { i18n } from '@plugins/i18n.plugin';

import dayjs from 'dayjs';

export default {
  steps(eventData) {
    const calculateEventEndTime = () => {
      const eventDurationMS = eventData?.duration * 60 * 1000;
      const eventDateTime = new Date(eventData?.date_and_time);

      eventDateTime.setTime(eventDateTime.getTime() + eventDurationMS);
      return dayjs(eventDateTime).format('DD MM YYYY HH:mm');
    };

    return [
      {
        id: 0,
        title: i18n.global.t(
          'modal_feedback.leave_feedback_about_friendly_match'
        ),
        subtitle: `${calculateEventEndTime()} ${i18n.global.t(
          'modal_feedback.you_took_part_in_event'
        )} «${eventData.name}», ${i18n.global.t(
          'modal_feedback.share_your_impressions'
        )}`,
        buttons: {
          cancel: i18n.global.t('modal_feedback.estimate_venue'),
          next: i18n.global.t('modal_feedback.leave_feedback'),
        },
        isOpened: true,
      },
      {
        id: 1,
        title: i18n.global.t('modal_feedback.venue'),
        subtitle: `${i18n.global.t('modal_feedback.remind_later')} «${
          eventData?.place?.place_name
        }»`,
        emojies: [
          { id: 1, emoji: Emoji_1, step: 1 },
          { id: 2, emoji: Emoji_2, step: 1 },
          { id: 3, emoji: Emoji_3, step: 1 },
          { id: 4, emoji: Emoji_4, step: 1 },
          { id: 5, emoji: Emoji_5, step: 1 },
        ],
        buttons: {
          cancel: i18n.global.t('modal_feedback.back'),
          next: i18n.global.t('modal_feedback.estimate'),
        },
        isOpened: true,
      },
      {
        id: 2,
        title: i18n.global.t('modal_feedback.referee_work_quality'),
        subtitle: i18n.global.t('modal_feedback.was_refereeing_just'),
        emojies: [
          { id: 1, emoji: Emoji_1, step: 2 },
          { id: 2, emoji: Emoji_2, step: 2 },
          { id: 3, emoji: Emoji_3, step: 2 },
          { id: 4, emoji: Emoji_4, step: 2 },
          { id: 5, emoji: Emoji_5, step: 2 },
        ],
        buttons: {
          cancel: i18n.global.t('modal_feedback.back'),
          next: i18n.global.t('modal_feedback.estimate'),
        },
        isOpened: true,
      },
      {
        id: 3,
        title: i18n.global.t('modal_feedback.organization_level'),
        subtitle: `${i18n.global.t(
          'modal_feedback.event_start_punctuality'
        )} / ${i18n.global.t(
          'modal_feedback.compliance_of_event_with_description'
        )} / ${i18n.global.t(
          'modal_feedback.organizer_work_quality_of_event'
        )}`,
        emojies: [
          { id: 1, emoji: Emoji_1, step: 3 },
          { id: 2, emoji: Emoji_2, step: 3 },
          { id: 3, emoji: Emoji_3, step: 3 },
          { id: 4, emoji: Emoji_4, step: 3 },
          { id: 5, emoji: Emoji_5, step: 3 },
        ],
        buttons: {
          cancel: i18n.global.t('modal_feedback.back'),
          next: i18n.global.t('modal_feedback.estimate'),
        },
        isOpened: true,
      },
      {
        id: 4,
        title: i18n.global.t('modal_feedback.would_you_like_to_leave_comment'),
        subtitle: i18n.global.t('modal_feedback.describe_your_impressions'),
        buttons: {
          cancel: i18n.global.t('modal_feedback.back'),
          next: i18n.global.t('modal_feedback.send_feedback'),
        },
        isOpened: true,
      },
      {
        id: 5,
        title: i18n.global.t('modal_feedback.thank_you'),
        subtitle: i18n.global.t('modal_feedback.point_that_you_left'),
        last_subtitle: i18n.global.t(
          'modal_feedback.we_aspire_to_become_better'
        ),
        isOpened: true,
      },
    ];
  },
  players: {
    team_1: new Array(11).fill('l').map((item, idx) => {
      return {
        id: idx,
        label: 'НПЗ',
        name: 'Дмитро Горбачевський',
        rate: 3,
        color: '#D62953',
      };
    }),
    team_2: new Array(11).fill('l').map((item, idx) => {
      return {
        id: idx,
        label: 'НПЗ',
        name: 'Дмитро Горбачевський',
        rate: 3,
        color: '#2946E1',
      };
    }),
  },
};
