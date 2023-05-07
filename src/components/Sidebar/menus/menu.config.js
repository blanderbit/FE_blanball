import notification from '../../../assets/img/notification.svg';
import notificationUnread from '../../../assets/img/notificationUnread.svg';
import record from '../../../assets/img/record.svg';
import members from '../../../assets/img/members.svg';
import medal from '../../../assets/img/medal.svg';
import settings from '../../../assets/img/settings.svg';
import bugReport from '../../../assets/img/warning-black.svg';
import { ROUTES } from "../../../router/router.const";
import { ref ,computed } from "vue";
import { BasicButtonSlideActivatorModel } from "./models/basic.button.slide.activator.model";
import { ActionModelTypeButton, ActionModelTypeUrl } from "./models/model.types";
import { TabModel } from "./models/tabs.model";
import { API } from "../../../workers/api-worker/api.worker";
import { ContextMenuModel } from "./models/context.menu.model";
import { BasicButtonModel } from "./models/basic.button.model";

export const dinamicMenu = (instance) => {
  const notificationItem = new BasicButtonSlideActivatorModel({
    uniqueName:  'notification.point',
    title: 'notification.title',
    disabled: false,
    icon: computed(() => instance.notReadNotificationCount.value ? notificationUnread : notification),
    actionType: new ActionModelTypeButton({
      action: () => notificationItem.activity.value = !notificationItem.activity.value
    }),
    slideConfig: {
      uniqueName:  'notification.slide',
      title: "notification.slide",
      tabs: [
        new TabModel({
          records: {
            request: () => API.NotificationService.getNotifications(),
            selectable: true,
            scrollStrategy: 'infinite',
            watchChanges: ['contextMenu', 'openTab'],
            contextMenu: [
              new ContextMenuModel({
                uniqueName:  'notification.slideConfig.all_notifications.read_one',
                title: "notification.slideConfig.all_notifications.read_one",
                request: (id) => API.NotificationService.readNotifications([id]),
              }),
              new ContextMenuModel({
                uniqueName:  'notification.slideConfig.all_notifications.delete_one',
                title: "notification.slideConfig.all_notifications.delete_one",
                request: (id) => API.NotificationService.deleteNotifications([id]),
              }),
            ]
          },
          badge: {
          },
          uniqueName:  'notification.slideConfig.all_notifications',
          title: "notification.slideConfig.all_notifications",
        }),
        // new TabModel()
      ]
    }
  });
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
      icon: medal,
      disabled: true,
    }),
    new BasicButtonModel({
      icon: members,
      disabled: false,
      actionType: new ActionModelTypeUrl({
        url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
        action: () => notificationItem.activity.value = false,
      }),
    }),
    new BasicButtonModel({
      icon: settings,
      disabled: true,
    }),
    new BasicButtonModel({
      icon: bugReport,
      class: 'b-bug-report__icon',
      actionType: new ActionModelTypeButton({
        action: () => instance.isBugReportModalOpened.value = true
      }),
      disabled: false,
    }),
  ]);

  return {
    slideBarMenu
  }
}