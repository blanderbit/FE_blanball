const PRIVACY_POLICY_ITEMS = [
  {
    elementId: 'automatic-collection-of-information',
    text: 'Автоматичний збір інформації',
  },
  {
    elementId: 'collection-of-personal-information',
    text: 'Збір особистої інформації',
  },
  {
    elementId: 'privacy-of-children',
    text: 'Конфіденційність дітей',
  },
  {
    elementId: 'using-and-collection-information',
    text: 'Використання та обробка зібраної інформації',
  },
  {
    elementId: 'managing-information',
    text: 'Управління інформацією',
  },
  {
    elementId: 'disclosure-of-information',
    text: 'Розкриття інформації',
  },
  {
    elementId: 'retention-of-information',
    text: 'Зберігання інформації',
  },
  {
    elementId: 'do-not-track-signals',
    text: 'Сигнали про НЕ відстеження',
  },
  {
    elementId: 'social-media-features',
    text: 'Функції соціальних мереж',
  },
  {
    elementId: 'links-to-other-resources',
    text: 'Посилання на інші ресурси',
  },
  {
    elementId: 'information-security',
    text: 'Інформаційна безпека',
  },
  {
    elementId: 'data-breach',
    text: 'Порушення захисту даних',
  },
  {
    elementId: 'changes-and-amendments',
    text: 'Зміни та поправки',
  },
  {
    elementId: 'acceptance-of-this-policy',
    text: 'Прийняття цієї політики',
  },
  {
    elementId: 'contacting-us',
    text: "Зв'язок з нами",
  },
];

const DISCLAMER_ITEMS = [
  {
    elementId: 'representation',
    text: 'Представництво',
  },
  {
    elementId: 'content-and-postings',
    text: 'Вміст та публікації',
  },
  {
    elementId: 'reviews-and-testimonials',
    text: 'Відгуки та рекомендації',
  },
  {
    elementId: 'indemnification-and-warranties',
    text: 'Компенсація та гарантії',
  },
  {
    elementId: 'changes-and-amendments',
    text: 'Зміни та поправки',
  },
  {
    elementId: 'acceptance-of-this-disclaimer',
    text: 'Прийняття цієї відмови',
  },
  {
    elementId: 'contacting-us',
    text: "Зв'язок з нами",
  },
];

const COOKIE_POLICY_ITEMS = [
  {
    elementId: 'what-are-cookies',
    text: 'Що таке cookies?',
  },
  {
    elementId: 'what-type-of-cookies-do-we-use',
    text: 'Які типи файлів cookie ми використовуємо?',
  },
  {
    elementId: 'changes-and-amendments',
    text: 'Зміни та доповнення',
  },
  {
    elementId: 'acceptance-of-this-policy',
    text: 'Прийняття цієї політики',
  },
  {
    elementId: 'contacting-us',
    text: "Зв'язок з нами",
  },
];

const POLICY_ITEMS_TYPES = {
  PRIVACY: 'privacy',
  COOKIE: 'cookie',
  DISCLAMER: 'disclamer',
};

const ALL_POLICY_ITEMS = [
  {
    id: 1,
    text: 'policy.privacy-policy',
    type: POLICY_ITEMS_TYPES.PRIVACY,
  },
  {
    id: 2,
    text: 'policy.cookie-policy',
    type: POLICY_ITEMS_TYPES.COOKIE,
  },
  {
    id: 3,
    text: 'policy.disclamer',
    type: POLICY_ITEMS_TYPES.DISCLAMER,
  },
];

export default {
  PRIVACY_POLICY_ITEMS,
  DISCLAMER_ITEMS,
  ALL_POLICY_ITEMS,
  POLICY_ITEMS_TYPES,
  COOKIE_POLICY_ITEMS,
};
