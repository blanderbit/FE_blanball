<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :title="stepConfig.title"
    :stepperLines="stepConfig.stepperLines"
  >
    <template #images>
      <img
        src="../../../assets/img/ball-colored.svg"
        alt="ball-big"
        class="b-register-step__ball-big"
      />
      <img
        src="../../../assets/img/ball-colored.svg"
        alt="ball-small"
        class="b-register-step__ball-small"
      />
    </template>
    <template #content>
      <div class="b-register-step__input">
        <mainInput
          :outside-title="true"
          :swipeTitle="false"
          :title="$t('register.email')"
          :placeholder="'example@email.com'"
          :title-width="0"
          :height="40"
          name="email"
        />
      </div>
      <div class="b-register-step__input">
        <mainInput
          placeholder="********"
          :swipeTitle="false"
          :title="$t('register.create-password')"
          :title-width="0"
          :type="'password'"
          :height="40"
          :outside-title="true"
          name="password"
        />
      </div>
      <div class="b-register-step__input">
        <mainInput
          placeholder="********"
          :swipeTitle="false"
          :title-width="0"
          :title="$t('register.repeat-password')"
          :type="'password'"
          :height="40"
          :outside-title="true"
          name="re_password"
        />
      </div>
      <div class="b-register-step__input">
        <mainInput
          :outside-title="true"
          :swipeTitle="false"
          :title="$t('register.phone-number')"
          :placeholder="stepConfig.UkraineMask"
          :title-width="0"
          :height="40"
          name="phone"
        >
          <template #input="slotProps">
            <input
              :type="slotProps.type"
              :placeholder="slotProps.placeholder"
              v-on="slotProps.on"
              :value="slotProps.value"
              :style="slotProps.style"
              :disabled="slotProps.disabled"
              v-maska="stepConfig.UkraineMask"
            />
          </template>
        </mainInput>
      </div>

      <div class="b-register-step__remember-me">
        <div class="b-register-step__check-block">
          <checkBox @update:checked="$emit('updateSaveCredentials', $event)">
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
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import mainInput from '../../shared/input/mainInput.vue';
import StepWrapper from './StepWrapper.vue';
import checkBox from '../../shared/checkbox/checkbox.vue';

import tickWhite from '../../../assets/img/tick-white.svg';
import nikeIcon from '../../../assets/img/nike-icon.svg';

export default {
  name: 'Step2',
  components: {
    mainInput,
    StepWrapper,
    checkBox,
  },
  setup() {
    const tick = computed(() => {
      return tickWhite;
    }); // TODO

    const { t } = useI18n();

    const stepConfig = computed(() => {
      return {
        UkraineMask: '+38 (0XX) XXX XX XX',
        title: t('register.create-account'),
        returnButton: {
          exist: true,
          text: t('register.return'),
        },
        nextButton: {
          exist: true,
          text: t('register.register'),
          width: 180,
          icon: nikeIcon,
        },
        stepperLines: {
          count: 2,
          active: 2,
          exist: true,
        },
      };
    });
    return {
      tick,
      stepConfig,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-register-step__input {
  width: 384px;
  margin-top: 12px;
  @media (max-width: 992px) {
    width: 100%;
  }
}

.b-register-step__ball-big {
  position: absolute;
  width: 80px;
  top: -30px;
  left: -30px;
  @include tablet {
    display: none;
  }
}
.b-register-step__ball-small {
  position: absolute;
  top: 0;
  right: 0;
  @include tablet {
    display: none;
  }
}
.b-register-step__remember-me {
  margin-top: 26px;
  @include mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .b-register-step__check-block {
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
  }
}
</style>
