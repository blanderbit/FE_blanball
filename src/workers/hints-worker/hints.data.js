import { ROUTES } from '../../router/router.const';
import WhiteInfoIcon from '../../assets/img/white-info.svg';

export const HINTS_DATA = {
  SchedulerOnboarding: {
    name: 'scheduler_onboarding',
    title: 'hints.scheduler_onboarding.title',
    texts: [
      'hints.scheduler_onboarding.text1',
      'hints.scheduler_onboarding.text2',
    ],
    backgroundColor: '#262541',
    width: '368px',
    titleColor: '#FFFFFF',
    textsColor: '#DFDEED',
    headerImg: WhiteInfoIcon,
    pageName: ROUTES.APPLICATION.index.name,
    querySelector: '.b_scheduler_button',
    right: 0,
    top: 8,
  },
};
