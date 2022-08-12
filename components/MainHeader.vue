<template>
  <div class="header">
    <Transition appear>
      <ModalWindow 
        v-if="isModalActive" 
        @close-modal="toggleModal"
      >
        <template #title>
          {{ $t('modals.change_number.change-number') }}
        </template>
        <template #title-icon>
          <img src="../assets/img/add-phone.svg" alt="" />
        </template>
        <template #change-phone-number>
          <div 
            v-if="modal.first" 
            class="change-phone-screen-1"
          >
            <div class="current-number">
              (617) 623-2338
            </div>
            <p class="description-text">
              {{ $t('modals.change_number.main-text') }}
            </p>
            <div class="btns-block">
              <div 
                class="cancle-btn"
                @click="toggleModal"
              >
                {{ $t('modals.change_number.leave-email') }}
              </div>
              <div 
                class="save-btn"
                @click="toggleModalPage"
              >
                {{ $t('modals.change_number.change-number-title') }}
              </div>
            </div>
          </div>
          <div 
            v-if="modal.second" 
            class="change-phone-screen-2"
          >
            <div class="current-number">
              <InputComponent
                :title="$t('modals.change_number.current-number')"
                :placeholder="'(617) 623-2338'"
                :titleWidth="138"
                :inputType="'number'"
              />
            </div>
            <div class="new-number">
              <InputComponent
                :title="$t('modals.change_number.new-number')"
                :placeholder="'(050) 623-78 95'"
                :titleWidth="138"
                :inputType="'number'"
              />
            </div>
            <p class="sms-text">
              {{ $t('modals.change_number.sms-code') }}        
            </p>
            <div class="sms-code-block">
              <input type="number" placeholder="_" v-model="smscode[1]">
              <input type="number" placeholder="_" v-model="smscode[2]">
              <input type="number" placeholder="_" v-model="smscode[3]">
              <input type="number" placeholder="_" v-model="smscode[4]">
              <input type="number" placeholder="_" v-model="smscode[5]">
            </div>
            <div class="btns-block">
              <div 
                class="cancle-btn"
                @click="toggleModal"
              >
                {{ $t('buttons.cancel-editing') }}
                
              </div>
              <div 
                class="save-btn"
                @click="toggleModal"
              >
                {{ $t('buttons.save-changes') }}
                
              </div>
            </div>
          </div>
        </template>
      </ModalWindow>
    </Transition>
    <div class="mob-menu-icon">
      <img src="../assets/img/mob-menu-icon.svg" alt="">
    </div>
    <BreadCrumbs />
    <!-- delete -->
    <button @click="toggleModal">Изменить телефон</button>
    <!-- delete -->
    <div class="logo">
      <img src="../assets/img/Blanball.png" alt="">
    </div>
    <div class="search-block">
      <img src="../assets/img/search.svg" alt="">
      <input type="text" placeholder="Пошук">
    </div>
  </div>
</template>

<script>
import ModalWindow from '../components/ModalWindow.vue'
import BreadCrumbs from '../components/Breadcrumbs.vue'

export default {
  components: {
    BreadCrumbs,
    ModalWindow
  },
  data() {
    return {
      isModalActive: false,
      modal: {
        first: true,
        second: false
      },
      smscode: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
      }
    }
  },
  methods: {
    toggleModal() {
      this.isModalActive = !this.isModalActive
      this.modal = {
        first: true,
        second: false
      }
    },
    toggleModalPage() {
      this.modal = {
        first: false,
        second: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  .mob-menu-icon {
    display: none;
    @media (max-width: 992px) {
      display: block;
    }
  }
  .logo {
    display: none;
    @media (min-width: 576px) and (max-width: 992px) {
      display: block;
    }
  }
  .search-block {
    position: relative;
    height: 40px;
    width: 220px;
    min-width: 220px;
    img {
      position: absolute;
      right: 15.5px;
      top: 13.5px;
      z-index: 1;
      cursor: pointer;
    }
    input {
      position: absolute;
      width: 220px;
      min-width: 220px;
      height: 40px;
      border: 1px solid #DFDEED;
      border-radius: 6px;
      outline: none;
      padding-left: 15px;
      padding-right: 40px;
    }
  }
}
</style>