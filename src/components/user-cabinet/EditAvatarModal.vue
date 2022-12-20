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
                <img :src="userSrcImage" ref="cropImg" alt="">
              </div>
            </div>

            <div class="b-edit-avatar__left-side">
              <div class="b-edit-avatar__edited-pic">
                <img :src="cropedImage" alt="">
              </div>

              <div class="b-edit-avatar__main-functions">
                <div class="b-edit-avatar__another-pic">

                  <label for="my_file">
                    <input 
                      type="file" 
                      id="my_file" 
                      style="display: none;" 
                      @change="onFileSelected"
                    />
                    <img src="../../assets/img/add-picture.svg" alt="">
                    <span class="b-edit-avatar__desk-text">
                      {{ $t('modals.edit_avatar.another-pic') }}
                    </span>
                    <span class="b-edit-avatar__mob-text">
                      {{ $t('modals.edit_avatar.chose-another-pic') }}
                    </span>
                  </label>

                </div>
                <div class="b-edit-avatar__left-mob-part">
                  <div 
                    class="b-edit-avatar__rotate"
                    @click="rotateImage"
                  >
                    <img src="../../assets/img/rotate-picture.svg" alt="">
                    <span>
                      {{ $t('modals.edit_avatar.rotate') }}
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
              @click-function="setAvatar"
            />
          </div>
        </div>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref, watch, watchEffect, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from '@system.it.flumx.com/vee-validate'
import * as yup from "yup"
import { useI18n } from 'vue-i18n'
import Cropper from 'cropperjs';

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
  props: ['userImage'],
  emits: ['closeModal', 'getProfileData'],
  setup(props, { emit }) {
    const cropImg = ref(null)
    const cropedImage = ref('')
    const userSrcImage = ref(null)
    const selectedFile = ref(null)
    const blobFile = ref(null)
    const fileReader = new FileReader()

    let cropper = null

    userSrcImage.value = props.userImage

    const iconSave = computed(() => SaveIcon)
    function closeModal() {
      userSrcImage.value = null
      selectedFile.value = null
      emit('closeModal', 'edit_avatar')
    }
    function getCroppedImage() {
      cropper
        .getCroppedCanvas()
        .toBlob(blob => {
          blobFile.value = blob
          cropedImage.value = URL.createObjectURL(blob)
        }, 'image/jpeg')
    }
    function rotateImage() {
      cropper.rotate(-90)
    }
    function onFileSelected(event) {
      selectedFile.value = event.target.files[0]
    }
    
    function setAvatar() {
      const formData = new FormData();
      
      const myAvatar = new File([blobFile.value], "my_avatar.jpg", {type:"image/jpg", lastModified:new Date().getTime()})

      formData.append("avatar", myAvatar)
      API.AuthorizationService.AddAvatar(formData)
        .then(() => {
          emit('closeModal', 'edit_avatar')
          emit('getProfileData')
        })
        .catch(e => console.log(e))
    }

    fileReader.onload = (event) => {
      userSrcImage.value = event.target.result
    }

    watchEffect(() => {
      if(selectedFile.value) {
        fileReader.readAsDataURL(selectedFile.value)
      }
    })

    watch(
      userSrcImage,
      () => {
        if(userSrcImage.value) {
          cropper.replace(userSrcImage.value)
        }
      }
    )

    onMounted(() => {
      cropImg.value.addEventListener('ready', function () {
        getCroppedImage()
      });
      cropImg.value.addEventListener('cropend', function (event) {
        getCroppedImage()
      });
      cropImg.value.addEventListener('crop', function (event) {
        getCroppedImage()
      });
      cropper = new Cropper(cropImg.value, {
        aspectRatio: 1,
        minCropBoxWidth: 50,
        minCropBoxHeight: 50,
        viewMode: 2,
        dragMode: 'crop',
        rotatable: true,
        background: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
      })
    })
    onUnmounted(() => {
      cropper.destroy()
    })


    return {
      closeModal,
      setAvatar,
      onFileSelected,
      rotateImage,
      iconSave,
      cropImg,
      cropedImage,
      userSrcImage
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
        width: 196px;
        @media (max-width: 576px) {
          width: 100%;
        }
        img { 
          @media (max-width: 576px) {
            width: 100%;
          }
        }
      }
    }
    .b-edit-avatar__left-side {
      .b-edit-avatar__edited-pic {
        width: 140px;
        height: 132px;
        overflow: hidden;
        @media (max-width: 576px) {
          display: none;
        }
        img {
          display: block;
          height: 100%;
          margin: 0 auto;
        }
      }
      .b-edit-avatar__another-pic,
      .b-edit-avatar__rotate {
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
          label {
            display: flex;
            align-items: center;
            cursor: pointer;
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
        }
        .b-edit-avatar__left-mob-part {
          @media (max-width: 576px) {
            display: flex;
          }
          .b-edit-avatar__rotate {
            margin-right: 8px;
          }
          .b-edit-avatar__rotate {
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