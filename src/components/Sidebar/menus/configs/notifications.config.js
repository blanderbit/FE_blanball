import { BasicButtonSlideActivatorModel } from "../models/basic.button.slide.activator.model";
import notificationUnread from "../../../../assets/img/notificationUnread.svg";
import notification from "../../../../assets/img/notification.svg";
import { ActionModelTypeButton } from "../models/model.types";
import { API } from "../../../../workers/api-worker/api.worker";
import { TabModel } from "../models/tabs.model";
import { createNotificationFromData } from "../../../../workers/utils-worker";
import { ContextMenuModel } from "../models/context.menu.model";
import { ref, computed, watch } from "vue";

import {
  AuthWebSocketWorkerInstance,
  GeneralSocketWorkerInstance,
} from '../../../../workers/web-socket-worker';

import {
  NotificationsBus
} from '../../../../workers/event-bus-worker';

const findDublicates = (list, newList) => {
  return newList.filter((item) =>
    list.length
      ? !list.find(
      (oldItem) => oldItem.notification_id === item.notification_id
      )
      : true
  );
};

export const createNotificationConfigItem = (instance) => {
  const getNotificationsCount = async () => {
    const { data } = await API.NotificationService.getNotificationsCount();

    notificationItem
      .findTab('notification.slideConfig.all_notifications')
      .setBadgeCount(data.all_notifications_count);
    notificationItem
      .findTab('notification.slideConfig.not_read_notifications')
      .setBadgeCount(data.not_read_notifications_count);
  };

  const handleMessageInSidebar = (instanceType) => {
    const {paginationElements, paginationLoad, paginationPage} = notificationItem.activeTab.value;
    if (instanceType.notification) {
      // skipids.value.push(instanceType.notification_id);
    }

    if (instanceType.updateWebSocketMessage) {
      instanceType.handleUpdate(
        {
          paginationElements,
          paginationLoad,
          paginationPage,
        },
        getNotificationsCount
      );
    }

    getNotificationsCount();
  };

  const handleGeneralMessageInSidebar = (instanceType) => {
    const {paginationElements, paginationLoad, paginationPage} = notificationItem.activeTab.value;
    instanceType.handleUpdate({
      paginationElements,
      paginationLoad,
      paginationPage,
    });
  };


  const notificationItem = new BasicButtonSlideActivatorModel({
    uniqueName:  'notification.point',
    title: 'notification.title',
    disabled: false,
    icon: computed(() => {
      return notificationItem
        .findTab('notification.slideConfig.not_read_notifications')
        .badge.count.value
          ? notificationUnread
          : notification
    }),
    actionType: new ActionModelTypeButton({
      action: () => {
        notificationItem.activity.value = !notificationItem.activity.value
      }
    }),
    onInit () {
      NotificationsBus.on('SidebarClearData', () => {
        // skipids.value = [];
        const {paginationClearData} = notificationItem.active.tab.value;
        paginationClearData();
      });

      NotificationsBus.on(
        'hanlderToRemoveNewNotificationsInSidebar',
        (notificationId) => {
          // const index = skipids.value.indexOf(notificationId);
          //
          // if (index > -1) {
          //   skipids.value.splice(index, 1);
          // }
          // loadDataNotifications(1, null, false, false);
        }
      );
      AuthWebSocketWorkerInstance.registerCallback(handleMessageInSidebar);
      GeneralSocketWorkerInstance.registerCallback(handleGeneralMessageInSidebar);
      getNotificationsCount()
    },
    onDestroy() {
      AuthWebSocketWorkerInstance.destroyCallback(handleMessageInSidebar);
      GeneralSocketWorkerInstance.destroyCallback(handleGeneralMessageInSidebar);
    },
    slideConfig: {
      uniqueName:  'notification.slide',
      title: "notification.slide",
      defaultTab: 'notification.slideConfig.all_notifications',
      tabs: [
        new TabModel({
          records: {
            request: {
              api: (data) => API.NotificationService.getNotifications(data),
              filtersModel: {
                type: {
                  type: String,
                  value: '',
                },
                skipids: {
                  type: Array,
                  value: [],
                },
              },
              dataTransformation: createNotificationFromData,
              beforeConcat: findDublicates
            },
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
            count: 0
          },
          uniqueName:  'notification.slideConfig.all_notifications',
          title: "notification.slideConfig.all_notifications",
        }, instance),
        new TabModel({
          records: {
            request: {
              api: (data) => API.NotificationService.getNotifications({
                ...data,
                type: 'Unread'
              }),
              filtersModel: {
                type: {
                  type: String,
                  value: '',
                },
                skipids: {
                  type: Array,
                  value: [],
                },
              },
              dataTransformation: createNotificationFromData,
              beforeConcat: findDublicates
            },
            selectable: true,
            scrollStrategy: 'infinite',
            watchChanges: ['contextMenu', 'openTab'],
            contextMenu: [
              new ContextMenuModel({
                uniqueName:  'notification.slideConfig.not_read_notifications.read_one',
                title: "notification.slideConfig.not_read_notifications.read_one",
                request: (id) => API.NotificationService.readNotifications([id]),
              }),
              new ContextMenuModel({
                uniqueName:  'notification.slideConfig.not_read_notifications.delete_one',
                title: "notification.slideConfig.not_read_notifications.delete_one",
                request: (id) => API.NotificationService.deleteNotifications([id]),
              }),
            ]
          },
          badge: {
            count: 0
          },
          uniqueName: 'notification.slideConfig.not_read_notifications',
          title: "notification.slideConfig.not_read_notifications",
        }, instance),
      ]
    }
  });



  // TODO NEED OFF event
  getNotificationsCount()

  return notificationItem;
};