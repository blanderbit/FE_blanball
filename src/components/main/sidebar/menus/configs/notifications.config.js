import { BasicButtonSlideActivatorModel } from '../models/basic.button.slide.activator.model';
import { cloneDeep } from 'lodash';
import { ActionModelTypeButton } from '../models/model.types';
import { API } from '@workers/api-worker/api.worker';
import { TabModel } from '../models/tabs.model';
import { ContextMenuModel } from '../models/context.menu.model';
import { createNotificationFromData } from '@workers/utils-worker';
import { computed } from 'vue';
import { PaginationWorker } from '@/workers/pagination-worker';
import { AuthWebSocketWorkerInstance } from '@workers/web-socket-worker';
import { NotificationsBus } from '@workers/event-bus-worker';
import { useWindowWidth } from '@/workers/window-size-worker/widthScreen';
import SlideMenuNotificationsTopBlock from '@mainComponents/slideMenu/notifications/SlideMenuNotificationsTopBlock.vue';

import trashRedIcon from '@images/trash-red.svg';
import doubleCheckIcon from '@images/notifications/double-check.svg';
import selectedIcon from '@images/selected.svg';
import notificationUnread from '@images/notificationUnread.svg';
import notification from '@images/notification.svg';
import SideBarLogoIcon from '@images/logo-sidebar.svg';
import EmptyNotificationsIcon from '@images/no-records/empty-notifications.svg';

const findDublicates = (list, newList) => {
  return newList.filter((item) =>
    list.length
      ? !list.find(
          (oldItem) => oldItem.notification_id === item.notification_id
        )
      : true
  );
};

const { detectedDevice, DEVICE_TYPES } = useWindowWidth();

export const createNotificationConfigItem = (routerInstance) => {
  const getNotificationsCount = async () => {
    const { data } = await API.NotificationService.getNotificationsCount();

    notificationItem
      .findTab('notification.slideConfig.all_notifications')
      .setBadgeCount(data.all_notifications_count);
    notificationItem
      .findTab('notification.slideConfig.not_read_notifications')
      .setBadgeCount(data.not_read_notifications_count);
  };

  const createContextMenu = () => {
    return [
      new ContextMenuModel({
        text: 'buttons.select',
        img: selectedIcon,
        action: (itemInstance) => {
          if (!notificationItem.activeTab.value.selectable.value) {
            notificationItem.activeTab.value.selectable.value = true;
          }
          notificationItem.activeTab.value.records.selectedList.push(
            itemInstance.notification_id
          );
        },
      }),
      new ContextMenuModel({
        text: 'slide_menu.mark-as-read',
        img: doubleCheckIcon,
        action: (itemInstance) =>
          API.NotificationService.readNotifications([
            itemInstance.notification_id,
          ]),
      }),
      new ContextMenuModel({
        text: 'buttons.delete',
        img: trashRedIcon,
        action: (itemInstance) => {
          API.NotificationService.deleteNotifications([
            itemInstance.notification_id,
          ]).then(() => {
            notificationItem.activeTab.value.removeElementById(
              itemInstance.notification_id,
              'notification_id'
            );
            getNotificationsCount();
          });
        },
      }),
    ];
  };

  const handleMessageInSidebar = (instanceType) => {
    if (instanceType.notification) {
      notificationItem.activeTab.value.addNewElement(instanceType);
    }

    // if (instanceType.updateWebSocketMessage) {
    //   instanceType.handleUpdate(
    //     {
    //       paginationElements,
    //       paginationLoad,
    //       paginationPage,
    //     },
    //     getNotificationsCount
    //   );
    // }

    getNotificationsCount();
  };

  const generalConfigForAllTabs = (type = '') => {
    return {
      badge: {
        count: 0,
      },
      selectable: false,
      records: {
        record: {
          componentName: 'Notification',
          idKeyField: 'notification_id',
        },
        request: {
          api: (data) => {
            return API.NotificationService.getNotifications(data);
          },
          filtersModel: {
            type: {
              ype: String,
              value: type,
            },
            skipids: {
              type: Array,
              value: [],
            },
          },
          dataTransformation: createNotificationFromData,
          beforeConcat: findDublicates,
          paginationFunction: PaginationWorker,
        },
        scrollStrategy: 'infinite',
        watchChanges: ['contextMenu', 'openTab'],
        blockScrollToTopIfExist: true,
        contextMenu: createContextMenu(),
        emptyListConfig: {
          title: 'no_records.noNotifications.title',
          description: 'no_records.noNotifications.description',
          image: EmptyNotificationsIcon,
        },
      },
    };
  };

  const notificationItem = new BasicButtonSlideActivatorModel({
    uniqueName: 'notification.point',
    title: 'slide_menu.notifications',
    disabled: false,
    updateTabsCount: getNotificationsCount,
    icon: computed(() => {
      return notificationItem.findTab(
        'notification.slideConfig.not_read_notifications'
      )?.badge?.count.value
        ? notificationUnread
        : notification;
    }),
    actionType: new ActionModelTypeButton({
      action: () => {
        if (detectedDevice.value === DEVICE_TYPES.DESKTOP) {
          notificationItem.activity.value = !notificationItem.activity.value;
        } else {
          notificationItem.activity.value = true;
        }
      },
    }),
    onInit() {
      NotificationsBus.on('SidebarClearData', () => {
        const skipids = notificationItem.getFilters().skipids;
        skipids.value = [];
        notificationItem.activeTab.value.paginationClearData();
      });
      NotificationsBus.on(
        'hanlderToRemoveNewNotificationsInSidebar',
        (notificationId) => {
          const skipids = notificationItem.getFilters().skipids;
          const index = skipids.value.indexOf(notificationId);
          if (index > -1) {
            skipids.value.splice(index, 1);
          }
          notificationItem.activeTab.value.loadNewData(1, null, false, false);
        }
      );
      AuthWebSocketWorkerInstance.registerCallback(handleMessageInSidebar);
      getNotificationsCount();
    },
    onDestroy() {
      AuthWebSocketWorkerInstance.destroyCallback(handleMessageInSidebar);
      NotificationsBus.off('SidebarClearData');
      NotificationsBus.off('hanlderToRemoveNewNotificationsInSidebar');
    },
    slideConfig: {
      uniqueName: 'notification.slide',
      title: 'notification.slide',
      defaultTab: 'notification.slideConfig.all_notifications',
      logo: {
        img: SideBarLogoIcon,
      },
      tabsGapPx: 20,
      closable: true,
      bottomSideVisible: true,
      topSide: SlideMenuNotificationsTopBlock,
      updateBadgesCountFn: getNotificationsCount,
      tabs: [
        new TabModel(
          {
            ...cloneDeep(generalConfigForAllTabs()),
            uniqueName: 'notification.slideConfig.all_notifications',
            title: 'slide_menu.all-notifications',
          },
          routerInstance
        ),
        new TabModel(
          {
            ...cloneDeep(generalConfigForAllTabs('Unread')),
            uniqueName: 'notification.slideConfig.not_read_notifications',
            title: 'slide_menu.not-read',
          },
          routerInstance
        ),
      ],
    },
  });

  // TODO NEED OFF event
  return notificationItem;
};
