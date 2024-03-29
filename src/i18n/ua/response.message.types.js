export default {
  password_change: 'Ваш пароль було успішно змінено',
  phone_change: 'Ваш номер телефону було успішно змінено',
  email_change: 'Ваш імейл було успішно змінено',
  verified_change: 'Ваш обліковий запис було успішно верифіковано',
  account_deleted: 'Ваш обліковий запис було успішно видалено',
  password_reset: 'Ваш пароль було успішно змінено',
  sent_code_to_email: 'Код підтвердження був успішно відправлений на ваш імейл',
  account_already_verified: 'Обліковий запис вже верифіковано',
  invalid_configuration:
    'Перевірте правильність введених даних у полі "Конфіденційність"',
  invalid_get_planed_events:
    'Неправильно введені дані у полі "Конфедиційність - заплановані події" - при зміні профілю',
  age_over_80_years:
    'Наша система дає можливість вибрати вік не більше 80 років',
  age_less_6_years: 'Наша система дає можливість вибрати вік не менше 6 років',
  wrong_old_password: 'Перевірте правильність введеного поточногу паролю',
  passwords_do_not_match: 'Введені паролі не збігаються',
  invalid_credentials: 'Перевірте правильність введених даних',
  not_verified: 'Обліковий запис ще не верифікований',
  no_permissions: 'На жаль, у вас немає доступу до цієї дії',
  bad_verify_code: 'Перевірте правильність введеного коду підтвердження',
  verify_code_expired: 'Час дії цього коду підтвердження закінчився',
  email_already_in_use: 'Введена пошта вже використовується іншим користувачем',

  event_deleted: 'Подія була успішно видалена',
  event_updated: 'Подія була успішно оновлена',
  sent_request_to_participation:
    'Запит на участь був успішно надісланий автору події',
  join_to_event: 'Ви успішно підключилися до участі у цій події',
  disconnect_from_event:
    'Ви більше не перебуваєте у списку учасників цієї події',
  removed_user_from_event: 'Kористувач був успішно вилучений з події',
  sent_invite: 'Запрошення на подію було успішно надіслано',
  already_sent_request_to_participate:
    'Ви вже надіслали запит на участь у цій події',
  author_cant_enter_his_event:
    'На жаль, але ви не можете стати учасником або глядачем своєї події',
  bad_event_date_and_time:
    'Не валідна дата початку події, дата початку має бути більшою за поточну дату + 1 годину',
  already_like_member: 'Ви вже берете участь у цій події як гравець',
  already_like_fan: 'Ви вже берете участь у цій події як глядач',
  not_in_event_fans_list: 'Вас ще немає в списку глядачів цієї події',
  not_in_event_members_list: 'Вас ще немає в списку учасників цієї події',
  author_cannot_be_invited_to_his_event:
    'На жаль, але ви не можете запрошувати користувачів на цю подію',
  no_place: 'На жаль, але на цій події більше немає місць для участі',
  no_permissions_to_invite:
    'На жаль, але у вас немає прав запрошувати користувачів на цю подію',
  this_user_cant_be_invited:
    'Цей користувач не може бути запрошений на цю подію',
  price_description_required:
    'Якщо ви вказали ціну для події, то її обов`язково потрібно підкріпити описом',
  cant_invite_yourself:
    'На жаль, але ви не можете запрошувати самого себе на подію',
  nothing_found_for_request:
    'По вашому запиту з координатами нічого не було знайдено',

  all_notifications_deleted: 'Всі ваші нотифікації були успішно видалені',
  all_notifications_readed: 'Всі ваші нотифікації були успішно прочитані',
  cant_leave_review_about_yourself:
    'Ви не можете залишити відгук про самого себе',

  invalid_page: 'Такої сторінки не існує',
  not_found: '"{field}" - объект не был найден!',
  required: 'Поле "{field}" обов`язкове для заповнення',
  does_not_exist: '"{field}" - не існує',
  invalid_choice: 'Поле "{field}" Выбрано с неправильным значением!',
  unique: 'Поле "{field}" має бути унікальним',
  min_value: 'Ви ввели у значення менше мінімального для поля "{field}"',
  max_value: 'Ви ввели у значення більше максимального для поля "{field}"',
  blank: 'Поле "{field}" не может быть пустым!',

  authentication_credentials_were_not_provided:
    'Не предоставлены учетные данные для аутентификации',
  authentication_token_not_valid: 'Не валідний токен аутентифікації',
  bad_authentication_token: 'Не валідний токен аутентифікації',
  avatar_max_size_1_mb: 'Завантажене фото підвищує ліміт 1мб',
  profile_avatar_updated: 'Ваш аватар профілю був успішно оновлений',
  code_is_valid: 'Код для сбросу пароля валідний',
  phone_invalid_phone_number: 'Перевірте правильність введеного номера телефону',
  method_not_allowed: 'Метод http запиту заборонено',

  fields: {
    phone: 'Телефон',
    email: 'Почта',
    password: 'Пароль',
    re_password: 'Підтвердіть пароль',
    get_planned_events: 'Заплановані події',
    configuration: 'Конфіденційність',
    user: 'Користувач',
    event: 'Подія',
    notification: 'Нотифікація',
    profile: {
      place: {
        place_name: 'Адреса',
        lat: 'Адреса',
        lon: 'Адреса',
      },
      name: 'Ім`я',
      last_name: 'Прізвище',
      gender: 'Гендер',
      birthday: 'Дата народження',
      height: 'Зріст',
      weight: 'Вага',
      position: 'Позиція на полі',
      about_me: 'Про мене',
      working_leg: 'Робоча нога',
    },
  },
};
