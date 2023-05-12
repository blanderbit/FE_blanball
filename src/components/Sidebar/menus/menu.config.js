import record from '../../../assets/img/record.svg';
import members from '../../../assets/img/members.svg';
import medal from '../../../assets/img/medal.svg';
import settings from '../../../assets/img/settings.svg';
import bugReport from '../../../assets/img/warning-black.svg';
import { ROUTES } from "../../../router/router.const";
import { computed } from "vue";
import { ActionModelTypeButton, ActionModelTypeUrl } from "./models/model.types";
import { BasicButtonModel } from "./models/basic.button.model";
import { createNotificationConfigItem } from "./configs/notifications.config";


export const dinamicMenu = (instance) => {
  const notificationItem = createNotificationConfigItem();
  const slideBarMenu = computed(() => [
    notificationItem,
    new BasicButtonModel({
      uniqueName:  'events.icon',
      title: 'events.icon',
      icon: record,
      disabled: false,
      actionType: new ActionModelTypeUrl({
        url: ROUTES.APPLICATION.EVENTS.absolute,
        action: () => notificationItem.activity.value = false,
      }),
    }),
    new BasicButtonModel({
      uniqueName:  'cup.point',
      icon: medal,
      disabled: true,
    }),
    new BasicButtonModel({
      uniqueName: 'users.point',
      icon: members,
      disabled: false,
      actionType: new ActionModelTypeUrl({
        url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
        action: () => notificationItem.activity.value = false,
      }),
    }),
    new BasicButtonModel({
      uniqueName: 'settings.point',
      icon: settings,
      disabled: true,
    }),
    new BasicButtonModel({
      uniqueName: 'bug_report.point',
      icon: bugReport,
      class: 'b-bug-report__icon',
      actionType: new ActionModelTypeButton({
        action: () => instance.isBugReportModalOpened.value = true
      }),
      disabled: false,
    }),
  ]);
debugger
  return {
    slideBarMenu
  }
}