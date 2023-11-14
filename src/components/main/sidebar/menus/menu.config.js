import record from '@images/record.svg';
import members from '@images/members.svg';
import medal from '@images/medal.svg';
import settings from '@images/settings.svg';
import bugReport from '@images/warning-black.svg';
import { ROUTES } from '@routes/router.const';
import { computed } from 'vue';
import {
  ActionModelTypeButton,
  ActionModelTypeUrl,
} from './models/model.types';
import { BasicButtonModel } from './models/basic.button.model';
import { createNotificationConfigItem } from './configs/notifications.config';
import { createChatConfigItem } from './configs/chats.config';
import { BlanballEventBus } from '@/workers/event-bus-worker';

// TODO почему то chatItem перебивает данные notificationItem
export const dinamicMenu = (instance) => {
  const notificationItem = createNotificationConfigItem(instance);
  const chatConfigItem = createChatConfigItem(instance);
  const closeCurrentActiveSlideMenu = () => {
    slideBarMenu.value = slideBarMenu.value.forEach((slideBarMenuItem) => {
      if (slideBarMenuItem?.activity?.value) {
        slideBarMenuItem.activity.value = !slideBarMenuItem.activity.value;
      }
    });
  };

  const slideBarMenu = computed(() => [
    notificationItem,
    chatConfigItem,
    new BasicButtonModel({
      uniqueName: 'events.icon',
      title: 'slide_menu.events',
      icon: record,
      disabled: false,
      actionType: new ActionModelTypeUrl({
        url: ROUTES.APPLICATION.EVENTS.absolute,
        action: closeCurrentActiveSlideMenu,
      }),
    }),
    new BasicButtonModel({
      uniqueName: 'cup.point',
      icon: medal,
      disabled: true,
    }),
    new BasicButtonModel({
      uniqueName: 'users.point',
      title: 'slide_menu.user-raiting',
      icon: members,
      disabled: false,
      actionType: new ActionModelTypeUrl({
        url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
        action: closeCurrentActiveSlideMenu,
      }),
    }),
    new BasicButtonModel({
      uniqueName: 'settings.point',
      title: 'slide_menu.settings',
      icon: settings,
      disabled: false,
      actionType: new ActionModelTypeUrl({
        url: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
        action: closeCurrentActiveSlideMenu,
      }),
    }),
    new BasicButtonModel({
      uniqueName: 'bug_report.point',
      icon: bugReport,
      class: 'b-bug-report__icon',
      hideOnMobile: true,
      actionType: new ActionModelTypeButton({
        action: () => {
          BlanballEventBus.emit('OpenBugReportModal');
        },
      }),
      disabled: false,
    }),
  ]);

  return {
    slideBarMenu,
  };
};
