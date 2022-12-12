export const DETAILS_TYPE_ENUM = {
  PASSWORD_CHANGE: 'password_change',
  PHONE_CHANGE: 'phone_change',
  EMAIL_CHANGE: 'email_change',
  VERIFIED_CHANGE: 'verified_account',
  ACCOUNT_DELETED: 'account_deleted',
  PASSWORD_RESET: 'password_reset',
  SENT_CODE_TO_EMAIL: 'sent_code_to_email',
  ACCOUNT_ALREADY_VERIFIED: 'account_already_verified',
  INVALID_CONFIGURATION: 'invalid_configuration',
  INVALID_GET_PLANED_EVENTS: 'invalid_get_planned_events',
  AGE_OVER_80_YEARS: 'age_over_80_years',
  AGE_LESS_6_YEARS: 'age_less_6_years',
  WRONG_OLD_PASSWORD: 'wrong_old_password',
  PASSWORDS_DO_NOT_MATCH: 'passwords_do_not_match',
  INVALID_CREDENTIALS: 'invalid_credentials',
  NOT_VERIFIED: 'not_verified',
  NO_PERMISSIONS: 'no_permissions',
  BAD_VERIFY_CODE: 'bad_verify_code',
  VERIFY_CODE_EXPIRED: 'verify_code_expired',
  EMAIL_ALREADY_IN_USE: 'email_already_in_use',

  EVENT_DELETED: 'event_deleted',
  EVENT_UPDATED: 'event_updated',
  SENT_REQUEST_TO_PARTICIPATION: 'sent_request_to_participation',
  JOIN_TO_EVENT: 'join_to_event',
  DISCONNECT_FROM_EVENT: 'dicsonnect_from_event',
  REMOVED_USER_FROM_EVENT: 'removed_user_from_event',
  SENT_INVITE: 'sent_invite',
  ALREADY_SENT_REQUEST_TO_PARTICIPATE: 'already_sent_request_to_participate',
  AUTHOR_CANT_ENTER_HIS_EVENT: 'author_cant_enter_his_event',
  BAD_EVENT_DATE_AND_TIME: 'bad_event_date_time',
  ALREADY_LIKE_MEMBER: 'already_like_member',
  ALREADY_LIKE_FAN: 'already_like_fan',
  NOT_IN_EVENT_FANS_LIST: 'not_in_event_fans_list',
  NOT_IN_EVENT_MEMBERS_LIST: 'not_in_event_members_list',
  AUTHOR_CANNOT_BE_INVITED_TO_HIS_EVENT: 'author_cannot_be_invited_to_his_event',
  NO_PLACE: 'no_place',
  NO_PERMISSIONS_TO_INVITE: 'no_permissions_to_invite',
  THIS_USER_CANT_BE_INVITED: 'this_user_cannot_be_invited',
  PRICE_DESCRIPTION_REQUIRED: 'price_description_required',
  CANT_INVITE_YOURSELF: 'cant_invite_yourself',
  NOTHING_FOUND_FOR_REQUEST: 'nothing_found_for_request',

  MAINTENANCE_UPDATE: 'maintenance_updated',
  ALL_NOTIFICATIONS_DELETED: 'all_notifications_deleted',
  ALL_NOTIFICATIONS_READED: 'all_notifications_readed',
  CANT_UPDATE_MAINTENANCE: 'cant_update_maintenance',
  CANT_GET_MAINTENANCE: 'cant_get_maintenance',

  CANT_LEAVE_REVIEW_ABOUT_YOURSELF: 'cant_leave_review_about_yourself',

  INVALID_PAGE: 'invalid_page',
  NOT_FOUND: 'filed:_not_found',
  REQUIRED: 'filed:_required',
  DOES_NOT_EXIST: 'filed:_does_not_exist',
  INVALID_CHOICE: 'filed:_invalid_choice',
  UNIQUE: 'filed:_unique',
  MIN_VALUE: 'filed:_min_value',
  MAX_VALUE: 'filed:_max_value',
};

export const DETAILS_TYPE_ENUM_VALUES = Object
  .values(DETAILS_TYPE_ENUM);

export const DETAILS_TYPE_ENUM_KEYS = Object
  .keys(DETAILS_TYPE_ENUM);

const excludeColumnParameter = (key) => {
  const elements = key?.split(':') || [key];

  return {
    field: elements.length > 1 && elements[0],
    type: elements.length > 1 ? elements[1] : key
  }
};

const excludeOneRowParam = (typeInitial, typeCounted) => {
  return typeInitial?.replace(typeCounted, '');
};

const detectMessageByKey = (type) => {
  const foundKey = DETAILS_TYPE_ENUM_KEYS
    .find(key => {
      return type.includes(excludeColumnParameter(DETAILS_TYPE_ENUM[key]).type)
    });

  return foundKey || 'FE:DETAIL_NOT_FOUND';
};

export const TypeRequestMessageWorker = (result = {}) => {
  if(result?.status === 'success') {
    return [result.message].map((detail) => {
      return {
        errorType: detectMessageByKey(detail)
      }
    })
  } else if (result?.status === 'error'){
    return result?.data?.errors?.map((error) => {
      const detectedType = detectMessageByKey(error.detail);
      const excludedColumnParameter = excludeColumnParameter(DETAILS_TYPE_ENUM[detectedType]);
      return {
        errorType: detectedType,
        field: excludedColumnParameter.field && excludeOneRowParam(error.detail, excludedColumnParameter.type)
      }
    }) || []
  }
  return [];
};