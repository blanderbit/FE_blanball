import { i18n } from '@plugins/i18n.plugin';

const PRIVACY_POLICY_ITEMS = [
  {
    elementId: 'automatic-collection-of-information',
    text: i18n.global.t('policy.automatic_information_collection'),
  },
  {
    elementId: 'collection-of-personal-information',
    text: i18n.global.t('policy.personal_information_collection'),
  },
  {
    elementId: 'privacy-of-children',
    text: i18n.global.t('policy.children_privacy'),
  },
  {
    elementId: 'using-and-collection-information',
    text: i18n.global.t('policy.information_use_and_processing'),
  },
  {
    elementId: 'managing-information',
    text: i18n.global.t('policy.information_management'),
  },
  {
    elementId: 'disclosure-of-information',
    text: i18n.global.t('policy.information_disclosure'),
  },
  {
    elementId: 'retention-of-information',
    text: i18n.global.t('policy.information_storage'),
  },
  {
    elementId: 'do-not-track-signals',
    text: i18n.global.t('policy.do_not_track_signals'),
  },
  {
    elementId: 'social-media-features',
    text: i18n.global.t('policy.social_network_functions'),
  },
  {
    elementId: 'links-to-other-resources',
    text: i18n.global.t('policy.links_to_other_resources'),
  },
  {
    elementId: 'information-security',
    text: i18n.global.t('policy.informational_security'),
  },
  {
    elementId: 'data-breach',
    text: i18n.global.t('policy.data_protection_breach'),
  },
  {
    elementId: 'changes-and-amendments',
    text: i18n.global.t('policy.changes_and_amendments'),
  },
  {
    elementId: 'acceptance-of-this-policy',
    text: i18n.global.t('policy.adoption_of_this_policy'),
  },
  {
    elementId: 'contacting-us',
    text: i18n.global.t('policy.contact_us'),
  },
];

const DISCLAMER_ITEMS = [
  {
    elementId: 'representation',
    text: i18n.global.t('policy.representation'),
  },
  {
    elementId: 'content-and-postings',
    text: i18n.global.t('policy.content_and_publications'),
  },
  {
    elementId: 'reviews-and-testimonials',
    text: i18n.global.t('policy.reviews_and_recommendations'),
  },
  {
    elementId: 'indemnification-and-warranties',
    text: i18n.global.t('policy.indemnification_and_warranties'),
  },
  {
    elementId: 'changes-and-amendments',
    text: i18n.global.t('policy.changes_and_amendments'),
  },
  {
    elementId: 'acceptance-of-this-disclaimer',
    text: i18n.global.t('policy.acceptance_of_refusal'),
  },
  {
    elementId: 'contacting-us',
    text: i18n.global.t('policy.contact_us'),
  },
];

const COOKIE_POLICY_ITEMS = [
  {
    elementId: 'what-are-cookies',
    text: i18n.global.t('policy.what_are_cookies'),
  },
  {
    elementId: 'what-type-of-cookies-do-we-use',
    text: i18n.global.t('policy.what_type_of_cookies_do_we_use'),
  },
  {
    elementId: 'changes-and-amendments',
    text: i18n.global.t('policy.changes_and_additions'),
  },
  {
    elementId: 'acceptance-of-this-policy',
    text: i18n.global.t('policy.acceptance_of_this_policy'),
  },
  {
    elementId: 'contacting-us',
    text: i18n.global.t('policy.contact_us'),
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
