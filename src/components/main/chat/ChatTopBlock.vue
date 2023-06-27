<template>
  <div class="b-chat-top-block">
    <div class="b-left-side">
      <img
        class="b-go-back-button-mobile"
        src="../../../assets/img/chat/go-back-button.svg"
        alt=""
      />
      <div class="b-chat-info-block">
        <userAvatar
          class="b-chat-avatar"
          avatarType="rounded-square"
          :link="chatData.avatar"
          :full-name="chatData.name"
        />
        <div class="b-chat-name">
          {{ chatData.name }}
        </div>
      </div>
    </div>
    <div class="b-right-side">
      <img
        v-for="button in currentVisibleChatRightSideButtons"
        class="b-right-side-button"
        :src="button.img"
        @click="button.action"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';

import { useWindowWidth } from '../../../utils/widthScreen';

import SearchButton from '../../../assets/img/chat/search-button.svg';
import ManageButton from '../../../assets/img/chat/manage-button.svg';
import ManageButtonMobile from '../../../assets/img/chat/manage-button-mobile.svg';
import EditButton from '../../../assets/img/chat/edit-button.svg';

export default {
  components: {
    UserAvatar,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  emits: ['searchChatMessages', 'showManageChatModal', 'editChat'],
  setup(_, { emit }) {
    const { detectedDevice, DEVICE_TYPES } = useWindowWidth();

    const icons = computed(() => {
      return {
        searchButton: SearchButton,
        manageButton: ManageButton,
        manageButtonMobile: ManageButtonMobile,
        editButton: EditButton,
      };
    });

    const chatRightSideButtons = ref([
      {
        img: icons.value.editButton,
        action: () => emit('editChat'),
        disabled: false,
      },
      {
        img: icons.value.searchButton,
        action: () => emit('searchChatMessages'),
        disabled: false,
      },
      {
        img: icons.value.manageButton,
        action: () => emit('showManageChatModal'),
        disabled: false,
      },
    ]);

    const chatRightSideButtonsMobile = ref([
      {
        img: icons.value.manageButtonMobile,
        action: () => emit('showManageChatModal'),
        disabled: false,
      },
    ]);

    const currentVisibleChatRightSideButtons = computed(() => {
      switch (detectedDevice.value) {
        case DEVICE_TYPES.MOBILE_SMALL: {
          return chatRightSideButtonsMobile.value;
        }
        default:
          return chatRightSideButtons.value;
      }
    });

    return {
      currentVisibleChatRightSideButtons,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-top-block {
  background: #f9f9fc;
  box-shadow: 2px 2px 10px 0px rgba(56, 56, 251, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  gap: 16px;

  @include mobile {
    padding: 12px 16px;
    background: $--b-main-white-color;
  }

  .b-left-side {
    display: flex;
    align-items: center;

    @include mobile {
      width: 100%;
    }

    .b-chat-info-block {
      display: flex;
      align-items: center;
      gap: 12px;

      @include mobile {
        width: 100%;
        flex-direction: row-reverse;
        justify-content: space-between;
      }

      .b-chat-avatar {
        @include mobile {
          &:deep(.b-avatar) {
            width: 40px;
            height: 40px;

            &.b-avatar-words {
              font-size: 20px;
            }
          }
        }
      }

      .b-chat-name {
        @include exo(18px, 700, $--b-main-black-color);
        line-height: 24px;
      }
    }

    .b-go-back-button-mobile {
      display: none;
      cursor: pointer;
      margin-right: 16px;
      @include beforeDesktop {
        display: block;
      }
    }
  }

  .b-right-side {
    display: flex;
    align-items: center;
    gap: 12px;

    .b-right-side-button {
      cursor: pointer;
    }
  }
}
</style>
