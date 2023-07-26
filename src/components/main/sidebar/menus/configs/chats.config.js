import { BasicButtonSlideActivatorModel } from '../models/basic.button.slide.activator.model';
import notificationUnread from '@images/notificationUnread.svg';
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

import { ROUTES } from '@/routes/router.const';

import trashRedIcon from '@images/trash-red.svg';
import doubleCheckIcon from '@images/notifications/double-check.svg';
import selectedIcon from '@images/selected.svg';
import chatsSidebarIcon from '@images/chat/sidebar-chats-icon.svg';

const CHATS_CONFIG_TOP_SIDE_STYLES = {
  display: 'flex',
  'justify-content': 'space-between',
  'align-items': 'center',
};

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
      componentName: 'ChatCard',
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
    icon: chatsSidebarIcon,
    actionType: new ActionModelTypeButton({
      action: () => {
        import('@router/index').then((router) => {
          router.default
            .push(ROUTES.APPLICATION.CHATS)
            .then((chatItem.activity.value = true));
        });
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
        text: 'chat.chats',
      },
      tabsGapPx: 10,
      closable: false,
      selectable: false,
      bottomSideVisible: false,
      topSide: {
        style: CHATS_CONFIG_TOP_SIDE_STYLES,
        elements: [[]],
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
