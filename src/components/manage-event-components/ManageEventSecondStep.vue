<template>
  <div class="second-step">
    <div class="title-block">
      <span>Конфіденційність</span>
      <div class="vip-only">
        Тільки для ViP
      </div>
    </div>
    <div class="subtitle">
      Чи бажаєте ви отримувати запити на участьу події?
    </div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <input 
          id="radio-3" 
          v-model="isOpened"
          name="openness" 
          type="radio"
          value="Долучитися"
          checked
          >
        <label for="radio-3" class="radio-label">
          <img src="../../../assets/img/lock-closed.svg" alt="">
            Вільний
        </label>
      </div>
      <div class="radio">
        <input 
          id="radio-4" 
          v-model="isOpened"
          name="openness" 
          type="radio"
          value="Подати заявку"
        >
        <label for="radio-4" class="radio-label">
          <img src="../../../assets/img/lock-opened.svg" alt="">
            Закритий
        </label>
      </div>
    </div>
    <div class="title">
      Чи потребує участь у події внесків?
    </div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <input 
          id="radio-5" 
          v-model="payment"
          name="payment" 
          type="radio"
          value="Безкоштовно"
          checked
          >
        <label for="radio-5" class="radio-label">
          Безкоштовно
        </label>
      </div>
      <div class="radio">
        <input 
          id="radio-6" 
          v-model="payment"
          name="payment" 
          type="radio"
          value="Платно"
        >
        <label for="radio-6" class="radio-label">
          Платно
        </label>
      </div>
    </div>
    <div 
      v-if="payment === 'Платно'"
      class="input"
    >
      <InputComponent
        :outside-title="true"
        :title="'Вкажіть суму'"
        :placeholder="'45₴'"
        :title-width="0"
      />
    </div>
    <div class="contact-switcher">
      <span>
        Показувати мої контакти
      </span>
      <Switcher :id="'contacts'" />
    </div>
    <div class="input">
      <InputComponent
        :placeholder="'+38 025 67 98'"
        :title-width="0"
        :has-icon="true"
        :icon="[
          '../../../assets/img/sort-arrows-horizontal.svg'
        ]"
      />
    </div>
    <div class="title">
      Запросити учасників
    </div>
    <div class="input">
      <InputComponent
        :placeholder="'Пошук користувачів'"
        :title-width="30"
        :has-icon="true"
        :icon-left="'../../../assets/img/add-user.svg'"
        :icon="[
          '../../../assets/img/search.svg'
        ]"
      />
    </div>
    <div class="search-users-block">
      <div class="title">
        Шукати серед:
      </div>
      <div class="tegs-block">
        <div
          v-for="tag in tags"
          :key="tag.id"
          :class="['teg', { active: tag.isActive }]"
          @click="this.$emit('chooseCategory', tag.id)"
        >
          {{ tag.text }}
        </div>
      </div>
      <div class="users-window">
        <div
          v-for="team of filteredTeams"
          :key="team.id"
          class="category-block"
        >
          <div class="category-name">
            {{ team.category_name }}
          </div>
          <div class="users-list">
            <div 
              v-for="user of team.users"
              :key="user.id"
              :class="['user', { taken: user.isChosen }]"
            >
              <div class="user-data">
                <div class="user-img">
                  <img :src="user.img" alt="">
                </div>
                <div class="user-name">
                  {{ user.name }}
                </div>
              </div>
              <div 
                v-if="!user.isChosen"
                class="add-user"
                @click="inviteUser(team.id, user.id)"
              >
                <img
                  :class="{ taken: user.isChosen  }"
                  src="../../../assets/img/plus.svg" 
                  alt=""
                >
              </div>
              <div 
                v-else
                class="invited"
              >
                Запрошено
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more-results">
        Показати ще 20 результатів
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import InputComponent from '../../components/InputComponent.vue'
import Switcher from '../../components/Switcher.vue'

