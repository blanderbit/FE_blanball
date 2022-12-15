<template>
  <div
    class="b-user-cabinet__buttons"
  >
    <div
      v-if="isEditModeProfile"
      class="b-user-cabinet__save-cancel-btns"
    >
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
    <div
      v-else
      class="b-user-cabinet__edit-button"
    >
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
    WhiteBtn
  },
  props: {
    isEditModeProfile: {
      type: Boolean,
      default: true
    },
    editBtnWidth: {
      type: Number,
      default: 197
    },
    cancelBtnWidth: {
      type: Number,
      default: 98
    },
    saveBtnWidth: {
      type: Number,
      default: 89
    },
  },
  emits: ['cancelDataEdit', 'saveDataEdit', 'toggleModal', 'toggleEditMode'],
  setup() {
    const icons = computed(() => {
      return {
        editIcon: edit
      }
    })

    return {
      icons
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-user-cabinet__buttons {
    order: 4;
    .b-user-cabinet__save-cancel-btns {
      .b-user-cabinet__btns-line {
        display: flex;
        justify-content: space-between;
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
        color: #575775;
        margin-top: 4px;
        cursor: pointer;
      }
    }
  }
</style>