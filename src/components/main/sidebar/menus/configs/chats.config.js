import { BasicButtonSlideActivatorModel } from '../models/basic.button.slide.activator.model';
import { cloneDeep } from 'lodash';
import { ActionModelTypeUrl } from '../models/model.types';
import { API } from '@workers/api-worker/api.worker';
import { TabModel } from '../models/tabs.model';
import { ComponentButtonModel } from '../models/component.button.model';
import { ContextMenuModel } from '../models/context.menu.model';
import { ref, computed, watch } from 'vue';
import {
  ChatSocketWorkerInstance,
  AuthWebSocketWorkerInstance,
} from '@/workers/web-socket-worker';
import { WebSocketPaginationWorker } from '@/workers/pagination-worker';
import { ChatWebSocketTypes } from '@/workers/web-socket-worker/message-types/chat/web.socket.types';
import { ChatEventBus } from '@/workers/event-bus-worker';
import { useUserDataStore } from '@/stores/userData';
import { pinia } from '@/plugins/pinia.plugin';

import EmptyNotificationsIcon from '@images/no-records/empty-notifications.svg';
import { FilterParamsDecorator } from '@/workers/api-worker/http/filter/filter.utils';

import { ROUTES } from '@/routes/router.const';

import trashRedIcon from '@images/trash-red.svg';
import selectedIcon from '@images/selected.svg';
import chatsSidebarIcon from '@images/chat/sidebar-chats-icon.svg';
import pinChatIcon from '@images/chat/pin-chat-icon.svg';
import disableChatNotificationsIcon from '@images/chat/disable-chat-push-notifications-button.svg';

const CHATS_CONFIG_TOP_SIDE_STYLES = {
  display: 'flex',
  'justify-content': 'space-between',
  'align-items': 'center',
};

const userStore = useUserDataStore(pinia);

const generalConfigForAllTabs = (chatItem, apiRequestFilters = {}) => {
  return {
    badge: {
      count: 0,
    },
    records: {
      record: {
        componentName: 'ChatCard',
      },
      request: {
        api: (data) =>
          API.ChatService.getMyChatsList({
            ...data,
            ...apiRequestFilters,
          }),
        filtersModel: {
          chats_type: {
            type: String,
            value: '',
          },
          search: {
            type: String,
            value: '',
          },
        },
        paginationFunction: WebSocketPaginationWorker,
        messageType: ChatWebSocketTypes.GetChatsList,
      },
      contextMenu: createContextMenu(chatItem),
      blockScrollToTopIfExist: true,
      watchChanges: ['contextMenu', 'openTab'],
      scrollStrategy: 'infinite',
      emptyListConfig: {
        title: 'chat.no_chats_list.title',
        description: 'chat.no_chats_list.description',
        image: EmptyNotificationsIcon,
      },
    },
  };
};

const createContextMenu = (chatItem) => {
  return [
    new ContextMenuModel({
      text: 'buttons.select',
      img: selectedIcon,
      action: (itemInstance) => {},
    }),
    new ContextMenuModel({
      text: 'buttons.pin',
      img: pinChatIcon,
      action: (itemInstance) => {},
    }),
    new ContextMenuModel({
      text: 'chat.buttons.disable_push_notifications',
      img: disableChatNotificationsIcon,
      action: (itemInstance) => {},
    }),
    new ContextMenuModel({
      text: 'chat.buttons.delete_chat',
      img: trashRedIcon,
      textColor: '#F32929',
      action: (itemInstance) => {},
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

  watch(
    () => routerInstance.router.currentRoute.value.path,
    (newRoutePath) => {
      if (
        newRoutePath !== ROUTES.APPLICATION.CHATS.absolute &&
        chatItem.activity.value
      ) {
        chatItem.activity.value = false;
      }
    }
  );

  const createChatMessageMessageHandler = (messageData) => {
    const { paginationElements } = chatItem.activeTab.value;

    messageData.updateChatInChatsList(userStore.user.id, paginationElements);
  };

  const chatItem = new BasicButtonSlideActivatorModel({
    uniqueName: 'chat.point',
    title: 'chat.chats',
    disabled: false,
    icon: chatsSidebarIcon,
    actionType: new ActionModelTypeUrl({
      url: ROUTES.APPLICATION.CHATS.absolute,
      action: () => (chatItem.activity.value = true),
    }),
    onInit() {
      ChatSocketWorkerInstance.registerCallback(
        getChatsCountMessageHandler,
        ChatWebSocketTypes.GetChatsCount
      );
      AuthWebSocketWorkerInstance.registerCallback(
        createChatMessageMessageHandler,
        ChatWebSocketTypes.CreateMessage
      );
      getChatsCount();
    },
    onDestroy() {
      ChatSocketWorkerInstance.destroyCallback(getChatsCountMessageHandler);
      AuthWebSocketWorkerInstance.destroyCallback(
        createChatMessageMessageHandler
      );
    },
    slideConfig: {
      uniqueName: 'chat.slide',
      title: 'chat.slide',
      defaultTab: 'chat.slideConfig.all_chats',
      logo: {
        text: 'chat.chats',
      },
      tabsGapPx: 10,
      closable: false,
      notAnimate: true,
      selectable: false,
      bottomSideVisible: false,
      topSide: {
        style: CHATS_CONFIG_TOP_SIDE_STYLES,
        elements: [[]],
      },
      tabs: [
        new TabModel(
          {
            ...cloneDeep(generalConfigForAllTabs(chatItem)),
            uniqueName: 'chat.slideConfig.all_chats',
            title: 'chat.chat_lists.all_chats_tab',
          },
          routerInstance
        ),
        new TabModel(
          {
            ...cloneDeep(
              generalConfigForAllTabs(chatItem, {
                chats_type: 'dialog',
              })
            ),
            uniqueName: 'chat.slideConfig.dialogs',
            title: 'chat.chat_lists.dialogs_tab',
          },
          routerInstance
        ),
        new TabModel(
          {
            ...cloneDeep(
              generalConfigForAllTabs(chatItem, {
                chats_type: 'group',
              })
            ),
            uniqueName: 'chat.slideConfig.groupChats',
            title: 'chat.chat_lists.group_chats_tab',
          },
          routerInstance
        ),
        new TabModel(
          {
            ...cloneDeep(
              generalConfigForAllTabs(chatItem, {
                chats_type: 'request',
              })
            ),
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
