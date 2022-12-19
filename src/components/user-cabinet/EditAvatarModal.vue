<template>
  <Transition>
    <ModalWindow
      :is-title-shown="false"
      @close-modal="closeModal"
    >
      <template #edit-avatar>
        <div class="b-edit-avatar">
          <div class="b-edit-avatar__main-part">

            <div class="b-edit-avatar__right-side">
              <div class="b-edit-avatar__crop-pic">
                <img src="../../assets/img/user-pic-edit-big.png" alt="">
              </div>
            </div>

            <div class="b-edit-avatar__left-side">
              <div class="b-edit-avatar__edited-pic">
                <img src="../../assets/img/user-pic-edit-small.png" alt="">
              </div>

              <div class="b-edit-avatar__main-functions">
                <div class="b-edit-avatar__another-pic">
                  <img src="../../assets/img/add-picture.svg" alt="">
                  <span class="b-edit-avatar__desk-text">
                    {{ $t('modals.edit_avatar.another-pic') }}
                  </span>
                  <span class="b-edit-avatar__mob-text">
                    {{ $t('modals.edit_avatar.chose-another-pic') }}
                  </span>
                </div>
                <div class="b-edit-avatar__left-mob-part">
                  <div 
                    class="b-edit-avatar__rotate"
                    :style="btnStyle"
                  >
                    <img src="../../assets/img/rotate-picture.svg" alt="">
                    <span>
                      {{ $t('modals.edit_avatar.rotate') }}
                    </span>
                  </div>
                  <div 
                    class="b-edit-avatar__cut"
                    :style="btnStyle"
                  >
                    <img src="../../assets/img/cut-picture.svg" alt="">
                    <span>
                      {{ $t('modals.edit_avatar.cut') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="b-edit-avatar__btns-block">
            <div 
              class="b-edit-avatar__cancel-btn"
              @click="closeModal"
            >
              {{ $t('buttons.decline') }}
            </div>
            <GreenBtn 
              :icon="iconSave"
              :width="125"
              :text="$t('buttons.save')"
            />
          </div>
        </div>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from '@system.it.flumx.com/vee-validate'
import * as yup from "yup"
import { useI18n } from 'vue-i18n'

import ModalWindow from '../ModalWindow.vue'
import InputComponent from '../forms/InputComponent.vue'
import GreenBtn from '../GreenBtn.vue'

import SaveIcon from '../../assets/img/save-icon.svg'
import { API } from "../../workers/api-worker/api.worker"

import { ROUTES } from "../../router/router.const"

export default {
  name: 'EditAvatarModal',
  components: {
    ModalWindow,
    InputComponent,
    Form,
    GreenBtn
  },
  props: {
  },
  emits: ['closeModal'],
  setup(props, context) {
    // const { t } = useI18n();
    // const schema = computed(() => {
    //   return yup.object({
    //     verify_code: yup.string().required().min(5),
    //     email: yup.string().required()
    //   })
    // })
    const windowWidth = ref(window.innerWidth)
    const iconSave = computed(() => SaveIcon)
    const btnStyle = computed(() => {
      if (windowWidth.value < 576) {
        return {
        }
      }
    })

    function closeModal() {
      context.emit('closeModal', 'edit_avatar')
    }
    function onResize() {
      windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener('resize', onResize)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })


    return {
      closeModal,
      iconSave,
      btnStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.b-edit-avatar { 
  &__main-part {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    @media (max-width: 576px) {
      display: block;
    }
    .b-edit-avatar__right-side { 
      .b-edit-avatar__crop-pic { 
        overflow: hidden;
        height: 248px;
        img { 
          @media (max-width: 576px) {
            width: 100%;
          }
        }
      }
    }
    .b-edit-avatar__left-side {
      .b-edit-avatar__edited-pic {
        @media (max-width: 576px) {
          display: none;
        }
      }
      .b-edit-avatar__another-pic,
      .b-edit-avatar__rotate,
      .b-edit-avatar__cut {
        display: flex;
        align-items: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;
        color: #575775;
        margin-bottom: 12px;
        cursor: pointer;
        @media (max-width: 576px) {
          margin-bottom: 0;
        }
        span {
          @media (max-width: 576px) {
            display: none;
          }
        }
      }
      .b-edit-avatar__main-functions {
        margin-left: 10px;
        margin-top: 18px;
        img {
          margin-right: 9px;
          @media (max-width: 576px) {
            margin-right: 0;
          }
        }
        @media (max-width: 576px) {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .b-edit-avatar__another-pic {
          .b-edit-avatar__desk-text {
            @media (max-width: 576px) {
              display: none;
            }
          }
          .b-edit-avatar__mob-text {
            display: none;
            @media (max-width: 576px) {
              display: block;
            }
          }
          img {
            @media (max-width: 576px) {
              display: none;
            }
          }
        }
        .b-edit-avatar__left-mob-part {
          @media (max-width: 576px) {
            display: flex;
          }
          .b-edit-avatar__rotate {
            margin-right: 8px;
          }
          .b-edit-avatar__rotate,
          .b-edit-avatar__cut {
            @media (max-width: 576px) {
              border: 1px solid #DFDEED;
              padding: 9px 17px;
              border-radius: 6px;
            }
          }
        }
      }
    }
  }

  &__btns-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #EFEFF6;
    padding-top: 20px;
    .b-edit-avatar__cancel-btn {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #575775;
      padding: 4px 16px;
      cursor: pointer;
    }
  }
}
</style>