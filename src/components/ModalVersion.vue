<template>
  <div @click.self="$emit('closeModalClick')" class="b-version-modal">
    <div class="b-version-modal__window">
      <div class="b-version-modal__left-side">
        <img src="../assets/img/logo-modal-versions.svg" alt="" />
      </div>
      <div class="b-version-modal__right-side">
        <div class="b-version-modal__name">Blanball</div>
        <div class="b-version-modal__title">
          Нова версія Blanball вже доступна!
        </div>
        <div class="b-version-modal__description">
          Перейдіть на сторінку версій щоби ознайомитися із деталями оновлення
        </div>
        <div class="b-version-modal__buttons">
          <div class="b-version-modal__download">Завантажити оновлення</div>
          <div class="b-version-modal__whats-new" @click="showVersionsPage">
            Що нового?
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

import { ROUTES } from '../router/router.const'

export default {
  name: 'ModalVersion',
  emits: ['closeModalClick'],
  setup(props, context) {
    const router = useRouter()

    function showVersionsPage() {
      context.emit('closeModalClick')
      router.push(ROUTES.APPLICATION.VERSION.absolute)
    }
    return {
      showVersionsPage,
    }
  },
}
</script>

<style lang="scss" scoped>
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
    background: #fcfcfc;
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
        color: #8a8aa8;
        margin-bottom: 8px;
      }

      .b-version-modal__title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #262541;
        margin-bottom: 8px;
      }

      .b-version-modal__description {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #575775;
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
          color: #575775;
          padding: 2px 12px;
          background: #efeff6;
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
          color: #424257;
          border: 1px solid #e2e2e9;
          border-radius: 6px;
          padding: 2px 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
