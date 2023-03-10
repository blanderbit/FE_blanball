<template>
  <div class="b-user-cabinet__buttons">
    <div v-if="isEditModeProfile" class="b-user-cabinet__save-cancel-btns">
      <div class="b-user-cabinet__btns-line">
        <div class="b-user-cabinet__btn-cancel">
          <WhiteBtn
            :text="$t('buttons.cancel')"
            :width="cancelBtnWidth"
            @click-function="$emit('cancelDataEdit')"
          />
        </div>
        <div class="b-user-cabinet__btn-save">
          <GreenBtn
            :text="$t('buttons.save')"
            :width="saveBtnWidth"
            @click-function="$emit('saveDataEdit')"
          />
        </div>
      </div>
      <div
        class="b-user-cabinet__look-preview"
        @click="$emit('toggleModal', 'public_profile')"
      >
        {{ $t('profile.how-profile-looks') }}
      </div>
    </div>
    <div v-else class="b-user-cabinet__edit-button">
      <GreenBtn
        :text="$t('buttons.edit-profile')"
        :width="editBtnWidth"
        :height="40"
        :icon="icons.editIcon"
        @click-function="$emit('toggleEditMode')"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import GreenBtn from '../../components/GreenBtn.vue'
import WhiteBtn from '../../components/WhiteBtn.vue'

import edit from '../../assets/img/set-filter-white.svg'

export default {
  name: 'ButtonsBlock',
  components: {
    GreenBtn,
    WhiteBtn,
  },
  props: {
    isEditModeProfile: {
      type: Boolean,
      default: true,
    },
    editBtnWidth: {
      type: Number,
      default: 197,
    },
    cancelBtnWidth: {
      type: [Number, String],
      default: 98,
    },
    saveBtnWidth: {
      type: [Number, String],
      default: 89,
    },
  },
  emits: ['cancelDataEdit', 'saveDataEdit', 'toggleModal', 'toggleEditMode'],
  setup() {
    const icons = computed(() => {
      return {
        editIcon: edit,
      }
    })

    return {
      icons,
    }
  },
}
</script>

<style lang="scss" scoped>


// SCSS variables for hex colors
 $color-dfdeed: #dfdeed;


.b-user-cabinet__buttons {
  order: 4;

  @include tabletAndMobile {
    position: absolute;
    left: 50%;
    max-width: 515px;
    width: calc(100% - 40px);
    z-index: 10;
    bottom: 20px;
    transform: translate(-50%, 10px);
  }
  .b-user-cabinet__save-cancel-btns {
    padding: 0px 20px;
    @include tabletAndMobile {
      display: flex;
      flex-direction: column;
    }
    .b-user-cabinet__btns-line {
      display: flex;
      justify-content: space-between;
      @include tabletAndMobile {
        order: 2;
      }
      .b-user-cabinet__btn-cancel {
        margin-right: 12px;
        width: 50%;
      }
      .b-user-cabinet__btn-save {
        width: 50%;
      }
    }
    .b-user-cabinet__look-preview {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: $--b-main-gray-color;
      margin-top: 4px;
      cursor: pointer;
      border-bottom: 1px dashed $color-dfdeed;
      @include tabletAndMobile {
        order: 1;
        text-align: center;
        border: none;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
