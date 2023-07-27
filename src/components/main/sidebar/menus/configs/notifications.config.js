import { BasicButtonSlideActivatorModel } from '../models/basic.button.slide.activator.model';
import notificationUnread from '@images/notificationUnread.svg';
import notification from '@images/notification.svg';
import { ActionModelTypeButton } from '../models/model.types';
import { API } from '@workers/api-worker/api.worker';
import { TabModel } from '../models/tabs.model';
import { ComponentButtonModel } from '../models/component.button.model';
import { ContextMenuModel } from '../models/context.menu.model';
import { createNotificationFromData } from '@workers/utils-worker';
import { ref, computed, watch } from 'vue';
import { PaginationWorker } from '@/workers/pagination-worker';

import { AuthWebSocketWorkerInstance } from '@workers/web-socket-worker';

import { NotificationsBus } from '@workers/event-bus-worker';

import SideBarLogoIcon from '@images/logo-sidebar.svg';

import ReadAllNotificationsIcon from '@images/notifications/double-check.svg';
import ManageNotificationsIcon from '@images/dots.svg';
import EmptyNotificationsIcon from '@images/no-records/empty-notifications.svg';
import { FilterParamsDecorator } from '@/workers/api-worker/http/filter/filter.utils';

import trashRedIcon from '@images/trash-red.svg';
import doubleCheckIcon from '@images/notifications/double-check.svg';
import selectedIcon from '@images/selected.svg';

const findDublicates = (list, newList) => {
  return newList.filter((item) =>
    list.length
      ? !list.find(
          (oldItem) => oldItem.notification_id === item.notification_id
        )
      : true
  );
};

const generalConfigForAllTabs = {
  scrollStrategy: 'infinite',
  watchChanges: ['contextMenu', 'openTab'],
  blockScrollToTopIfExist: true,
  emptyListConfig: {
    title: 'no_records.noNotifications.title',
    description: 'no_records.noNotifications.description',
    image: EmptyNotificationsIcon,
  },
};
const createContextMenu = (notificationItem) => {
  return [
    new ContextMenuModel({
      text: 'buttons.select',
      img: selectedIcon,
      action: (itemInstance) => {
        if (!notificationItem.selectable.value) {
          notificationItem.selectable.value = true;
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
      action: (itemInstance) =>
        API.NotificationService.deleteNotifications([
          itemInstance.notification_id,
        ]),
    }),
  ];
};

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

  const handleMessageInSidebar = (instanceType) => {
    const { paginationElements, paginationLoad, paginationPage } =
      notificationItem.activeTab.value;
    if (instanceType.notification) {
      notificationItem
        .getFilters()
        .skipids.value.push(instanceType.notification_id);
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
    },
    slideConfig: {
      uniqueName: 'notification.slide',
      title: 'notification.slide',
      defaultTab: 'notification.slideConfig.all_notifications',
      logo: {
        img: SideBarLogoIcon,
      },
      closable: true,
      selectable: false,
      bottomSideVisible: true,
      topSide: {
        style: {
          display: 'flex',
          'justify-content': 'space-between',
          'align-items: center': 'center',
        },
        elements: [
          [
            new ComponentButtonModel({
              componentName: 'WhiteBtn',
              uniqueName: 'notification.componentButton.realAllNotifications',
              componentProps: computed(() => {
                return {
                  text: 'slide_menu.read-all',
                  isBorder: false,
                  hideElement: Boolean(
                    !notificationItem.activeTab.value?.paginationElements.length
                  ),
                  mainColor: '#575775',
                  icon: ReadAllNotificationsIcon,
                  height: 32,
                };
              }),
              componentEmitsHandlers: {
                clickFunction: () =>
                  API.NotificationService.readAllMyNotifications(),
              },
            }),
            new ComponentButtonModel({
              componentName: 'WhiteBtn',
              uniqueName: 'notification.componentButton.manageNotifications',
              componentProps: computed(() => {
                const isSelectable = notificationItem.selectable.value;
                return {
                  text: !isSelectable
                    ? 'slide_menu.notifications-manage'
                    : 'slide_menu.cancel-manage',
                  isBorder: true,
                  borderColor: '#DFDEED',
                  mainColor: '#575775',
                  hideElement: Boolean(
                    !notificationItem.activeTab.value?.paginationElements.length
                  ),
                  rightIcon: !isSelectable ? ManageNotificationsIcon : null,
                  height: 32,
                  width: !isSelectable ? 205 : 180,
                };
              }),
              componentEmitsHandlers: {
                clickFunction: () => {
                  notificationItem.activeTab.value.records.selectedList = [];
                  notificationItem.selectable.value =
                    !notificationItem.selectable.value;
                },
              },
            }),
          ],
        ],
      },

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
                paginationFunction: PaginationWorker,
              },
              contextMenu: computed(() => createContextMenu(notificationItem)),
              ...generalConfigForAllTabs,
            },
            badge: {
              count: 0,
            },
            uniqueName: 'notification.slideConfig.all_notifications',
            title: 'slide_menu.all-notifications',
          },
          routerInstance
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
                paginationFunction: PaginationWorker,
              },
              contextMenu: computed(() => createContextMenu(notificationItem)),
              ...generalConfigForAllTabs,
            },
            badge: {
              count: 0,
            },
            uniqueName: 'notification.slideConfig.not_read_notifications',
            title: 'slide_menu.not-read',
          },
          routerInstance
        ),
      ],
    },
  });

  // TODO NEED OFF event
  getNotificationsCount();

  return notificationItem;
};
