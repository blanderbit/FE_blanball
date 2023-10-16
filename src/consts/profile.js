import userIcon from '@images/user-icon.svg';
import databaseDisabled from '@images/database-disabled.svg';
import { ROUTES } from '../routes/router.const';
import { i18n } from '@plugins/i18n.plugin'

export default {
  ratingMaxValue: '5.0',
  mainLeg: [
    {
      value: 'Права',
      name: i18n.global.t('profile.right'),
      id: 'Right',
    },
    {
      value: 'Ліва',
      name: i18n.global.t('profile.left'),
      id: 'Left',
    },
  ],
  position: [
    {
      value: 'GK',
      name: 'hashtags.position_full.GK',
    },
    {
      value: 'LB',
      name: 'hashtags.position_full.LB',
    },
    {
      value: 'RB',
      name: 'hashtags.position_full.RB',
    },
    {
      value: 'CB',
      name: 'hashtags.position_full.CB',
    },
    {
      value: 'LWB',
      name: 'hashtags.position_full.LWB',
    },
    {
      value: 'RWB',
      name: 'hashtags.position_full.RWB',
    },
    {
      value: 'CDM',
      name: 'hashtags.position_full.CDM',
    },
    {
      value: 'CM',
      name: 'hashtags.position_full.CM',
    },
    {
      value: 'CAM',
      name: 'hashtags.position_full.CAM',
    },
    {
      value: 'RM',
      name: 'hashtags.position_full.RM',
    },
    {
      value: 'LM',
      name: 'hashtags.position_full.LM',
    },
    {
      value: 'RW',
      name: 'hashtags.position_full.RW',
    },
    {
      value: 'LW',
      name: 'hashtags.position_full.LW',
    },
    {
      value: 'RF',
      name: 'hashtags.position_full.RF',
    },
    {
      value: 'CF',
      name: 'hashtags.position_full.CF',
    },
    {
      value: 'LF',
      name: 'hashtags.position_full.LF',
    },
    {
      value: 'ST',
      name: 'hashtags.position_full.ST',
    },
  ],
  tabs: [
    {
      id: 0,
      name: 'profile.my-profile',
      img: userIcon,
      url: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
      isActive: true,
      isDisabled: false,
    },
    {
      id: 1,
      name: 'profile.rate-plan',
      img: databaseDisabled,
      url: ROUTES.APPLICATION.PROFILE.RATE_PLAN.absolute,
      isActive: false,
      isDisabled: true,
    },
  ],
  tabTitles: [
    { id: 0, title: i18n.global.t('profile.about-myself'), width: '119px' },
    { id: 1, title: i18n.global.t('profile.game-features'), width: '186px' },
    { id: 2, title: i18n.global.t('profile.contacts'), width: '119px' },
  ],
  labels: [
    { title: 'asdfkj' },
    { title: 'asdf' },
    { title: 'as' },
    { title: 'asdfk' },
  ],
};
