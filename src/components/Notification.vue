<template>
  <div
    class="notification"
    :class="[
      notificationType,
      notCollapsible && 'not-collapsible',
      { 'notification-read': notificationInstance.isRead },
      {
        'notification-sidebar-not-read':
          !notificationInstance.isRead &&
          notificationType === 'notification-sidebar',
      },
      { 'notification-selected': checked },
    ]"
    @click.right.prevent="openContextMenu"
  >
    <loading :is-loading="loading"> </loading>
    <div class="notification-parts d-flex justify-content-between">
      <div
        class="notification-image"
        v-if="notificationType === 'notification-sidebar'"
      >
        <img
          v-if="notificationInstance.notificationImage"
          :src="notificationInstance.notificationImage"
        />
        <avatar
          v-if="notificationInstance.notificationUserImage"
          :class="{ checked: checked }"
          :online="notificationInstance.data.sender.is_online"
          :link="notificationInstance.profileImage"
          :full-name="notificationInstance.fullName"
        ></avatar>
      </div>
      <div
        class="notification-data flex-grow-1"
        :style="`margin-top: ${
          notificationType === 'notification-push' ? -10 : 0
        }px`"
      >
        <div class="notification-header d-flex justify-content-between">
          <div
            v-if="notificationType === 'notification-sidebar'"
            :class="['notification-sender', { checked: checked }]"
          >
            {{ notificationInstance.sender }}
          </div>
          <div
            v-if="notificationType === 'notification-sidebar'"
            class="notification-header-right-side"
          >
            <div
              class="notification-date"
              :style="`margin-top: ${selectable ? -4 : 0}px`"
            >
              {{ formatDate }}
            </div>
            <div class="b-selectable" v-if="selectableValue">
              <checkbox
                :checked="checked"
                :field-id="notificationInstance?.notification_id"
                @update:checked="
                  $emit('selected', {
                    notification: notificationInstance,
                    selected: $event,
                  })
                "
              >
              </checkbox>
            </div>
            <img
              v-if="deletable && !selectable"
              class="delete-notfication-cross"
              src="../assets/img/cross.svg"
              alt=""
              @click="$emit('delete', notificationInstance?.notification_id)"
            />
          </div>
        </div>

        <div
          v-if="notCollapsible"
          class="notification-main-content no-exanding"
        >
          <div :class="['top-side', { checked: checked }]">
            <div class="notification-title">
              {{ notificationInstance.title }}
            </div>
            <div class="top-side-content">
              <div
                class="notification-header-content"
                v-if="
                  notificationType === 'notification-sidebar' &&
                  !notificationInstance.textsAfterAction &&
                  notificationInstance?.actions?.length
                "
              >
                <div
                  class="notification-content not-full-content"
                  v-for="item in notificationInstance.texts"
                >
                  {{ item }}
                </div>
                <div
                  class="notification-expand-button"
                  @click="clickExpandTextButton"
                >
                  {{ isTextShow ? 'Згорнути' : 'Показати більше' }}
                </div>
                <div class="notification-actions">
                  <template v-for="item in notificationInstance.actions">
                    <NotificationButton
                      @click-function="$emit('handler-action', item)"
                      :buttonData="item"
                      :notificationType="notificationType"
                      :buttonDisabled="selectable"
                    >
                    </NotificationButton>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <collapsible-panel
          v-else
          v-model:expanding="expanding"
          class="notification-mobile"
          @touchstart="startHoldSelectNotification"
          @touchend="endHoldSelectNotification"
        >
          <template #title>
            <div class="notification-title">
              {{ notificationInstance.title }}
            </div>
          </template>

          <template
            v-if="notificationType === 'notification-sidebar'"
            #content
            class="notification-expandle-content"
          >
            <template v-if="notificationInstance.textsAfterAction">
              <div class="notification-response d-flex align-items-center">
                <img
                  v-if="notificationInstance.textsAfterAction.response"
                  src="../assets/img/true-check.svg"
                />
                <img v-else src="../assets/img/red-cross.svg" />
                {{ notificationInstance.textsAfterAction.text }}
              </div>
            </template>
            <div
              class="notification-content"
              v-for="item in notificationInstance.texts"
            >
              {{ item }}
            </div>
            <div
              class="notification-actions"
              v-if="
                !notificationInstance.textsAfterAction &&
                notificationInstance?.actions?.length
              "
            >
              <template v-for="item in notificationInstance.actions">
                <NotificationButton
                  @click-function="$emit('handler-action', item)"
                  :buttonData="item"
                  :notificationType="notificationType"
                >
                </NotificationButton>
              </template>
            </div>
          </template>

          <template #icon>
            <img
              class="notification-collapsiple"
              src="../assets/img/mob-notification-collapsible-icon.svg"
              alt=""
            />
          </template>
        </collapsible-panel>

        <div
          v-if="notificationType === 'notification-push'"
          class="push-notification-main-content"
        >
          <template v-if="notificationInstance.textsAfterAction">
            <div class="notification-response d-flex align-items-center">
              <img
                v-if="notificationInstance.textsAfterAction.response"
                src="../assets/img/true-check.svg"
              />
              <img v-else src="../assets/img/red-cross.svg" />
              {{ notificationInstance.textsAfterAction.text }}
            </div>
          </template>
          <div class="push-notification-content">
            <collapsible-panel>
              <template #title> Сьогодні: {{ getCurrentTime }}</template>
              <template #content>
                <div
                  class="notification-content"
                  v-for="item in notificationInstance.texts"
                >
                  {{ item }}
                </div>
              </template>
              <template #icon>
                <img src="../assets/img/collapsible-icon.svg" alt="" />
              </template>
            </collapsible-panel>
          </div>
          <div
            class="notification-actions"
            v-if="
              !notificationInstance.textsAfterAction &&
              notificationInstance?.actions?.length &&
              notificationType === 'notification-push'
            "
          >
            <template v-for="item in notificationInstance.actions">
              <NotificationButton
                @click-function="$emit('handler-action', item)"
                :buttonData="item"
                :notificationType="notificationType"
              >
              </NotificationButton>
            </template>
          </div>
        </div>
        <div
          class="notification-close"
          v-if="isPush"
          @click="$emit('handler-close')"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.189895 0.189192C0.433973 -0.0548856 0.829701 -0.0548852 1.07378 0.189193L5.00069 4.11612L8.92758 0.189194C9.17166 -0.0548846 9.56739 -0.0548862 9.81147 0.189191C10.0555 0.433267 10.0555 0.828995 9.81147 1.07307L5.88458 5L9.81147 8.92689C10.0555 9.17097 10.0555 9.5667 9.81147 9.81077C9.56739 10.0549 9.17166 10.0549 8.92759 9.81077L5.00069 5.88388L1.07378 9.81078C0.829698 10.0549 0.43397 10.0549 0.189893 9.81077C-0.0541841 9.5667 -0.0541829 9.17097 0.189896 8.92689L4.11681 5L0.189894 1.07308C-0.0541837 0.828997 -0.0541833 0.433269 0.189895 0.189192Z"
              fill="#DFDEED"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayJs from 'dayjs';

import Loading from './../workers/loading-worker/Loading.vue';
import NotificationButton from './../components/NotificationButton.vue';
import Avatar from './../components/Avatar.vue';
import Checkbox from './Forms/Checkbox.vue';
import CollapsiblePanel from './../components/collapsible/CollapsiblePanel.vue';

export default {
  name: 'Notification',
  components: {
    Loading,
    NotificationButton,
    Avatar,
    Checkbox,
    CollapsiblePanel,
  },
  emits: ['handler-action', 'selected', 'force', 'delete'],
  props: {
    notificationInstance: {
      type: Object,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    notCollapsible: {
      type: Boolean,
      default: true,
    },
    notificationType: {
      type: String,
      default: 'notification-sidebar',
    },
    selectedCount: {
      type: Number,
      default: 0,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      isTextShow: false,
    };
  },
  watch: {
    active(value) {
      if (value) {
        this.start();
      } else {
        this.finish();
      }
    },
  },

  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    clickExpandTextButton() {
      this.isTextShow = !this.isTextShow;
    },
    startHoldSelectNotification() {
      this.timeout = setTimeout(() => {
        this.$emit(
          'selectNotificationAfterHold',
          this.notificationInstance.notification_id
        );
      }, 500);
    },
    openContextMenu(e) {
      if (!this.checked) {
        this.$emit('openContextMenu', {
          notification_id: this.notificationInstance.notification_id,
          xPosition: e.clientX,
          yPosition: e.clientY,
        });
      }
    },
    endHoldSelectNotification() {
      clearTimeout(this.timeout);
    },
  },

  computed: {
    formatDate() {
      return (
        this.notificationInstance?.parseDate ||
        dayJs(String(this.notificationInstance.date)).format('DD.MM.YYYY')
      );
    },
    getCurrentTime() {
      return dayJs(new Date()).format('HH:mm');
    },
    isPush() {
      return this.notificationType === 'push';
    },
    isStandard() {
      return this.notificationType === 'standard';
    },
    selectableValue() {
      if (this.selectedCount >= 100 && !this.checked) {
        return false;
      }

      return this.selectable;
    },
    expanding: {
      set(e) {
        this.notificationInstance.metadata.expanding =
          this.notificationType === 'notification-sidebar' ? e : true;
      },
      get() {
        if (this.notCollapsible) {
          return true;
        }
        return this.notificationType === 'notification-sidebar'
          ? !!this.notificationInstance.metadata.expanding
          : true;
      },
    },
  },
};
</script>

<style scoped lang="scss">
$color-ecfcfb: #ecfcfb;
$color-148783: #148783;
$color-fff: #fff;
$color-f0f0f4: #f0f0f4;
// SCSS variables for hex colors
$color-8a8aa8: #8a8aa8;
$color-dfdeed: #dfdeed;
$color-a8a8bd: #a8a8bd;
$color-efeff6: #efeff6;
$color-d3d3d3: #d3d3d3;
$color-000: #000;

.notification-sender {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: $--b-main-gray-color;
}

.notification-content {
  @include inter(13px, 400, $color-dfdeed);
  line-height: 20px;
  margin-bottom: 8px;
  width: fit-content;
  word-break: break-word;
}

.notification-title {
  @include inter(14px, 600, $--b-main-white-color);
  line-height: 20px;
  max-width: 250px;
}

.notification-date {
  @include inter(13px, 400, $color-a8a8bd);
  line-height: 20px;
  width: max-content;
}

.notification-action {
  @include inter(13px, 500, $color-efeff6);
  line-height: 24px;

  display: inline-block;
  padding: 2px 12px;
  background: $--b-main-gray-color;
  border-radius: 6px;
  text-align: center;
  margin-right: 8px;
}

.notification-close {
  position: absolute;
  right: 20px;
  top: 20px;
  height: 10px;
  width: 10px;
  transition: 0.4s all;
  transform-origin: center;

  svg {
    transform: translateY(-6px);
  }

  &:hover {
    cursor: pointer;
    transform: rotateZ(90deg);

    path {
      fill: $color-d3d3d3;
    }
  }
}

.notification-push {
  ::v-deep {
    .spiner-text {
      display: none;
    }

    .spiner-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(239, 239, 246, 0.38);
      width: 100%;
    }

    .spiner-wrapper .spiner-body {
      background: transparent;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .spiner {
        .lds-ring,
        .lds-ring div {
          width: 50px;
          height: 50px;
        }

        .lds-ring div {
          border-color: white transparent transparent transparent;
        }
      }
    }
  }
}

.notification-header {
  padding: 0 12px;
}

.notification-sidebar-not-read {
  background: $color-ecfcfb;
  border-bottom: 1px solid $color-148783;
}

.notification-sidebar {
  * {
    color: $color-000;
  }

  padding: 16px 16px 12px 16px;

  @include tabletAndMobile {
    padding: 16px 0px 12px 16px;
  }

  .notification-title {
    color: $--b-main-black-color;
  }

  .notification-date {
    color: $--b-main-gray-color;
  }

  .notification-content {
    color: $--b-main-gray-color;
  }

  ::v-deep {
    .spiner-text {
      display: none;
    }

    .spiner-wrapper {
      background: rgba(239, 239, 246, 0.38);
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    .spiner-wrapper .spiner-body {
      box-shadow: none;
      background: transparent;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .spiner {
        .lds-ring,
        .lds-ring div {
          width: 50px;
          height: 50px;
        }

        .lds-ring div {
          border-color: $--b-main-gray-color transparent transparent transparent;
        }
      }
    }
  }
}

.notification-response {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: $color-8a8aa8;
  margin-bottom: 8px;

  > img {
    margin-right: 5px;
  }
}

::v-deep {
  .vcp__body {
    z-index: 1 !important;
  }
  .vcp__body-content {
    padding: 8px 12px 0px 12px;
  }

  .vcp__header {
    padding-right: 7px;
    padding-bottom: 0;
    flex-direction: column;
  }

  .b-selectable {
    z-index: 1000;
  }
}

.notification-push,
.not-collapsible {
  ::v-deep {
    .vcp__header,
    .vcp__body,
    .vcp__body-content,
    .notification-header {
      padding: 0;
    }
  }
}

.b-selectable {
  width: 20px;
  height: 20px;
}

.notification-header-right-side {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 5px;
}

.notification-read {
  background: $color-fff;
  border-bottom: 1px solid $color-efeff6;
}

.notification__top-side {
  margin-bottom: 8px;
}
.push-notification-content {
  @include inter(13px, 400, $color-f0f0f4);
  line-height: 20px;
  margin-bottom: 8px;
  position: relative;

  ::v-deep(.vcp__header-icon) {
    position: absolute;
    left: 105px;
    top: 8px;
  }
}

.notification-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.notification-expand-button {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: $color-148783;
  cursor: pointer;
}
.not-full-content {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
  width: fit-content;
}
.notification-main-content {
  margin-top: 10px;
}
.notification-image {
  margin-right: 12px;
  @include mobile {
    margin: 0px;
  }
}

.notification-selected {
  background: #f9f9fc;
  border-bottom: none;
}
.checked {
  opacity: 0.6;
}
.delete-notfication-cross {
  cursor: pointer;
}
.notification-mobile {
  ::v-deep(.vcp__header-icon) {
    position: absolute;
    right: 22px;
  }
}
</style>
