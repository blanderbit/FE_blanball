<template>
  <div class="b-login-step">
    <Form
      v-slot="data"
      :validation-schema="schema"
      @submit="disableSubmit"
    >
      <div class="b-login-step__top-part">
        <div class="b-login-step__main-title">{{ $t('login.app-name') }}</div>
        <div class="b-login-step__title">{{ $t('login.authorization') }}</div>
        <div class="b-login-step__input">
          <MainInput
            :outside-title="true"
            :swipeTitle="false"
            :title="$t('login.login')"
            :inputmode="'email'"
            :placeholder="'example@email.com'"
            :title-width="0"
            :height="40"
            name="email"
          />
        </div>
        <div class="b-login-step__input">
          <MainInput
            :title="$t('login.password')"
            :swipeTitle="false"
            :title-width="0"
            :outside-title="true"
            :placeholder="'********'"
            :has-icon="true"
            :type="'password'"
            name="password"
            :height="40"
          />
        </div>

        <div
          class="b-login-step__forgot-password"
          @click="openResetPasswordModal()"
        >
          <span> {{ $t('login.forgot-password') }} </span>
        </div>
        <div class="b-login-step__remember-me">
          <div class="b-login-step__check-block">
            <checkBox v-model:checked="data.values.save_credentials">
              <template #label>
                <span class="remember-me__desktop">{{
                  $t('login.remember-me')
                }}</span>
                <span class="remember-me__mobile">{{
                  $t('login.remember-me-short')
                }}</span>
              </template>
            </checkBox>
          </div>
          <div
            class="b-login-step__forgot-password-mob"
            @click="openResetPasswordModal()"
          >
            {{ $t('login.forgot-password') }}
          </div>
        </div>
      </div>
      <div
        v-if="showInvalidCredentials"
        class="b-login-step__wrong-credentials-message d-flex align-baseline"
      >
        <img src="../../../assets/img/warning-red.svg" class="m-2" alt="" />
        {{ $t('login.wrong-credentials') }}
      </div>
      <div class="b-login-step__buttons">
        <GreenBtn
          @click-function="handleLogin(data)"
          :text="$t('login.enter-account')"
          :height="40"
        />
      </div>
    </Form>
    <div class="b-login-step__has-no-account">
      {{ $t('login.no-account') }}
      <span @click="openRegisterPage()">{{ $t('login.register') }}</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Form } from '@system.it.flumx.com/vee-validate';

import GreenBtn from '../../shared/button/GreenBtn.vue';
import MainInput from '../../shared/input/MainInput.vue';
import checkBox from '../../shared/checkbox/Checkbox.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { accessToken, refreshToken } from '../../../workers/token-worker';

import { ROUTES } from '../../../router/router.const';
import SCHEMAS from '../../../validators/schemas';

export default {
  components: {
    GreenBtn,
    MainInput,
    Form,
    checkBox,
  },
  setup() {
    const router = useRouter();

    const isWrongCreds = ref(false);
    const showInvalidCredentials = computed(() => {
      return isWrongCreds.value;
    });

    const schema = computed(() => {
      return SCHEMAS.login.schema;
    });

    const warningTopStyle = computed(() => {
      return {
        top: showInvalidCredentials.value ? '20px' : '-50px',
      };
    });


    const handleLogin = async (data) => {
      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }

      try {
        const apiRequestResult = await API.AuthorizationService.login(
          data.controlledValues
        );

        let tokenStorage

        if (data.values.save_credentials) {
          tokenStorage = 'local_storage'
        } else {
          tokenStorage = 'session_storage'
        }
        accessToken.setToken(apiRequestResult.data.tokens.access, tokenStorage);
        refreshToken.setToken(apiRequestResult.data.tokens.refresh, tokenStorage);
        const redirectUrl = router.currentRoute.value.query.redirectUrl;
        if (redirectUrl) {
          const resolveRouter = router.resolve(redirectUrl);
          if (
            !redirectUrl ||
            resolveRouter?.matched?.find((match) =>
              match?.path?.includes('pathMatch')
            )
          ) {
            return router.push(ROUTES.APPLICATION.EVENTS.absolute);
          }
          return router.push(redirectUrl);
        }
        await router.push(ROUTES.APPLICATION.EVENTS.absolute);
      } catch (e) {
        isWrongCreds.value = true;
      }
    };

    const openResetPasswordModal = () =>
      router.push(ROUTES.AUTHENTICATIONS.RESET.absolute);

    const openRegisterPage = () =>
      router.push(ROUTES.AUTHENTICATIONS.REGISTER.absolute);

    return {
      showInvalidCredentials,
      warningTopStyle,
      schema,
      handleLogin,
      openResetPasswordModal,
      openRegisterPage,
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-fee7e7: #fee7e7;
$color-e26767: #e26767;
$color-8a8aa8: #8a8aa8;

.remember-me__desktop {
  @include mobile {
    display: none;
  }
}
.remember-me__mobile {
  @media (min-width: 576px) {
    display: none;
  }
}
.b-login-step {
  padding: 44px 24px 72px 24px;
  height: 100%;

  .b-login-step__wrong-credentials-message-top {
    padding: 8px;
    position: absolute;
    width: 749px;
    height: 40px;
    background: $color-fee7e7;
    border-radius: 6px;
    position: fixed;
    z-index: 1;
    width: max-content;
    display: flex;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: $--b-error-color;
    transition: all 0.3s ease-in-out;
    .b-login-step__left-part {
      display: flex;
      align-items: center;
      padding-right: 8px;
      margin-right: 12px;
      border-right: 1px solid $color-e26767;
      img {
        margin-right: 7px;
      }
    }
    .b-login-step__right-part {
      font-weight: 400;
    }
  }
  .b-login-step__top-part {
    .b-login-step__main-title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 800;
      font-size: 28px;
      line-height: 28px;
      color: $--b-main-black-color;
      @include mobile {
        text-align: center;
      }
    }
    .b-login-step__title {
      font-family: 'Exo 2';

      margin-bottom: 16px;
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: $--b-main-black-color;
      @include mobile {
        text-align: center;
      }
    }
  }
  .b-login-step__input {
    width: 384px;
    margin-top: 12px;
    @media (max-width: 992px) {
      width: 100%;
    }
  }
  .b-login-step__forgot-password {
    text-align: right;
    cursor: pointer;
    margin-top: 8px;
    span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: $color-8a8aa8;
      border-bottom: 1px dashed $color-8a8aa8;
    }
    @include mobile {
      display: none;
    }
  }
  .b-login-step__remember-me {
    margin-top: 26px;
    @include mobile {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .b-login-step__check-block {
      span {
        margin-left: 30px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: $--b-main-black-color;
        vertical-align: bottom;
      }
      :deep .indicator {
        border: 1px solid $--b-main-gray-color;
        background: white;
      }
    }

    .b-login-step__forgot-password-mob {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: $color-8a8aa8;
      border-bottom: 1px dashed $color-8a8aa8;
      @media (min-width: 576px) {
        display: none;
      }
    }
  }
  .b-login-step__buttons {
    margin-top: 24px;
  }
  .b-login-step__wrong-credentials-message {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: $--b-error-color;
    padding: 2px 0px 2px 4px;
    width: 100%;
    height: 44px;
    background: $color-fee7e7;
    border-radius: 6px;
    margin-top: 22px;
  }
  .b-login-step__has-no-account {
    margin-top: 12px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: $--b-main-black-color;
    span {
      color: $--b-main-green-color;
      border-bottom: 1px dashed $--b-main-green-color;
      cursor: pointer;
    }
  }
}
</style>
