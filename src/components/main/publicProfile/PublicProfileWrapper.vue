<template>
  <div class="b-public-profile__wrapper__wrapper">
    <div class="b-public-profile__wrapper__main-side">
      <div class="b-public-profile__wrapper-edit-buttons">
        <div
          class="b-public-profile__continue"
          @click="$emit('closeModal', 'public_profile')"
        >
          <span>{{ $t('buttons.keep-editing') }}</span>
          <img src="../../../assets/img/arrow-left-small.svg" alt="" />
        </div>
        <div @click="$emit('saveChanges')" class="b-public-profile__exit">
          <span>{{ $t('buttons.save-and-out') }}</span>
          <img src="../../../assets/img/cross-white.svg" alt="" />
        </div>
      </div>
      <div class="b-main-side-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['saveChanges', 'closeModal'],
};
</script>

<style lang="scss" scoped>
$color-e2e2e9: #e2e2e9;
$color-6f6f77: #6f6f77;

.b-public-profile__wrapper__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(9, 9, 16, 0.8);
  z-index: 999;

  .b-public-profile__wrapper__main-side {
    position: absolute;
    top: 60%;
    left: 50%;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -50%);

    @include mobile {
      width: 100%;
    }

    .b-public-profile__wrapper-edit-buttons {
      display: flex;
      align-items: center;
      gap: 12px;
      align-self: flex-end;
      @include mobile {
      }

      .b-public-profile__continue {
        @include inter(12px, 400, $color-e2e2e9);
        line-height: 24px;
        text-align: center;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .b-public-profile__exit {
        @include inter(12px, 500, $--b-main-white-color);
        line-height: 24px;
        text-align: center;
        background: $color-6f6f77;
        border-radius: 6px;
        padding: 2px 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
    }

    .b-main-side-content {
      background: $--b-main-white-color;
      width: max-content;
      border-radius: 20px 20px 0px 0px;
      padding: 36px 28px 28px 28px;
      position: relative;
      overflow: scroll;
      @include calc-height;
      margin-top: 12px;

      @include tabletAndMobile {
        @include calc-height(100px);
      }

      @include mobile {
        width: 100%;
        padding: 0px 15px 15px 15px;
        border-radius: 0px;
      }
    }
  }
}
</style>
