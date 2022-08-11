export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blanball_client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@700&family=Inter:wght@400;500;600;700&family=Lato:wght@400;700&display=swap'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/i18n',
      {
        locales: ['ukr', 'en'],
        defaultLocale: 'ukr',
        vueI18n: {
          fallbackLocale: 'ukr',
          messages: {
            ukr: {
              events: {
                'title': 'Майбутні події',
                'general-events': 'Загальна',
                'my-events': 'Мої події',
                'subtitle' : 'Оновіть своє фото та персональні дані',
                'create-event' : 'Створити подію',
                'game-type' : 'Тип гри',
                'men': 'Чоловіки',
                'women': 'Жінки',
                'all': 'Всі',
                'calendar': 'Календар',
                'sorting': 'Сортування',
                'first-new': 'спочатку нові',
                'filters': 'Фільтри',
                'chose-date': 'Обрати дату',
                'friendly-match': 'Дружній матч',
                'football' : 'Футбол',
                'without-category' : 'Без розряду',
                'for-free': 'Безкоштовно',
                'players': 'Гравці',
                'fans': 'Вболівальники',
                'planned-events': 'Заплановані події',
                'your-events': 'Заходи у яких ви запланували участь',
                months: {
                  'January':	'Січень',
                  'February':	'Лютий',
                  'March':	'Березень',
                  'April':	'Квітень',
                  'May':	'Травень',
                  'June':	'Червень',
                  'July':	'Липень',
                  'August':	'Серпень',
                  'September': 'Вересень',
                  'October':	'Жовтень',
                  'November':	'Листопад',
                  'December':	'Грудень'
                }
              },
              profile: {
                'title': 'Особистий кабінет',
                'change-personal-data': 'Оновіть своє фото та персональні дані',
                'my-profile': 'Мій профіль',
                'rate-plan': 'Тарифний план',
                'notifications': 'Сповіщення',
                'your-rate': 'Ваш рейтинг',
                'sub-rate': 'Складається на основі оцінок інших користувачів',
                'generally': 'Узагальнено',
                'detailed': 'Детально',
                'about-myself': 'Про себе:',
                'safety': 'Безпека',
                'change-login&password': 'Ви можете змінити свій логін та пароль',
                'change-password': 'Змінити пароль',
                'delete-account': 'Видалити акаунт',
                'confidentiality': 'Конфіденційність',
                'set-personal-details': 'Налаштуйте видимість ваших персональних даних іншим користувачам',
                'phone-number': 'Номер телефону',
                'e-mail': 'E-mail',
                'my-feedbacks': 'Відгуки про мене',
                'personal-details': 'Особиста інформація'
              },
              modals: {
                change_number: {
                  'change-number': 'Зміна номера телефону',
                  'main-text': 'Тут Ви можете змінити номер телефону. Ваш акаунт і всі наявні дані будут перенесені на новий номер без втрати поточних налаштувань та інформації.',
                  'leave-email': 'Залишити поточний номер',
                  'change-number-title': 'Змінити номер',
                  'current-number': 'Поточний номер',
                  'new-number': 'Новий номер',
                  'sms-code': 'SMS із кодом підтвердження прийде протягом 30 сек'
                }
              },
              buttons: {
                'cancel-editing': 'Скасувати редагування',
                'save-changes': 'Зберегти зміни',
                'cancel': 'Скасувати',
                'save': 'Зберегти'
              }
            },
            en: {
              greeting: 'Hello world'
            }
          }
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
