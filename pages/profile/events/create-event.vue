<template>
  <div class="create-events-page">
    <div class="create-event-block">
      <div
        v-if="currentStep === 1"
        class="first-step"
      >
        <Dropdown
          :outside-title="true"
          :main-title="'Тип події'"
          :options="dataDropdown"
          :width="320"
          :height="40"
          @new-value="setFormValue('title', $event)"
        />
        <div class="title">Гендер учасників події</div>
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input 
              id="radio-1" 
              v-model="eventData.labels[1].text"
              name="radio" 
              type="radio"
              value="Чоловіки"
              checked
             >
            <label for="radio-1" class="radio-label">
              <img src="../../../assets/img/male-icon.svg" alt="">
                Чоловіки
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-2" 
              v-model="eventData.labels[1].text"
              name="radio" 
              type="radio"
              value="Жінки"
            >
            <label for="radio-2" class="radio-label">
              <img src="../../../assets/img/female-icon.svg" alt="">
                Жінки
            </label>
          </div>
        </div>
        <Dropdown
          :outside-title="true"
          :main-title="'Вид спорту'"
          :options="dataDropdown2"
          :width="320"
          :height="40"
          @new-value="setFormValue('gameType', $event)"
        />
        <div class="time-and-date">
          <div class="input">
            <InputComponent
              :outside-title="true"
              :title="'Дата'"
              :placeholder="'02.09.2022'"
              :title-width="0"
              :has-icon="true"
              :icon="[
                require('../../../assets/img/calendar.svg')
              ]"
              :v-model="eventData.date"
              @new-value="setFormValue('date', $event)"
            />
          </div>
          <div class="input">
            <InputComponent
              :outside-title="true"
              :title="'Час'"
              :placeholder="'17:00'"
              :title-width="0"
              :has-icon="true"
              :icon="[
                require('../../../assets/img/watch.svg')
              ]"
              :v-model="eventData.date"
              @new-value="setFormValue('time', $event)"
            />
          </div>
        </div>
        <div class="input">
          <InputComponent
            :placeholder="'Місце проведення'"
            :title-width="0"
            :has-icon="true"
            :icon="[
              require('../../../assets/img/location-point.svg')
            ]"
            @new-value="setFormValue('place', $event)"
          />
        </div>
        <div class="event-map">
          <img src="../../../assets/img/map.png" alt="">
        </div>
      </div>

      <div 
        v-if="currentStep === 2"
        class="second-step"
      >
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
              v-model="eventData.isOpened"
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
              v-model="eventData.isOpened"
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
              v-model="eventData.payment"
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
              v-model="eventData.payment"
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
          v-if="eventData.payment === 'Платно'"
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
            :v-model="eventData.date"
            :has-icon="true"
            :icon="[
              require('../../../assets/img/sort-arrows-horizontal.svg')
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
            :v-model="eventData.date"
            :has-icon="true"
            :icon-left="require('../../../assets/img/add-user.svg')"
            :icon="[
              require('../../../assets/img/search.svg')
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
              @click="chooseCategory(tag.id)"
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

      <div 
        v-if="currentStep === 3"
        class="third-step"
      >
        <div class="title-block">
          <span>Додаткова інформація</span>
        </div>
        <div class="subtitle">
          Додайте свій коментар до події та, за бажанням, визначте бонусні пропозиції для гравців
        </div>
        <div class="text-area-wrapper">
          <textarea
            placeholder="Опис подіїї"
          ></textarea>
          <div class="icon">
            <img src="../../../assets/img/aim.svg" alt="">
          </div>
        </div>
        <div class="contact-switcher">
          <div class="title-prize">
            Чи буде розіграно приз?
            <span>
              VIP
            </span>
          </div>
          <Switcher :id="'contacts'" />
        </div>
        <div class="input">
          <InputComponent
            :placeholder="'Яким буде приз?'"
            :title-width="0"
            :v-model="eventData.date"
            :has-icon="true"
            :icon="[
              require('../../../assets/img/aim.svg')
            ]"
          />
        </div>
        <div class="title-outfit">
          Чи потрібно мати свою форму?
        </div>
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input 
              id="radio-outfit"
              name="outfit" 
              type="radio"
              value="Так"
              checked
             >
            <label for="radio-outfit" class="radio-label">
              Так
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-outfit2" 
              name="outfit" 
              type="radio"
              value="Ні, є маніжки"
            >
            <label for="radio-outfit2" class="radio-label">
              Ні, є маніжки
            </label>
          </div>
        </div>
        <div class="title-outfit">
          Вкажіть кольори форм
        </div>
        <div class="outfit-colors">
          <div class="input">
            <InputComponent
              :placeholder="'Input'"
              :title-width="0"
              :outside-title="true"
              :title="'Команда №1'"
            />
          </div>
          <div class="input">
            <InputComponent
              :placeholder="'Input'"
              :title-width="0"
              :outside-title="true"
              :title="'Команда №2'"
            />
          </div>
        </div>
      </div>
       
      <div class="progress-line">
        <div class="sections">
          <div
            v-for="item of 3"
            :key="item"
            :class="['section', { 
              active : item <= currentStep
            }]"
          ></div>
        </div>
      </div>
      <div class="buttons-block">
        <WhiteBtn
          :text="$t('buttons.back')"
          :width="140"
          :main-color="'#262541'"
          @click-function="changeStep('-')"
        />
        <GreenBtn
          :text="$t('buttons.next')"
          :width="160"
          :icon-right="require('../../../assets/img/arrow-right.svg')"
          @click-function="changeStep('+')"
        />
      </div>
    </div>
    <div class="tablet-block">
      <div class="save-template-block">
        <GreenBtn
          :text="$t('buttons.save')"
          :width="103"
          :background-color="'#575775'"
          :height="28"
          :icon="require('../../../assets/img/save-icon.svg')"
          :font-styles="{'font-size': '13px'}"
        />
        <WhiteBtn
          :text="$t('buttons.download-template')"
          :width="177"
          :height="28"
          :font-styles="{
            'font-size': '13px',
            'font-weight': 400
          }"
          :main-color="'#575775'"
          :icon="require('../../../assets/img/download-cloud.svg')"
        />
        <div class="close-btn">
          <img src="../../../assets/img/cross.svg" alt="">
        </div>
      </div>
      <div class="preview-tablet-block">
        <div class="left-block">
          <div class="img-icon">
            <img src="../../../assets/img/img-icon.svg" alt="">
          </div>
          <span>Попередній перегляд афіші</span>
        </div>
        <div class="arrow-down">
          <img src="../../../assets/img/arrow-down.svg" alt="">
        </div>
      </div>
    </div>
    <div 
      v-if="currentStep === 1"
      class="preview-mob-block"
    >
      <div class="left-block">
        <div class="img-icon">
          <img src="../../../assets/img/img-icon.svg" alt="">
        </div>
        <span>Попередній перегляд афіші</span>
      </div>
      <div class="arrow-down">
        <img src="../../../assets/img/arrow-down.svg" alt="">
      </div>
    </div>
    <div 
      v-if="currentStep === 2 || currentStep === 3"
      class="preview-mob-block-second"
    >
      <div class="btn btn-previous">
        <span>Попередній перегляд</span>
      </div>
      <div class="btn btn-users">
        <span>Запрошені учасники</span>
      </div>
    </div>
    <div class="wrapper-preview-block">
      <div class="preview-block">
        <div class="title">
          Попередній перегляд афіші
        </div>
        <div class="subtitle">
          Таким чином виглядатиме афіша вашої події для інших користувачів додатку BlanBall
        </div>
        <div class="form-block">
          <div class="top-line">
            <div class="left-block">
              <div class="col-1">
                <div class="card-icon">
                  <img src="../../../assets/img/hands-shake.png" alt="" />
                </div>
              </div>
              <div class="col-2">
                <div class="title">{{eventData.title}}</div>
                <div class="address">
                  <img src="../../../assets/img/location-point.svg" alt="">
                  <p>
                    {{ eventData.place }}
                  </p>
                </div>
              </div>
            </div>
            <div class="right-block">
              <div class="col-3">
                <div class="date">
                  {{ eventData.date }}
                </div>
                <div class="time">
                  {{ eventData.time }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-area"></div>
          <div class="labels">
            <div 
              v-for="label in eventData.labels"
              :key="label.id"
              class="label"
              :style="
                label.text.length ?  
                labelStyle :
                emptyLabelStyle
              "
            >
              {{ label.text }}
            </div>
          </div>
          <div class="bottom-part">
            <div class="left-block">
              В’ячеслав Залізняк
            </div>
            <div class="right-block">
              {{ eventData.payment }}
            </div>
          </div>
          <div class="bottom-line">
            <div class="left-side">
              <div class="titles">
                <div class="players">{{ $t('events.players') }}:</div>
                <div class="visitors">{{ $t('events.fans') }}:</div>
              </div>
              <div class="date">
                <div class="players-date">10 / 22</div>
                <div class="visitors-date">17 / 30</div>
              </div>
            </div>
            <div class="right-side">
              <GreenBtn 
                :text="eventData.isOpened" 
                :width="115"
                :height="32"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="currentStep === 2" 
        class="chosen-ppl"
      >
        <div class="title">
          Люди, яких ви запросили
        </div>
        <div 
          @click="deleteAll"
          class="delete-all"
        >
          Видалити всіх
        </div>
        <div class="users-list">
          <div 
            v-for="user of chosenUsers"
            :key="user.id"
            class="user"
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
              class="delete-user"
              @click="deleteFromChosen(user.id, user.category)"
            >
              <img src="../../../assets/img/cross.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="manage-template-block">
      <div class="title">
        Управління шаблонами
      </div>
      <div class="btns-block">
        <div class="white-btn-wrapper">
          <WhiteBtn
            :text="$t('buttons.download-template')"
            :width="208"
            :height="40"
            :main-color="'#262541'"
            :font-styles="{ 'font-weight': 400 }"
            :icon="require('../../../assets/img/download-cloud.svg')"
          />
        </div>
        <GreenBtn
          :text="$t('buttons.save-as-template')"
          :icon="require('../../../assets/img/save-icon.svg')"
          :width="208"
          :height="40"
          :background-color="'#575775'"
          :font-styles="{ 'font-weight': 400 }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../../../components/Dropdown.vue'
import InputComponent from '../../../components/InputComponent.vue'
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import Switcher from '../../../components/Switcher.vue'

export default {
  name: 'CreateEventPage',
  components: {
    Dropdown,
    InputComponent,
    GreenBtn,
    WhiteBtn,
    Switcher
  },
  data() {
    return {
      chosenUsers: [],
      tags: [
        {
          id: 0,
          text: 'Всі',
          isActive: true
        },
        {
          id: 1,
          text: 'Гравці',
          isActive: false
        },
        {
          id: 2,
          text: 'Події',
          isActive: false
        },
        {
          id: 3,
          text: 'Організатори',
          isActive: false
        },
        {
          id: 4,
          text: 'Тренери',
          isActive: false
        },
        {
          id: 5,
          text: 'Рефері',
          isActive: false
        },
        {
          id: 6,
          text: 'Команди',
          isActive: false
        }
      ],
      teams: [
        {
          id: 1,
          category_name: 'Гравці',
          users: [
            {
              id: 0,
              img: require('../../../assets/img/user1.png'),
              name: 'Oganez Gurgenovich',
              category: 'Гравці',
              isChosen: false
            },
            {
              id: 1,
              img: require('../../../assets/img/user2.png'),
              name: 'Rubik Joraevich',
              category: 'Гравці',
              isChosen: false
            },
            {
              id: 2,
              img: require('../../../assets/img/user3.png'),
              name: 'Ogli Timurlanovich',
              category: 'Гравці',
              isChosen: false
            }
          ]
        },
        {
          id: 2,
          category_name: 'Події',
          users: [
            {
              id: 11,
              img: require('../../../assets/img/user2.png'),
              name: 'Rubik Joraevich',
              category: 'Події',
              isChosen: false
            },
            {
              id: 21,
              img: require('../../../assets/img/user3.png'),
              name: 'Ogli Timurlanovich',
              category: 'Події',
              isChosen: false
            },
            {
              id: 101,
              img: require('../../../assets/img/user1.png'),
              name: 'Oganez Gurgenovich',
              category: 'Події',
              isChosen: false
            }
          ]
        },
        {
          id: 3,
          category_name: 'Організатори',
          users: [
            // {
            //   id: 202,
            //   img: require('../../../assets/img/user1.png'),
            //   name: 'Oganez Gurgenovich'
            // },
            {
              id: 12,
              img: require('../../../assets/img/user2.png'),
              name: 'Rubik Joraevich',
              category: 'Організатори',
              isChosen: false
            },
            {
              id: 22,
              img: require('../../../assets/img/user3.png'),
              name: 'Ogli Timurlanovich',
              category: 'Організатори',
              isChosen: false
            }
          ]
        },
        {
          id: 4,
          category_name: 'Тренери',
          users: [
            {
              id: 3023,
              img: require('../../../assets/img/user1.png'),
              name: 'Oganez Gurgenovich',
              category: 'Тренери',
              isChosen: false
            },
            // {
            //   id: 123,
            //   img: require('../../../assets/img/user2.png'),
            //   name: 'Rubik Joraevich'
            // },
            {
              id: 223,
              img: require('../../../assets/img/user3.png'),
              name: 'Ogli Timurlanovich',
              category: 'Тренери',
              isChosen: false
            }
          ]
        },
        {
          id: 5,
          category_name: 'Рефері',
          users: [
            {
              id: 4024,
              img: require('../../../assets/img/user1.png'),
              name: 'Oganez Gurgenovich',
              category: 'Рефері',
              isChosen: false
            },
            {
              id: 124,
              img: require('../../../assets/img/user2.png'),
              name: 'Rubik Joraevich',
              category: 'Рефері',
              isChosen: false
            },
            // {
            //   id: 224,
            //   img: require('../../../assets/img/user3.png'),
            //   name: 'Ogli Timurlanovich'
            // }
          ]
        },
        {
          id: 6,
          category_name: 'Команди',
          users: [
            {
              id: 125,
              img: require('../../../assets/img/user2.png'),
              name: 'Rubik Joraevich',
              category: 'Команди',
              isChosen: false
            },
            {
              id: 225,
              img: require('../../../assets/img/user3.png'),
              name: 'Ogli Timurlanovich',
              category: 'Команди',
              isChosen: false
            },
            {
              id: 5025,
              img: require('../../../assets/img/user1.png'),
              name: 'Oganez Gurgenovich',
              category: 'Команди',
              isChosen: false
            }
          ]
        },
      ],
      currentStep: 1,
      eventData: {
        title: '',
        labels: [
          {
            id: 0,
            text: ''
          },
          {
            id: 1,
            text: ''
          }
        ],
        date: '',
        time: '',
        place: '',
        payment: '',
        isOpened: ''
      },
      dataDropdown: [
        {
          id: 0,
          value: 'Дружній матч'
        },
        {
          id: 1,
          value: 'Не дружній матч'
        },
        {
          id: 2,
          value: 'Ворожий матч'
        }
      ],
      dataDropdown2: [
        {
          id: 0,
          value: 'Футбол'
        },
        {
          id: 1,
          value: 'Литрбол'
        },
        {
          id: 2,
          value: 'Метание кизяков'
        },
        {
          id: 3,
          value: 'Плевки в длину'
        }
      ]
    }
  },
  computed: {
    filteredTeams() {
      if (this.currentCategory === 'Всі') {
        return this.teams
      } else {
        return [this.teams.find(item => item.category_name === this.currentCategory)]
      }
    },
    currentCategory() {
      return this.tags.find(item => item.isActive).text
    },
    labelStyle() {
      return {
        padding: '0px 8px',
        border: '1px solid #EFEFF6',
        'border-radius': '100px'
      }
    },
    emptyLabelStyle() {
      return {
        width: '70px',
        height: '18px',
        background: '#EFEFF6',
        'border-radius': '100px'
      }
    }
  },
  methods: {
    deleteAll() {
      this.chosenUsers = []
    },
    deleteFromChosen(id, category) {
      this.chosenUsers = this.chosenUsers.filter(i => i.id !== id)
      this.teams.find(item => item.category_name === category).users
                              .find(item => item.id === id).isChosen = false
    },
    setFormValue(key, value) {
      if (key === 'gameType') {
        this.eventData.labels[0].text = value
        return
      }
      this.eventData[key] = value
    },
    changeStep(val) {
      switch(val) {
        case '+': this.currentStep++
        break;
        case '-': this.currentStep--
        break;
      }
    },
    chooseCategory(id) {
      this.tags = this.tags.map(item => ({...item, isActive: false}))
      this.tags = this.tags.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isActive: true
          }
        } else {
          return item
        }
      })
    },
    inviteUser(teamId, userId) {
      // let hasUser = this.chosenUsers.find(i => i.id === userId)
      // if (hasUser) {
      //   hasUser = null
      //   return
      // }
      this.teams.find(item => item.id === teamId).users
                .find(item => item.id === userId).isChosen = true
                
      const team = this.teams.find(i => i.id === teamId)
      const user = team.users.find(i => i.id === userId)
      this.chosenUsers.push(user)
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-events-page {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .create-event-block {
      width: 360px;
      padding: 20px;
      background: #FFFFFF;
      box-shadow: 2px 6px 10px rgba(56, 56, 251, 0.1);
      border-radius: 0px 6px 6px 0px;
      margin-right: 44px;
      @media (min-width: 576px) and (max-width: 992px) {
        margin-right: 16px;
      }
      @media (max-width: 768px) {
        order: 2;
        width: 100%;
        margin-right: 0;
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
      .input {
        width: 100%;
        height: 40px;
        margin-top: 16px;
      }
      .first-step {
        .time-and-date {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .input {
            width: 154px;
          }
        }
        .title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #262541;
          margin-bottom: 8px;
        }
        .event-map {
          margin-top: 16px;
        }
      }
      .second-step {
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
      .third-step {
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
        .text-area-wrapper {
          position: relative;
          textarea {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            color: #575775;
            padding: 8px 35px 8px 12px;
            height: 88px;
            width: 100%;
            resize: none;
            border: 1px solid #DFDEED;
            border-radius: 6px;
            outline: none;
          }
          .icon {
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 40px;
            display: flex;
            border-radius: 6px;
            img {
              margin: auto;
            }
          }
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
        .title-outfit {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        .contact-switcher {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 8px;
          .title-prize {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #262541;
            span {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              padding: 0px 4px;
              background: #EFEFF6;
              border-radius: 4px;
            }
          }
        }
        .outfit-colors {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .input {
            width: 154px;
            margin-top: 0;
          }
        }
      }

      .progress-line {
        margin-top: 20px;
        padding-top: 24px;
        border-top: 1px dashed #DFDEED;
        .sections {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 312px;
          .section {
            width: 102.67px;
            height: 4px;
            background: #EFEFF6;
            border-radius: 2px;
            &.active {
              background: #1AB2AD;
            }
          }
        }
      }
      .buttons-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }
    }
    .tablet-block {
      display: none;
      width: 320px;
      @media (max-width: 992px) {
        display: block;
      }      
      @media (max-width: 768px) {
        order: 1;
        margin-bottom: 16px;
        width: 100%;
      }
      .save-template-block {
        padding: 10px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(239, 239, 246, 0.7);
        border-radius: 8px;
      }
      .preview-tablet-block {
        padding: 8px 12px;
        background: rgba(239, 239, 246, 0.7);
        border: 1px solid #DFDEED;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        @media (max-width: 768px) {
          display: none;
        }
        .left-block {
          display: flex;
          align-items: center;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          text-align: center;
          color: #262541;
          .img-icon {
            margin-right: 10px;
            display: flex;
            img {
              margin: auto;
            }
          }
        }
      }
    }
    .preview-mob-block {
      display: none;
      padding: 8px 12px;
      background: rgba(239, 239, 246, 0.7);
      border: 1px solid #DFDEED;
      border-radius: 8px;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      @media (max-width: 768px) {
        display: flex;
        order: 3;
        width: 100%;
      }
      .left-block {
        display: flex;
        align-items: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
        color: #262541;
        .img-icon {
          margin-right: 10px;
          display: flex;
          img {
            margin: auto;
          }
        }
      }
    }



    .preview-mob-block-second {
      display: none;
      margin-top: 36px;
      margin-bottom: 8px;
      position: relative;
      height: 52px;
      @media (max-width: 768px) {
        display: flex;
        order: 3;
        width: 100%;
      }
      .btn {
        height: 52px;
        background: rgba(239, 239, 246, 0.7);
        border-radius: 8px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #262541;
        position: absolute;
        display: table;
        overflow: hidden;
        width: 53%;
        cursor: pointer;
        &-previous {
          left: 0;
          background: transparent;
          z-index: 1;
          border-left: 1px solid #DFDEED;
          &:after {
            content: " ";
            position: absolute;
            display: block;
            width: 100%;
            height: 96%;
            top: 0;
            left: 0;
            z-index: -1;
            background: #EFEFF6;
            transform-origin: bottom left;
            -ms-transform: skew(10deg, 0deg);
            -webkit-transform: skew(10deg, 0deg);
            transform: skew(10deg, 0deg);
            border: 1px solid #DFDEED;
            border-radius: 8px;
          }
        }
        &-users {
          border: 1px solid #DFDEED;
          right: 0;
        }
        span {
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
    .wrapper-preview-block {
      margin-right: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 992px) and (max-width: 1199px) {
        margin-right: 10px;
      }
      @media (max-width: 991px) {
        display: none;
      }
      .preview-block {
        padding: 24px 44px;
        width: 504px;
        background: #F9F9FC;
        border-radius: 12px;
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
        }
        .subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
          margin: 6px 0 20px;
        }
        .form-block {
          padding: 20px 16px;
          background: #FFFFFF;
          box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
          border-radius: 6px;
          .top-line {
            display: flex;
            justify-content: space-between;
            .left-block {
              display: flex;
              .col-1 {
                margin-right: 8px;
                min-width: 50px;
                .card-icon {
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  min-width: 48px;
                  width: 48px;
                  height: 48px;
                  background: #EFEFF6;
                  border-radius: 4px;
                }
              }
              .col-2 {
                width: 200px;
                @media (min-width: 1200px) and (max-width: 1400px) {
                  width: 230px;
                }
                @media (min-width: 992px) and (max-width: 1199px) {
                  width: 150px;
                }
                @media (min-width: 768px) and (max-width: 991px) {
                  width: 165px;
                }
                @media (max-width: 768px) {
                  width: 70%;
                }
                .title {
                  font-family: 'Exo 2';
                  font-style: normal;
                  font-weight: 700;
                  font-size: 16px;
                  line-height: 24px;
                  color: #262541;
                }
                .address {
                  display: flex;
                  background: #FAFAFA;
                  padding: 0px 4px;
                  margin-top: 4px;
                  img {
                    margin-right: 5px;
                  }
                  p {
                    font-family: "Inter";
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    color: #575775;
                    border-radius: 4px;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  }
                }
              }
            }
            .right-block {
              .col-3 {
                min-width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .state {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 13px;
                  line-height: 20px;
                  text-align: center;
                  padding: 0px 4px;
                  border-radius: 4px;
                  background: #EFEFF6;
                  color:  #262541;
                  width: fit-content;
                  &.active {
                    background: #71BA12;
                    color:  #fff;
                  }
                }
                .date {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  text-align: right;
                  color: #262541;
                  margin-bottom: 4px;
                }
                .time {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                  text-align: right;
                  color: #4C4A82;
                }
              }
            }
          }
          .text-area {
            margin-top: 12px;
            height: 80px;
            background: #EFEFF6;
            border-radius: 6px;
          }
          .labels {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 8px;
            .label {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              margin-right: 4px;
              margin-bottom: 4px;
            }
          }
          .bottom-part {
            border-top: 1px dashed #DFDEED;
            padding-top: 12px;
            display: flex;
            justify-content: space-between;
          }
          .bottom-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
            .left-side {
              display: flex;
              align-items: center;
              .titles {
                margin-right: 30px;
              }
              .titles, .date {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
              }
              .players, .players-date {
                color: #262541;
              }
              .visitors, .visitors-date {
                color: #575775;
              }
            }
          }
        }
      }
      .chosen-ppl {
        width: 416px;
        margin-top: 16px;
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
        }
        .delete-all {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          margin-bottom: 8px;
          text-align: right;
          cursor: pointer;
        }
        .users-list {
          .user {
            padding: 4px;
            border-radius: 0px 6px 6px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #F0F0F4;
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
            .delete-user {
              cursor: pointer;
              img {
                margin-right: 12px;
              }
            }
          }
        }
      }
    }

    .manage-template-block {
      @media (min-width: 992px) and (max-width: 1400px) {
        margin-top: 20px;
      }
      @media (max-width: 991px) {
        display: none;
      }
      .title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
      }
      .btns-block {
        margin-top: 20px;
        .white-btn-wrapper {
          margin-bottom: 12px;
        }
      }
    }
  }
</style>