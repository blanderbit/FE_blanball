import notification from '../../../assets/img/notification.svg';
import notificationUnread from '../../../assets/img/notificationUnread.svg';
import record from '../../../assets/img/record.svg';
import members from '../../../assets/img/members.svg';
import medal from '../../../assets/img/medal.svg';
import settings from '../../../assets/img/settings.svg';
import bugReport from '../../../assets/img/warning-black.svg';
import { ROUTES } from "../../../router/router.const";
import { ref } from "vue";

const MENU_TYPE = {
  BUTTON: 'button',
  SLIDE: 'slide'
};

export const dinamicMenu = (instance) => {
  const slideBarMenu = computed(() => [
    {
      uniqueName: 'notification.point',
      img: instance.notReadNotificationCount.value ? notificationUnread : notification,
      action: () => instance.isMenuOpened.value = !instance.isMenuOpened.value,
      disabled: false,
      activation: ref(false),
      type: MENU_TYPE.SLIDE,
      slideConfig: {
        title: "notification",
        topSide:  [
          "search",
          "add friend",
          "manage friends"
        ],
        tabs: [
          {
            uniqueName: 'friends.online',
            name: 'Зараз у мережі',
            badge: {
              strategy: [
                "action",
                "web socket",
                "request"
              ]
            },
            records: {
              strategy: "infinit",
              selectable: {
                actions: ["1", "2", "3"]
              },
              preview: [
                watch
              ],
              actions: [
                {
                  type: "icon"
                },
                {
                  type: "text"
                }
              ],
              contextMenu: [
                {
                  name: 'ff',
                  img: 'ff',
                  action: () => print('im action')
                }
              ]
            },
          },
          {
            uniqueName: 'friends.all',
            name: 'Усі друзі'
          },
          {
            uniqueName: 'friends.requests',
            name: 'Запити'
          }
        ],
      }
    },
    // {
    //   img: record,
    //   url: ROUTES.APPLICATION.EVENTS.absolute,
    //   action: () => instance.isMenuOpened.value = false,
    //   disabled: false,
    //   type: MENU_TYPE.BUTTON
    // },
    // {
    //   img: medal,
    //   url: '',
    //   action: () => instance.isMenuOpened.value = false,
    //   disabled: true,
    //   type: MENU_TYPE.BUTTON
    // },
    // {
    //   img: members,
    //   url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
    //   action: () => instance.isMenuOpened.value = false,
    //   disabled: false,
    //   type: MENU_TYPE.BUTTON
    // },
    // {
    //   img: settings,
    //   url: '',
    //   action: () => instance.isMenuOpened.value = false,
    //   disabled: true,
    //   type: MENU_TYPE.BUTTON
    // },
    // {
    //   img: bugReport,
    //   url: '',
    //   class: 'b-bug-report__icon',
    //   action: () => (instance.isBugReportModalOpened.value = true),
    //   disabled: false,
    //   type: MENU_TYPE.BUTTON
    // },
  ]);

  return {
    slideBarMenu
  }
}