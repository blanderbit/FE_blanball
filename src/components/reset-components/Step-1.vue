<template>
  <div class="b-reset-step">
    <div class="b-reset-step__top-part">
      <div class="b-reset-step__title">Відновлення доступу</div>
      <div class="b-reset-step__progress-line">
        <div class="b-reset-step__sections">
          <div
            v-for="item of progressLine"
            :key="item.id"
            :class="[
              'b-reset-step__section',
              {
                active: item.isActive,
              },
            ]"
          ></div>
        </div>
      </div>
      <div class="b-reset-step__subtitle">
        Лист із кодом-підтвердження надійде на вказану адресу, введіть його у
        відведене поле
      </div>
      <div class="b-reset-step__input">
        <InputComponent
          :outside-title="true"
          :title="`Телефон або пошта`"
          :placeholder="'example@email.com'"
          :title-width="0"
        />
      </div>
      <div class="b-reset-step__code-title">
        Повідомлення прийде протягом 30 сек
      </div>
      <div class="b-reset-step__sms-code-block">
        <input
          v-for="item in codeResettingInputs"
          :key="item.id"
          :ref="setItemRef"
          v-model="item.value"
          type="text"
          placeholder="_"
          @input="codeInput(item.id, $event)"
        />
      </div>
    </div>
    <div class="b-reset-step__buttons">
      <div 
        class="b-reset-step__cancel-button"
        @click="$emit('secondLineOff')"
      >
        Скасувати
      </div>
      <GreenBtn
        :text="'Скинути пароль'"
        :width="155"
        :height="40"
        @click-function="handleNextClick"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import GreenBtn from '../GreenBtn.vue'
import InputComponent from '../InputComponent.vue'

export default {
  name: 'Step1',
  components: {
    GreenBtn,
    InputComponent,
  },
  props: {
    progressLine: {
      type: Array,
      default: () => []
    }
  },
  emit: ['incrementStep', 'secondLineOn'],
  setup(props, {emit}) {
    const codeResettingInputs = ref([
      { id: 0, value: '' },
      { id: 1, value: '' },
      { id: 2, value: '' },
      { id: 3, value: '' },
      { id: 4, value: '' },
    ])
    const itemRefs = ref([])
    const setItemRef = el => {
      if (el) {
        itemRefs.value.push(el)
      }
    }

    function codeInput(id, e) {
      if (e.inputType === 'deleteContentBackward') {
        if (id !== 0) itemRefs.value[id - 1].focus()
      } else {
        const currentInput = codeResettingInputs.value.find((i) => i.id === id)
        if (currentInput.value.length > 1) {
          currentInput.value = currentInput.value.slice(1, 2)
        }
        const nextRefIndex = id + 1
        if (nextRefIndex !== 5) {
          itemRefs.value[nextRefIndex].focus()
        }
      }
    }
    function handleNextClick() {
      if (!props.progressLine[1].isActive) {
        emit('secondLineOn')
      } else {
        emit('incrementStep')
      }
    }
    function pasteHandler() {
      navigator.clipboard.readText()
        .then(text => {
          if (text.length === 5) {
            const splitedValue = text.split('')
            codeResettingInputs.value = this.codeResettingInputs.value.map((item, idx) => {
              return {
                ...item,
                value: splitedValue[idx]
              }
            })
          }
        })
        .catch(err => {
          console.log('К сожалению не удалось взять текст из буффера', err);
        });
    }
    onMounted(() => {
      window.addEventListener('paste', pasteHandler)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('paste', pasteHandler)
    })

    return {
      codeResettingInputs,
      setItemRef,
      codeInput,
      handleNextClick
    }
  },
}
</script>

<style lang="scss" scoped>
.b-reset-step {
  padding: 44px 24px 72px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 576px) {
    padding: 44px 0px 72px 0px;
  }
  .b-reset-step__top-part {
    .b-reset-step__title {
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
    .b-reset-step__progress-line {
      margin-top: 16px;
      margin-bottom: 28px;
      .b-reset-step__sections {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 576px) {
          width: 266px;
          margin: 0 auto;
        }
        .b-reset-step__section {
          width: 33%;
          height: 4px;
          background: #efeff6;
          border-radius: 2px;
          &.active {
            background: #1ab2ad;
          }
        }
      }
    }
    .b-reset-step__subtitle {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #575775;
    }
    .b-reset-step__code-title {
      margin-top: 12px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: #575775;
    }
    .b-reset-step__sms-code-block {
      display: flex;
      margin-bottom: 24px;
      justify-content: space-between;
      align-items: center;
      input {
        padding: 8px;
        width: 72px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #dfdeed;
        border-radius: 6px;
        outline: none;
        text-align: center;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type='number'] {
          -moz-appearance: textfield;
        }
        @media (max-width: 576px) {
          width: 60px;
        }
      }
    }
  }
  .b-reset-step__input {
    width: 384px;
    height: 40px;
    margin-top: 12px;
    @media (max-width: 992px) {
      width: 100%;
    }
  }
  .b-reset-step__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .b-reset-step__cancel-button {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #575775;
      cursor: pointer;
    }
  }
}
</style>