export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    filteredTeams: {
      type: Array,
      default: () => []
    }
  },
  components: {
    InputComponent,
    Switcher
  },
  emit: ['chooseCategory'],
  setup(props, {emit}) {
    const isOpened = ref(null)
    const payment = ref(null)

    watch(isOpened, (newVal, oldVal) => {
      if (!(newVal === oldVal)) {
        emit('setEventData', 'isOpened', newVal)
      }
    })
    watch(payment, (newVal, oldVal) => {
      if (!(newVal === oldVal)) {
        emit('setEventData', 'payment', newVal)
      }
    })
    onMounted(() => {
      console.log(props.filteredTeams)
    })

    return {
      isOpened,
      payment
    }
  }
}
</script>

<style lang="scss" scoped>
.second-step {
  .input {
    width: 100%;
    height: 40px;
    margin-top: 16px;
  }
  .radio-btn-wrapper {
    $color1: #f4f4f4;
    $color2: #148783;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .radio {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 6px 12px;
      background: #FFFFFF;
      border: 1px solid #DFDEED;
      border-radius: 6px;
      min-width: 154px;
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        + .radio-label {
          display: flex;
          align-items: center;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 24px;
          text-transform: capitalize;
          color: #262541;
          img {
            margin-right: 4px;
          }
          &:after {
            content: '';
            border-radius: 100%;
            border: 1px solid #262541;
            display: inline-block;
            width: 13px;
            height: 13px;
            position: relative;
            top: 0px;
            margin-left: 12px; 
            vertical-align: top;
            cursor: pointer;
            text-align: center;
            transition: all 250ms ease;
          }
        }
        &:checked {
          + .radio-label {
            &:after {
              border: 1px solid $color2;
              background-color: $color2;
              box-shadow: inset 0 0 0 3px $color1;
            }
          }
        }
        &:focus {
          + .radio-label {
            &:before {
              outline: none;
              border-color: $color2;
            }
          }
        }
        &:disabled {
          + .radio-label {
            &:before {
              box-shadow: inset 0 0 0 4px $color1;
              border-color: darken($color1, 25%);
              background: darken($color1, 25%);
            }
          }
        }
        + .radio-label {
          &:empty {
            &:before {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .title-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #262541;
    }
    .vip-only {
      width: 93px;
      height: 20px;
      background: #EFEFF6;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #575775;
      text-align: center;
    }
  }
  .subtitle {
    margin-top: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #575775;
    margin-bottom: 20px;
  }
  .title {
    margin-top: 20px;
    margin-bottom: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: #262541;
  }
  .contact-switcher {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 8px;
    span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #262541;
    }
  }
  .search-users-block {
    padding: 12px;
    height: 418px;
    background: #FFFFFF;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    margin-top: 8px;
    .title {
      margin: 0;
    }
    .tegs-block {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #DFDEED;
      padding-bottom: 14px;
      margin-top: 8px;
      .teg {
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #8A8AA8;
        cursor: pointer;
        &.active {
          color: #262541;
          background: #F0F0F4;
        }
      }
    }
    .users-window {
      overflow: hidden;
      height: 268px;
      .category-block {
        .category-name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #8A8AA8;
          margin: 8px 0;
        }
        .users-list {
          .user {
            padding: 4px;
            border-radius: 0px 6px 6px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &.taken {
              border: 1px solid #E2E2E9;
              img {
                opacity: 0.5;
              }
            }
            .user-data {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .user-img {
                img {
                  display: block;
                }
              }
              .user-name {
                margin-left: 8px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #262541;
                user-select: none;
              }
            }
            .add-user {
              cursor: pointer;
              img {
                margin-right: 12px;
              }
            }
            .invited {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #8A8AA8;
            }
            &:hover {
              background: #F0F0F4;
              .add-user img {
                filter: invert(61%) sepia(21%) saturate(354%) hue-rotate(202deg) brightness(87%) contrast(90%);
              }
            }
          }
        }
      }
    }
    .show-more-results {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #8A8AA8;
      margin-top: 12px;
      cursor: pointer;
    }
  }
}
</style>