<template>
  <div @click.self="$emit('closeModalClick')" class="b-version-modal">
    <div class="b-version-modal__window">
      <div class="b-version-modal__left-side">
        <img src="../../assets/img/logo-modal-versions.svg" alt="" />
      </div>
      <div class="b-version-modal__right-side">
        <div class="b-version-modal__name">
          {{ $t('versions.blanball') }}
        </div>
        <div class="b-version-modal__title">
          {{ $t('versions.new-version-available') }}
        </div>
        <div class="b-version-modal__description">
          {{ $t('versions.go-to-the-event-page-for-more-details') }}
        </div>
        <div class="b-version-modal__buttons">
          <div class="b-version-modal__download">
            {{  $t('versions.download-update') }}
          </div>
          <div class="b-version-modal__whats-new" @click="showVersionsPage">
            {{  $t('versions.what-is-new') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

import { ROUTES } from '../../router/router.const';

export default {
  name: 'ModalVersion',
  emits: ['closeModalClick'],
  setup(props, context) {
    const router = useRouter();

    function showVersionsPage() {
      context.emit('closeModalClick');
      router.push(ROUTES.APPLICATION.VERSION.absolute);
    }
    return {
      showVersionsPage,
    };
  },
};
</script>

<style lang="scss" scoped>

// SCSS variables for hex colors
$color-fcfcfc: #fcfcfc;
$color-8a8aa8: #8a8aa8;
$color-efeff6: #efeff6;
$color-424257: #424257;
$color-e2e2e9: #e2e2e9;

.b-version-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.514);
  z-index: 999;

  .b-version-modal__window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 420px;
    padding: 18px;
    background: $color-fcfcfc;
    display: flex;

    .b-version-modal__left-side {
      img {
      }
    }

    .b-version-modal__right-side {
      .b-version-modal__name {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: $color-8a8aa8;
        margin-bottom: 8px;
      }

      .b-version-modal__title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: $--b-main-black-color;
        margin-bottom: 8px;
      }

      .b-version-modal__description {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: $--b-main-gray-color;
        margin-bottom: 12px;
      }

      .b-version-modal__buttons {
        display: flex;
        justify-content: space-between;

        .b-version-modal__download {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 24px;
          text-align: center;
          color: $--b-main-gray-color;
          padding: 2px 12px;
          background: $color-efeff6;
          border-radius: 6px;
          cursor: pointer;
        }
        .b-version-modal__whats-new {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 24px;
          text-align: center;
          color: $color-424257;
          border: 1px solid $color-e2e2e9;
          border-radius: 6px;
          padding: 2px 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
