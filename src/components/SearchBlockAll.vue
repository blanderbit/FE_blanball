<template>
  <div class="b-search-block" :style="windowStyle">
    <div class="b-search-block__window">
      <Spinner v-if="isSpinnerActive" />
      <div v-else class="b-modal-items__container" v-for="user in usersList">
        <div
          @click="itemListClick(user)"
          :class="[
            'b-user b-modal-item',
            'w-100',
            { 'b-modal-item__disabled': checkItemIsDisabled(user.id) },
          ]"
        >
          <div>
            <userAvatar
              class="b-user__image"
              @click="$emit('item-image-click', user.id)"
              :link="user.profile.avatar_url"
              :avatarType="'small-square'"
              :full-name="`${user.profile.last_name} ${user.profile.name}`"
            />
          </div>
          <div class="b-user-main-info__container">
            <div class="b-user__name">
              {{ user.profile.last_name }} {{ user.profile.name }}
            </div>
            <img
              v-if="rightUserItemIcon"
              class="b-user-button"
              :src="rightUserItemIcon"
              alt="arrow-right-gray"
            />
          </div>
          <span
            class="b-user-item__disabled-text"
            v-if="checkItemIsDisabled(user.id)"
          >
            {{ itemDisabledText }}
          </span>
        </div>
      </div>
      <span
        class="b-modal-no__results"
        v-if="!usersList.length && !isSpinnerActive"
      >
        {{ $t('errors.no-results') }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue';

import Spinner from '../workers/infinit-load-worker/Spinner.vue';
 import userAvatar from './shared/userAvatar/userAvatar.vue';

export default {
  name: 'SearchBlockAll',
  components: {
    Spinner,
    userAvatar,
  },
  emits: ['item-image-click', 'item-list-click'],
  props: {
    width: {
      type: [String, Number],
      default: 'auto',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    itemIcon: {
      type: String,
      default: '',
    },
    itemDisabledText: {
      type: String,
      default: '',
    },
    disabladUsersIDSList: {
      type: Array,
      default: () => [],
    },
    usersList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const isSpinnerActive = ref(props.loading);
    const rightUserItemIcon = ref(props.itemIcon);

    watch(
      () => props.loading,
      (newData, oldData) => {
        isSpinnerActive.value = newData;
      }
    );

    const checkItemIsDisabled = (user_id) => {
      return props.disabladUsersIDSList.includes(user_id);
    };

    const itemListClick = (user) => {
      if (!checkItemIsDisabled(user.id)) {
        emit('item-list-click', user.id, user);
      }
    };

    const windowStyle = computed(() => {
      if (String(props.width).split('').includes('%')) {
        return { width: props.width };
      } else {
        return { width: `${props.width}px` };
      }
    });

    return {
      windowStyle,
      isSpinnerActive,
      rightUserItemIcon,
      itemListClick,
      checkItemIsDisabled,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f0f0f4: #f0f0f4;
$color-e2e2e9: #e2e2e9;
$color-8a8aa8: #8a8aa8;

.b-user-main-info__container {
  display: flex;
  justify-content: space-between;
}
.b-search-block {
  padding: 12px;
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  margin-top: 8px;
  position: relative;

  .b-search-block__window {
    overflow: hidden;
    position: relative;
  }
}

.b-user__name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: $--b-main-black-color;
  margin-left: 8px;
}
.b-modal-item {
  display: flex;
  align-items: center;
  margin: 5px 0px;
  padding: 5px;
  border-radius: 6px;
  &:not(.b-modal-item__disabled):hover {
    background: $color-f0f0f4;
    cursor: pointer;
    .b-user-button {
      display: block;
    }
  }
}
.b-user-button {
  cursor: pointer;
  display: none;
}
.b-modal-no__results {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: $--b-main-gray-color;
}
.b-user-main-info__container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.b-modal-item__disabled {
  opacity: 0.6;
  border: 1px solid $color-e2e2e9;
}
.b-user-item__disabled-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: $color-8a8aa8;
}
</style>
