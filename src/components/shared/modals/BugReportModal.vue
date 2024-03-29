<template>
  <div class="b-bug-report-modal__wrapper">
    <div class="b-bug-report-modal__modal-window">
      <div class="b-bug-report-modal__top-side">
        <span class="b-bug-report-modal__title">
          {{ $t('modals.bug_report.title') }}
        </span>
        <img src="../../../assets/img/white-warning-icon.svg" alt="warning" />
      </div>
      <Form v-slot="data" :validation-schema="schema" @submit="disableSubmit">
        <div class="b-bug-report-modal__main-side">
          <MainInput
            :placeholder="$t('modals.bug_report.input-placeholder')"
            :swipeTitle="false"
            :height="40"
            :outsideTitle="true"
            :title-width="0"
            :title="$t('modals.bug_report.input-title')"
            name="title"
          />

          <mainTextArea
            :height="100"
            :textareaIcon="addFileIcon"
            class="b-bug-report-modal__description-input"
            :title="$t('modals.bug_report.text-area-title')"
            @icon-click="afterLoadImage"
            name="description"
          />

          <div
            v-for="i in uploadedImages"
            class="b-bug-report-modal__uploaded-images"
          >
            <div class="b-bug-report-modal__uploaded-image">
              <img
                src="../../../assets/img/uploaded-image.svg"
                alt="uploaded-imag"
              />
              <span class="b-bug-report-modal__uploaded-images-title">{{
                i.name
              }}</span>
            </div>
            <img
              @click="removeUploadedImage(i.name)"
              class="b-bug-report-modal-remove__image"
              src="../../../assets/img/cross.svg"
              alt="cross"
            />
          </div>
        </div>

        <div class="b-bug-report-modal__bottom-side">
          <div
            @click="$emit('close-modal')"
            class="b-bug-report-modal__close-button"
          >
            {{ $t('buttons.close-this-window') }}
          </div>
          <div
            @click="createBugReport(data)"
            class="b-bug-report-modal__submit-button"
          >
            {{ $t('buttons.send-feedback') }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

import { Form } from '@system.it.flumx.com/vee-validate';

import MainInput from '../input/MainInput.vue';
import mainTextArea from '../textArea/MainTextArea.vue';

import { API } from '../../../workers/api-worker/api.worker';

import SCHEMAS from '../../../validators/schemas';

import addFileIcon from '../../../assets/img/add-file-icon.svg';

export default {
  components: {
    MainInput,
    mainTextArea,

    Form,
  },
  emits: ['close-modal'],
  setup(_, { emit }) {
    const uploadedImages = ref([]);
    const toast = useToast();
    const { t } = useI18n();

    const schema = computed(() => {
      return SCHEMAS.bugReport.schema;
    });

    const afterLoadImage = (image) => {
      uploadedImages.value.push(image);
    };

    const removeUploadedImage = (fileName) => {
      uploadedImages.value.pop(
        uploadedImages.value.filter((value) => value.name === fileName)
      );
    };

    const createFormData = (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      Object.values(uploadedImages.value).forEach((element) => {
        formData.append('images', element);
      });
      return formData;
    };

    const createBugReport = async (data) => {
      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }

      await API.BugReportsService.CreateBugReport(createFormData(data.values));
      emit('close-modal');
      toast.success(t('notifications.bug-report-created'));
    };

    return {
      addFileIcon,
      schema,
      uploadedImages,

      createBugReport,
      afterLoadImage,
      removeUploadedImage,
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
$color-4c4a82: #4c4a82;

.b-bug-report-modal__description-input:deep(.b-input__icon) {
  height: 10% !important;
  margin-top: 10px;
}
.b-bug-report-modal__description-input {
  &:deep(span) {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: $--b-main-gray-color;
  }

  &:deep(.b-text-area__min-max-label) {
    display: none;
  }
}

.b-bug-report-modal__wrapper {
  @include modal-wrapper;
  .b-bug-report-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 400px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    background: $--b-main-white-color;

    @include mobile {
      width: 350px;
    }

    .b-bug-report-modal__top-side {
      background: $color-4c4a82;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      border-radius: 6px 6px 0px 0px;

      .b-bug-report-modal__title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: $--b-main-white-color;
      }
    }
    .b-bug-report-modal__main-side {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      @media (max-width: 450px) {
        padding: 15px;
      }

      .b-bug-report-modal__uploaded-images {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .b-bug-report-modal__uploaded-image {
          display: flex;
          gap: 10px;

          img {
            max-height: 20px;
          }
        }

        .b-bug-report-modal__uploaded-images-title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: $--b-main-black-color;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 90%;
          word-break: break-word;
        }
        .b-bug-report-modal-remove__image {
          cursor: pointer;
        }
      }
    }
    .b-bug-report-modal__bottom-side {
      display: flex;
      justify-content: space-between;
      padding: 20px;

      @include mobile {
        flex-direction: column;
        gap: 15px;
        padding: 15px;
      }

      .b-bug-report-modal__close-button {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: $--b-main-gray-color;
        cursor: pointer;
      }
      .b-bug-report-modal__submit-button {
        padding: 4px 16px;
        background: $color-4c4a82;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: $--b-main-white-color;
        cursor: pointer;

        @include mobile {
          padding: 8px;
        }
      }
    }
  }
}
</style>
