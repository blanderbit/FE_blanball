<template>
  <div class="b-hide-events-modal__wrapper">
    <div class="b-hide-events-modal__modal-window">
      <div class="b-hide-events-modal__top-side">
        <div class="b-hide-events-modal__title">Приховати події</div>
        <img
          class="b-hide-events-modal__close-button"
          src="../../../assets/img/cross.svg"
          alt=""
        />
        <div class="b-hide-events-modal__tabs-block">
          <div class="b-hide-events-modal__tabs">
            <div v-for="tab in tabs"
            :class="['b-hide-events-modal__tab', {'selected': selectedTabId === tab.id}]"
                @click="changeTab(tab.id)">
              {{ tab.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
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
        selectedTabId.value = tabId
    }

    return {
      tabs,
      selectedTabId,
      changeTab,
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

    .b-hide-events-modal__top-side {
      .b-hide-events-modal__title {
        @include inter(13px, 400);
        line-height: 24px;
      }
      .b-hide-events-modal__close-button {
        cursor: pointer;
        width: 12px;
        height: 12px;
        position: absolute;
        right: 20px;
        top: 20px;
      }

      .b-hide-events-modal__tabs-block {
        display: flex;
        margin-top: 8px;
        .b-hide-events-modal__tabs {
          display: flex;
          align-items: center;
          border: 1px solid #e2e2e4;
          border-radius: 6px;

          .b-hide-events-modal__tab {
            @include inter(13px, 400, $--b-main-gray-color);
            line-height: 28px;
            background: #FFFFFF;
            text-align: center;
            border-radius: 6px;
            width: 85px;
            padding: 2px;
            cursor: pointer;


            &.selected {
                background: #F0F0F4;
                border: 2px solid #fff;
            }
          }
        }
      }
    }
  }
}
</style>
