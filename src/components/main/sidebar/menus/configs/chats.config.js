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
import { ChatSocketWorkerInstance } from '@/workers/web-socket-worker';
import { WebSocketPaginationWorker } from '@/workers/pagination-worker';
import { ChatWebSocketTypes } from '@/workers/web-socket-worker/message-types/chat/web.socket.types';

import ReadAllNotificationsIcon from '@images/notifications/double-check.svg';
import ManageNotificationsIcon from '@images/dots.svg';
import EmptyNotificationsIcon from '@images/no-records/empty-notifications.svg';
import { FilterParamsDecorator } from '@/workers/api-worker/http/filter/filter.utils';

import trashRedIcon from '@images/trash-red.svg';
import doubleCheckIcon from '@images/notifications/double-check.svg';
import selectedIcon from '@images/selected.svg';

const generalConfigForAllTabs = {
  scrollStrategy: 'infinite',
  watchChanges: ['contextMenu', 'openTab'],
  blockScrollToTopIfExist: true,
  emptyListConfig: {
    title: 'chats.no_chats_list.title',
    description: 'chats.no_chats_list.description',
    image: EmptyNotificationsIcon,
  },
  badge: {
    count: 0,
  },
  records: {
    record: {
      componentName: 'Notification',
    },
    request: {
      api: (data) => API.ChatService.getMyChatsList(data),
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
      paginationFunction: WebSocketPaginationWorker,
      messageType: ChatWebSocketTypes.GetChatsList,
    },
  },
};

const createContextMenu = (chatItem) => {
  return [
    new ContextMenuModel({
      text: 'buttons.select',
      img: selectedIcon,
      action: (itemInstance) => {
        if (!chatItem.selectable.value) {
          chatItem.selectable.value = true;
        }
        chatItem.activeTab.value.records.selectedList.push(
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

export const createChatConfigItem = (routerInstance) => {
  const getChatsCount = () => API.ChatService.getAllMyChatsCount();

  const getChatsCountMessageHandler = (messageData) => {
    const countData = messageData?.data?.data;

    if (countData) {
      chatItem
        .findTab('chat.slideConfig.all_chats')
        .setBadgeCount(countData.all_chats_count);
      chatItem
        .findTab('chat.slideConfig.dialogs')
        .setBadgeCount(countData.personal_chats_count);
      chatItem
        .findTab('chat.slideConfig.groupChats')
        .setBadgeCount(countData.group_chats_count);
      chatItem
        .findTab('chat.slideConfig.chatRequests')
        .setBadgeCount(countData.chat_requests_count);
    }
  };

  const chatItem = new BasicButtonSlideActivatorModel({
    uniqueName: 'notification.point',
    title: 'notification.title',
    disabled: false,
    icon: notification,
    actionType: new ActionModelTypeButton({
      action: () => {
        chatItem.activity.value = !chatItem.activity.value;
      },
    }),
    onInit() {
      ChatSocketWorkerInstance.registerCallback(
        getChatsCountMessageHandler,
        ChatWebSocketTypes.GetChatsCount
      );
      getChatsCount();
    },
    onDestroy() {
      ChatSocketWorkerInstance.destroyCallback(getChatsCountMessageHandler);
    },
    slideConfig: {
      uniqueName: 'notification.slide',
      title: 'notification.slide',
      defaultTab: 'chat.slideConfig.all_chats',
      logo: {
        text: 'Чати',
      },
      tabsGapPx: 10,
      closable: false,
      selectable: false,
      bottomSideVisible: false,
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
                    !chatItem.activeTab.value?.paginationElements.length
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
                const isSelectable = chatItem.selectable.value;
                return {
                  text: !isSelectable
                    ? 'slide_menu.notifications-manage'
                    : 'slide_menu.cancel-manage',
                  isBorder: true,
                  borderColor: '#DFDEED',
                  mainColor: '#575775',
                  hideElement: Boolean(
                    !chatItem.activeTab.value?.paginationElements.length
                  ),
                  rightIcon: !isSelectable ? ManageNotificationsIcon : null,
                  height: 32,
                  width: !isSelectable ? 205 : 180,
                };
              }),
              componentEmitsHandlers: {
                clickFunction: () => {
                  chatItem.activeTab.value.records.selectedList = [];
                  chatItem.selectable.value = !chatItem.selectable.value;
                },
              },
            }),
          ],
        ],
      },
      tabs: [
        new TabModel(
          {
            ...generalConfigForAllTabs,
            uniqueName: 'chat.slideConfig.all_chats',
            title: 'chat.chat_lists.all_chats_tab',
          },
          routerInstance
        ),
        new TabModel(
          {
            ...generalConfigForAllTabs,
            uniqueName: 'chat.slideConfig.dialogs',
            title: 'chat.chat_lists.dialogs_tab',
          },
          routerInstance
        ),
        new TabModel(
          {
            ...generalConfigForAllTabs,
            uniqueName: 'chat.slideConfig.groupChats',
            title: 'chat.chat_lists.group_chats_tab',
          },
          routerInstance
        ),
        new TabModel(
          {
            ...generalConfigForAllTabs,
            uniqueName: 'chat.slideConfig.chatRequests',
            title: 'chat.chat_lists.chat_requests_tab',
          },
          routerInstance
        ),
      ],
    },
  });

  return chatItem;
};
