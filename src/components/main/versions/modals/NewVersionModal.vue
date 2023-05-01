<template>
  <div @click.self="$emit('closeModal')" class="b-version-modal">
    <div class="b-version-modal__window">
      <div class="b-version-modal__left-side">
        <img src="../../../../assets/img/logo-modal-versions.svg" alt="" />
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
          <GreenBtn
            :text="$t('versions.what-is-new')"
            :width="100"
            @click-function="showVersionsPage"
          />
          <WhiteBtn
            :text="$t('register.remind-later')"
            :width="130"
            :height="24"
            :isBorder="false"
            :main-color="'#575775'"
            @click-function="clickDeclineButton(request.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

import GreenBtn from '../../../shared/button/GreenBtn.vue';
import WhiteBtn from '../../../shared/button/WhiteBtn.vue';

import { ROUTES } from '../../../../router/router.const';

export default {
  name: 'ModalVersion',
  emits: ['closeModal'],
  components: {
    GreenBtn,
    WhiteBtn,
  },
  setup(props, context) {
    const router = useRouter();

    function showVersionsPage() {
      context.emit('closeModal');
      router.push(ROUTES.APPLICATION.VERSIONS.absolute);
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
  @include modal-wrapper;

  .b-version-modal__window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 432px;
    padding: 16px 12px;
    background: $color-fcfcfc;
    display: flex;

    .b-version-modal__right-side {
      .b-version-modal__name {
        @include inter(14, 400, $--b-main-gray-color);
      }

      .b-version-modal__title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: $--b-main-black-color;
        margin: 8px 0px;
      }

      .b-version-modal__description {
        @include inter(14px, 400, $--b-main-gray-color);
        line-height: 20px;
        margin-bottom: 12px;
      }

      .b-version-modal__buttons {
        display: flex;
        gap: 12px;
        align-items: center;
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
