import userIcon from '../assets/img/user-icon.svg';
import databaseDisabled from '../assets/img/database-disabled.svg';
import { ROUTES } from '../router/router.const';

export default {
  ratingMaxValue: '5.0',
  mainLeg: [
    {
      value: 'Права',
      name: 'Права',
      id: 'Right',
    },
    {
      value: 'Ліва',
      name: 'Ліва',
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
    { id: 0, title: 'Про мене', width: '119px' },
    { id: 1, title: 'Ігрові характеристики', width: '186px' },
    { id: 2, title: 'Контакти', width: '119px' },
  ],
  labels: [
    { title: 'asdfkj' },
    { title: 'asdf' },
    { title: 'as' },
    { title: 'asdfk' },
  ],
};
