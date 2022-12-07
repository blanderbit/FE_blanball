<template>
  <div class="b-login-step">
    <!--<div TODO will delete -->
      <!--class="b-login-step__wrong-credentials-message-top"-->
      <!--:style="warningTopStyle"-->
    <!--&gt;-->
      <!--<div class="b-login-step__left-part">-->
        <!--<img src="../../assets/img/warning-black.svg" alt="" />-->
        <!--{{ $t('login.load-error') }}-->
      <!--</div>-->
      <!--<div class="b-login-step__right-part">-->
        <!--{{ $t('login.check-network') }}-->
      <!--</div>-->
    <!--</div>-->
    <Form v-slot="data" :validation-schema="schema">
      <div class="b-login-step__top-part">
        <div class="b-login-step__main-title">{{ $t('login.app-name') }}</div>
        <div class="b-login-step__title">{{ $t('login.authorization') }}</div>
        <div class="b-login-step__input">
          <InputComponent
            :outside-title="true"
            :title="`Логін`"
            :placeholder="'elektron@mail.com'"
            :title-width="0"
            :height="40"
            name="email"
          />
        </div>
        <div class="b-login-step__input">
          <InputComponent
            :title="`Пароль`"
            :title-width="0"
            :type="['password', 'text']"
            :outside-title="true"
            :placeholder="'********'"
            :has-icon="true"
            name="password"
            :height="40"
            :icon="[eyeCrossed, eyeOpened]"
          />
        </div>

        <div class="b-login-step__forgot-password" @click="openResetPasswordModal()">
          <span> {{ $t('login.forgot-password') }} </span>
        </div>
        <div class="b-login-step__remember-me">
          <div class="b-login-step__check-block">
            <input type="checkbox" name="" id="verification" />
            <label for="verification">
              <span>{{ $t('login.remember-login') }}</span>
              <div class="b-login-step__text-mob">{{ $t('login.remember-me') }}</div>
            </label>
          </div>
          <div class="b-login-step__forgot-password-mob" @click="openResetPasswordModal()">
            {{ $t('login.forgot-password') }}
          </div>
        </div>
      </div>
      <div
        v-if="showInvalidCredentials"
        class="b-login-step__wrong-credentials-message d-flex align-items-center"
      >
        <img src="../../assets/img/warning-black.svg" alt="" /> {{ $t('login.wrong-credentials') }}
      </div>
      <div class="b-login-step__buttons">
        <GreenBtn
          @click-function="handleLogin(data)"
          :text="'Увійти в акаунт'"
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import GreenBtn from '../GreenBtn.vue'
import InputComponent from '../forms/InputComponent.vue'

import eyeCross from '../../assets/img/eye-crossed.svg'
import eyeOpen from '../../assets/img/eye-opened.svg'
import * as yup from 'yup'
import { Form } from '@system.it.flumx.com/vee-validate'
import { API } from '../../workers/api-worker/api.worker'
import { ROUTES } from '../../router'
import { TokenWorker } from '../../workers/token-worker'

export default {
  name: 'Step1',
  components: {
    GreenBtn,
    InputComponent,
    Form,
  },
  setup() {
    const router = useRouter()

    const isWrongCreds = ref(false)
    const showInvalidCredentials = computed(() => {
      return isWrongCreds.value
    })

    const warningTopStyle = computed(() => {
      return {
        top: showInvalidCredentials.value ? '20px' : '-50px',
      }
    })
    const eyeCrossed = computed(() => {
      return eyeCross
    })
    const eyeOpened = computed(() => {
      return eyeOpen
    })
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required().min(8), // TODO implement password options
    })

    const openResetPasswordModal = () => {
      router.push(ROUTES.AUTHENTICATIONS.RESET.absolute)
    }
    const handleLogin = async (data) => {
      const { valid } = await data.validate();

      if(!valid) {
        return false
      }

      try {
        const apiRequestResult = await API.AuthorizationService.login(
          data.values
        );

        TokenWorker.setToken(apiRequestResult.data.tokens.access);
        const redirectUrl = router.currentRoute.value.query.redirectUrl;
        if (redirectUrl) {
          const resolveRouter = router.resolve(redirectUrl);
          if (
            !redirectUrl || resolveRouter?.matched?.find((match) =>
              match?.path?.includes('pathMatch')
            )
          ) {
            return router.push(ROUTES.APPLICATION.EVENTS.absolute)
          }
          return router.push(redirectUrl)
        }
        await router.push(ROUTES.APPLICATION.EVENTS.absolute)
      } catch (e) {
        isWrongCreds.value = true
      }
    };
    const openRegisterPage = () => router.push(ROUTES.AUTHENTICATIONS.REGISTER.absolute)

    return {
      eyeCrossed,
      eyeOpened,
      schema,
      handleLogin,
      showInvalidCredentials,
      warningTopStyle,
      openResetPasswordModal,
      openRegisterPage
    }
  },
}
</script>

<style lang="scss" scoped>
.b-login-step {
  padding: 44px 24px 72px 24px;
  height: 100%;
  @media (max-width: 576px) {
    padding: 44px 0px 72px 0px;
  }
  .b-login-step__wrong-credentials-message-top {
    padding: 8px;
    position: absolute;
    width: 749px;
    height: 40px;
    background: #fee7e7;
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
    color: #f32929;
    transition: all 0.3s ease-in-out;
    .b-login-step__left-part {
      display: flex;
      align-items: center;
      padding-right: 8px;
      margin-right: 12px;
      border-right: 1px solid #e26767;
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
      color: #262541;
      @media (max-width: 576px) {
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
      color: #262541;
      @media (max-width: 576px) {
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
      color: #8a8aa8;
      border-bottom: 1px dashed #8a8aa8;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
  .b-login-step__remember-me {
    margin-top: 24px;
    @media (max-width: 576px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .b-login-step__check-block {
      input {
        display: none;
      }
      label {
        position: relative;
        span {
          margin-left: 30px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #262541;
          @media (max-width: 576px) {
            display: none;
          }
        }
        .b-login-step__text-mob {
          margin-left: 30px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #262541;
          @media (min-width: 576px) {
            display: none;
          }
        }
      }
      label:before {
        content: '';
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        height: 15px;
        border: 1px solid #575775;
        color: #fff;
        border-radius: 3px;
      }
      input:checked + label::before {
        background-image: url('../../assets/img/login-tick.svg');
        background-position: center;
        background-size: cover;
        border: none;
      }
    }

    .b-login-step__forgot-password-mob {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #8a8aa8;
      border-bottom: 1px dashed #8a8aa8;
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
    color: #f32929;
    padding: 2px 0px 2px 4px;
    width: 100%;
    height: 44px;
    background: #fee7e7;
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
    color: #262541;
    span {
      color: #148783;
      border-bottom: 1px dashed #148783;
      cursor: pointer;
    }
  }
}
</style>