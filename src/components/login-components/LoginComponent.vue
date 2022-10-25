<template>
  <div class="b-login-step">
    <Form v-slot="data" :validation-schema="schema">
      <div class="b-login-step__top-part">
        <div class="b-login-step__main-title">Blanball</div>
        <div class="b-login-step__title">Авторизація у системі</div>
        <div class="b-login-step__input">
          <InputComponent
            :outside-title="true"
            :title="`Логін`"
            :placeholder="'elektron@mail.com'"
            :title-width="0"
            name="email"
          />
        </div>
        <div class="b-login-step__input">
          <InputComponent
            :title="`Пароль`"
            :title-width="0"
            :type="['password', 'text']"
            :outside-title="true"
            :has-icon="true"
            name="password"
            :icon="[eyeCrossed, eyeOpened]"
          />
        </div>

        <div class="b-login-step__forgot-password">
          <span> Я не пам’ятаю пароль </span>
        </div>
        <div class="b-login-step__remember-me">
          <div class="b-login-step__check-block">
            <input type="checkbox" name="" id="verification" />
            <label for="verification">
              <span>Запам’ятати логін та пароль для автоматичного входу</span>
              <div class="b-login-step__text-mob">Запам’ятати мене</div>
            </label>
          </div>
          <div class="b-login-step__forgot-password-mob">
            Я не пам’ятаю пароль
          </div>
        </div>
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
      Ще не маєте акаунту?
      <span>Зареєструватися</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import GreenBtn from '../GreenBtn.vue'
import InputComponent from '../InputComponent.vue'

import eyeCross from '../../assets/img/eye-crossed.svg'
import eyeOpen from '../../assets/img/eye-opened.svg'
import * as yup from 'yup'
import { Form } from 'vee-validate'
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
    const eyeCrossed = computed(() => {
      return eyeCross
    })
    const eyeOpened = computed(() => {
      return eyeOpen
    })
    const schema = yup.object({
      email: yup.string().email().required(),
      password: '', // TODO implement password options
    })

    const handleLogin = async (data) => {
      data.validate() // TODO validate
      // TODO check if data valid
      try {
        const apiRequestResult = await API.AuthorizationService.login(
          data.values
        )

        TokenWorker.setToken(apiRequestResult.tokens.access)
        const redirectUrl = router.currentRoute.value.query.redirectUrl
        // TODO toast
        if (redirectUrl) {
          const resolveRouter = router.resolve(redirectUrl)
          if (
            resolveRouter?.matched?.find((match) =>
              match?.path?.includes('pathMatch')
            )
          ) {
            return router.push(ROUTES.APPLICATION.EVENTS.absolute)
          }
          return router.push(redirectUrl)
        }
        await router.push(ROUTES.APPLICATION.EVENTS.absolute)
      } catch (e) {
        // TODO toast
      }
    }

    return {
      eyeCrossed,
      eyeOpened,
      schema,
      handleLogin,
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
    height: 40px;
    margin-top: 12px;
    @media (max-width: 992px) {
      width: 100%;
    }
  }
  .b-login-step__forgot-password {
    text-align: right;
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