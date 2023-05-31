import { createI18n } from 'vue-i18n';
import { UA_LANGUAGE } from '../i18n/ua';

export const i18n = createI18n({
  locale: 'ua',
  allowComposition: true,
  messages: {
    ua: UA_LANGUAGE,
  },
});
