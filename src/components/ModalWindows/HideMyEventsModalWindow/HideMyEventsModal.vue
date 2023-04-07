<template>
  <div class="b-hide-events-modal__wrapper">
    <div class="b-hide-events-modal__modal-window">
      <div class="b-hide-events-modal__top-side">
        <div class="b-hide-events-modal__title">Приховати події</div>
        <img
          class="b-hide-events-modal__close-button"
          src="../../../assets/img/cross.svg"
          alt=""
          @click="closeModal"
        />
        <div class="b-hide-events-modal__tabs-block">
          <div class="b-hide-events-modal__tabs">
            <div
              v-for="tab in tabs"
              :class="[
                'b-hide-events-modal__tab',
                { selected: selectedTabId === tab.id },
              ]"
              @click="changeTab(tab.id)"
            >
              {{ tab.text }}
            </div>
          </div>
          <div class="b-cancel-hide-button"
            @click="closeModal">
            <span class="b-hide-button-desktop">Скасувати приховування</span>
            <span class="b-hide-button-mobile">Скасувати</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import { API } from '../../../workers/api-worker/api.worker';

export default {
  emits: ['closeModal'],
  setup(_, { emit }) {
    const selectedTabId = ref(1);

    const tabs = computed(() => [
      {
        id: 1,
        text: 'Деякі',
      },
      {
        id: 2,
        text: 'Всі',
      },
    ]);

    const changeTab = (tabId) => {
      selectedTabId.value = tabId;
    };

    const closeModal = () => {
      emit('closeModal');
    };

    return {
      tabs,
      selectedTabId,
      changeTab,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-hide-events-modal__wrapper {
  @include modal-wrapper;

  .b-hide-events-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 875px;
    height: 655px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    background: #ffff;
    padding: 24px 20px;
    position: relative;

    @include beforeDesktop {
      width: 100%;
      margin-top: 220px;
      height: 100%;
      box-shadow: 0px 0px 4px rgba(6, 95, 79, 0.04),
        0px -4px 8px rgba(6, 95, 79, 0.06);
      border-radius: 20px 20px 0px 0px;
      padding: 20px;
    }

    @include mobile {
      margin-top: 90px;
      padding: 22px 0px 8px;
      box-shadow: 0px 0px 4px rgba(6, 95, 79, 0.04),
        0px -4px 8px rgba(6, 95, 79, 0.06);
    }

    .b-hide-events-modal__top-side {
      @include mobile {
        position: fixed;
        bottom: 12%;
        width: 100%;
        padding: 0px 20px;
      }
      .b-hide-events-modal__title {
        @include inter(13px, 400);
        line-height: 24px;

        @include mobile {
          display: none;
        }
      }
      .b-hide-events-modal__close-button {
        cursor: pointer;
        width: 12px;
        height: 12px;
        position: absolute;
        right: 20px;
        top: 20px;

        @include beforeDesktop {
          display: none;
        }
      }

      .b-hide-events-modal__tabs-block {
        display: flex;
        margin-top: 8px;

        @include mobile {
          width: 100%;
          justify-content: space-between;
        }
        .b-hide-events-modal__tabs {
          display: flex;
          align-items: center;
          border: 1px solid #e2e2e4;
          border-radius: 6px;

          .b-hide-events-modal__tab {
            @include inter(13px, 400, $--b-main-gray-color);
            line-height: 22px;
            background: #ffffff;
            text-align: center;
            border-radius: 6px;
            width: 90px;
            padding: 2px;
            cursor: pointer;
            max-height: 30px;

            &.selected {
              background: #f0f0f4;
              border: 2px solid #fff;
              @include inter(13px, 500);
            }
          }
        }
        .b-cancel-hide-button {
          @include inter(13px, 400, $--b-main-gray-color);
          line-height: 32px;
          text-decoration-line: underline;
          margin-left: 36px;
          cursor: pointer;

          .b-hide-button-desktop {
            @include mobile {
              display: none;
            }
          }
          .b-hide-button-mobile {
            display: none;
            @include mobile {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
