import { BasicButtonSlideActivatorModel } from '../models/basic.button.slide.activator.model';
import notificationUnread from '@images/notificationUnread.svg';
import notification from '@images/notification.svg';
import { ActionModelTypeButton } from '../models/model.types';
import { API } from '@workers/api-worker/api.worker';
import { TabModel } from '../models/tabs.model';
import { ContextMenuModel } from '../models/context.menu.model';
import { createNotificationFromData } from '@workers/utils-worker';
import { ref, computed, watch } from 'vue';
import { CONSTS } from '@consts';

import {
  AuthWebSocketWorkerInstance,
  GeneralSocketWorkerInstance,
} from '@workers/web-socket-worker';

import { NotificationsBus } from '@workers/event-bus-worker';

import SideBarLogoIcon from '@images/logo-sidebar.svg';

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
    const { paginationElements, paginationLoad, paginationPage } =
      notificationItem.activeTab.value;
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
    const { paginationElements, paginationLoad, paginationPage } =
      notificationItem.activeTab.value;
    instanceType.handleUpdate({
      paginationElements,
      paginationLoad,
      paginationPage,
    });
  };

  const notificationItem = new BasicButtonSlideActivatorModel({
    uniqueName: 'notification.point',
    title: 'notification.title',
    disabled: false,
    icon: computed(() => {
      return notificationItem.findTab(
        'notification.slideConfig.not_read_notifications'
      ).badge.count.value
        ? notificationUnread
        : notification;
    }),
    actionType: new ActionModelTypeButton({
      action: () => {
        notificationItem.activity.value = !notificationItem.activity.value;
      },
    }),
    onInit() {
      NotificationsBus.on('SidebarClearData', () => {
        // skipids.value = [];
        const { paginationClearData } = notificationItem.active.tab.value;
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
      GeneralSocketWorkerInstance.registerCallback(
        handleGeneralMessageInSidebar
      );
      getNotificationsCount();
    },
    onDestroy() {
      AuthWebSocketWorkerInstance.destroyCallback(handleMessageInSidebar);
      GeneralSocketWorkerInstance.destroyCallback(
        handleGeneralMessageInSidebar
      );
    },
    slideConfig: {
      uniqueName: 'notification.slide',
      title: 'notification.slide',
      defaultTab: 'notification.slideConfig.all_notifications',
      logo: {
        img: SideBarLogoIcon,
      },
      filters: [
        // Filter({
        //   request: () => true,
        //   activity: true,
        //   signalsEmit: {
        //     onChange: 'selectable'
        //   },
        //   type: Checkbox
        // })
      ],
      tabs: [
        new TabModel(
          {
            records: {
              record: {
                componentName: 'Notification',
              },
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
                beforeConcat: findDublicates,
              },
              selectable: false,
              scrollStrategy: 'infinite',
              watchChanges: ['contextMenu', 'openTab'],
              contextMenu: CONSTS.sidebar.notificationsContextMenuItems,
            },
            badge: {
              count: 0,
            },
            uniqueName: 'notification.slideConfig.all_notifications',
            title: 'slide_menu.all-notifications',
          },
          instance
        ),
        new TabModel(
          {
            records: {
              record: {
                componentName: 'Notification',
              },
              request: {
                api: (data) =>
                  API.NotificationService.getNotifications({
                    ...data,
                    type: 'Unread',
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
                beforeConcat: findDublicates,
              },
              selectable: true,
              scrollStrategy: 'infinite',
              watchChanges: ['contextMenu', 'openTab'],
              contextMenu: CONSTS.sidebar.notificationsContextMenuItems,
            },
            badge: {
              count: 0,
            },
            uniqueName: 'notification.slideConfig.not_read_notifications',
            title: 'slide_menu.not-read',
          },
          instance
        ),
      ],
    },
  });

  // TODO NEED OFF event
  getNotificationsCount();

  return notificationItem;
};
