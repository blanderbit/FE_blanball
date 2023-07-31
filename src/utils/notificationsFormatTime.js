import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

export function notifionsFormatTime() {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  dayjs.updateLocale('uk', {
    relativeTime: {
      future: 'через %s',
      past: '%s тому',
      s: 'дeкілька c.',
      m: 'хв.',
      mm: '%d хв.',
      h: 'год.',
      hh: '%d год.',
      d: '1 дн.',
      dd: '%d дн.',
      M: 'м.',
      MM: '%d м.',
      y: 'р.',
      yy: '%d р.',
    },
  });
}
