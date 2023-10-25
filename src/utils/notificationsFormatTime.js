import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

import { i18n } from '@plugins/i18n.plugin'

export function notifionsFormatTime() {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  dayjs.updateLocale('uk', {
    relativeTime: {
      future: i18n.global.t('note_format_time.future'),
      past: i18n.global.t('note_format_time.past'),
      s: i18n.global.t('note_format_time.s'),
      m: i18n.global.t('note_format_time.m'),
      mm: i18n.global.t('note_format_time.mm'),
      h: i18n.global.t('note_format_time.h'),
      hh: i18n.global.t('note_format_time.hh'),
      d: i18n.global.t('note_format_time.d'),
      dd: i18n.global.t('note_format_time.dd'),
      M: i18n.global.t('note_format_time.M'),
      MM: i18n.global.t('note_format_time.MM'),
      y:  i18n.global.t('note_format_time.y'),
      yy: i18n.global.t('note_format_time.yy'),
    },
  });
}
