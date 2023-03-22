<template>
  <Transition>
    <ModalWindow :is-title-shown="false">
      <template #edit-avatar>
        <div class="b-edit-avatar">
          <div class="b-edit-avatar__main-part">
            <div class="b-edit-avatar__right-side">
              <vue-cropper
                ref="cropper"
                :aspectRatio="1 / 1"
                :minContainerHeight="200"
                :viewMode="2"
                :styles="{ border: '2px solid red' }"
                :src="userImage"
                alt="Source Image"
                @crop="cropFile"
                preview=".preview"
              >
              </vue-cropper>
            </div>

            <div class="b-edit-avatar__left-side">
              <div class="b-edit-avatar__edited-pic">
                <div class="preview"></div>
              </div>

              <div class="b-edit-avatar__main-functions">
                <div class="b-edit-avatar__another-pic">
                  <label for="my_file">
                    <input
                      type="file"
                      id="my_file"
                      accept="image/png, image/jpeg"
                      style="display: none"
                      @change="onFileSelected"
                    />
                    <img src="../../../assets/img/add-picture.svg" alt="" />
                    <span class="b-edit-avatar__desk-text">
                      {{ $t('modals.edit_avatar.another-pic') }}
                    </span>
                    <span class="b-edit-avatar__mob-text">
                      {{ $t('modals.edit_avatar.chose-another-pic') }}
                    </span>
                  </label>
                </div>
                <div class="b-edit-avatar__left-mob-part">
                  <div class="b-edit-avatar__rotate" @click="rotateImage">
                    <img src="../../../assets/img/rotate-picture.svg" alt="" />
                    <span>
                      {{ $t('modals.edit_avatar.rotate') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="b-edit-avatar__btns-block">
            <div class="b-edit-avatar__cancel-btn" @click="closeModal">
              {{ $t('buttons.decline') }}
            </div>
            <GreenBtn
              :icon="iconSave"
              :width="125"
              :disabled="!blobFile"
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
import { computed, ref, watchEffect } from 'vue';
import { Form } from '@system.it.flumx.com/vee-validate';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ModalWindow from '../ModalWindow.vue';
import InputComponent from '../../forms/InputComponent.vue';
import GreenBtn from '../../GreenBtn.vue';

import SaveIcon from '../../../assets/img/save-icon.svg';

import { useUserDataStore } from '../../../stores/userData';

import { API } from '../../../workers/api-worker/api.worker';

export default {
  name: 'EditAvatarModal',
  components: {
    ModalWindow,
    InputComponent,
    Form,
    GreenBtn,
    VueCropper,
  },
  props: ['userImage'],
  emits: ['closeModal', 'getProfileData'],
  setup(props, { emit }) {
    const cropImg = ref(null);
    const cropedImage = ref('');
    const selectedFile = ref(null);
    const cropper = ref();
    const userDataStore = useUserDataStore();
    const blobFile = ref(null);
    const fileReader = new FileReader();

    const iconSave = computed(() => SaveIcon);

    function closeModal() {
      emit('closeModal', 'edit_avatar');
    }

    function rotateImage() {
      cropper.value.rotate(-90);
    }

    function cropFile() {
      blobFile.value = true;
    }

    function onFileSelected(event) {
      selectedFile.value = event.target.files[0];
    }

    function getAvatar() {
      return new Promise((resolve) => {
        cropper.value.getCroppedCanvas().toBlob(resolve);
      });
    }

    async function setAvatar() {
      if (!blobFile.value) {
        return;
      }

      const formData = new FormData();
      const file = await getAvatar();

      const myAvatar = new File([file], 'my_avatar.jpg', {
        type: 'image/jpg',
        lastModified: new Date().getTime(),
      });

      formData.append('avatar', myAvatar);
      API.AuthorizationService.AddAvatar(formData)
        .then(() => {
          emit('closeModal', 'edit_avatar');
          emit('getProfileData');
        })
        .catch((e) => console.log(e));
      API.UserService.getMyProfile().then((value) => {
        userDataStore.$patch({
          user: value.data,
        });
      });
    }

    fileReader.onload = (event) => {
      cropper.value.replace(event.target.result);
    };

    watchEffect(() => {
      if (selectedFile.value) {
        fileReader.readAsDataURL(selectedFile.value);
      }
    });

    return {
      closeModal,
      setAvatar,
      onFileSelected,
      rotateImage,
      iconSave,
      cropImg,
      cropedImage,
      cropper,
      cropFile,
      blobFile,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-d9d9d9: #d9d9d9;
$color-dfdeed: #dfdeed;
$color-efeff6: #efeff6;

.b-edit-avatar {
  &__main-part {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    @include mobile {
      display: block;
    }
    ::v-deep(.cropper-move) {
      display: none;
    }
    ::v-deep(.b-edit-avatar__right-side) {
      width: 200px;
      @include mobile {
        width: 100%;
      }

      .b-edit-avatar__crop-pic {
        overflow: hidden;
        height: 248px;
        width: 196px;
        @include mobile {
          width: 100%;
        }
        img {
          @include mobile {
            width: 100%;
          }
        }
      }
    }
    .b-edit-avatar__left-side {
      .b-edit-avatar__edited-pic {
        width: 140px !important;
        height: 132px !important;
        overflow: hidden;
        border-radius: 4px;
        @include mobile {
          display: none;
        }
      }
      ::v-deep(.b-edit-avatar__edited-pic) {
        img {
          display: block;
          height: 100%;
          margin: 0 auto;
        }
        .preview {
          background: gainsboro;
          width: 100% !important;
          height: 100%;
          border-radius: 4px;
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
        color: $--b-main-gray-color;
        margin-bottom: 12px;
        cursor: pointer;
        @include mobile {
          margin-bottom: 0;
        }
        span {
          @include mobile {
            display: none;
          }
        }
      }
      .b-edit-avatar__main-functions {
        margin-left: 10px;
        margin-top: 18px;
        img {
          margin-right: 9px;
          @include mobile {
            margin-right: 0;
          }
        }
        @include mobile {
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
              @include mobile {
                display: none;
              }
            }
            .b-edit-avatar__mob-text {
              display: none;
              @include mobile {
                display: block;
              }
            }
            img {
              @include mobile {
                display: none;
              }
            }
          }
        }
        .b-edit-avatar__left-mob-part {
          @include mobile {
            display: flex;
          }
          .b-edit-avatar__rotate {
            margin-right: 8px;
          }
          .b-edit-avatar__rotate {
            @include mobile {
              border: 1px solid $color-dfdeed;
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
    border-top: 2px solid $color-efeff6;
    padding-top: 20px;
    .b-edit-avatar__cancel-btn {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: $--b-main-gray-color;
      padding: 4px 16px;
      cursor: pointer;
    }
  }
}
::v-deep(.cropper-modal) {
  background: $color-d9d9d9;
}
::v-deep(.cropper-line) {
  background: transparent;
  background-color: transparent;
}
::v-deep(.cropper-dashed) {
  opacity: 0;
}
::v-deep(.cropper-center) {
  display: none;
}
::v-deep(.cropper-view-box) {
  border-width: 2px;
  border-style: solid;
  border: 3px dashed $--b-main-green-color;
  background: transparent;
  outline: none;
}
::v-deep(.cropper-point) {
  background: transparent;
}
// ::v-deep(.point-ne) {
//   width: 14px;
//   height: 14px;
//   border-top: 3px solid $color-148783;
//   border-right: 3px solid $color-148783;
// }
// ::v-deep(.point-e) {
//   height: 28px;
//   border-right: 3px solid $color-148783;
// }
</style>
