<template>
  <div class="user-cabinet">
    <div class="title-block">
      <div class="titles">
        <div  class="title">{{ $t('profile.title') }}</div>
        <div class="subtitle">{{ $t('profile.change-personal-data') }}</div>
      </div>
      <div class="buttons">
        <div class="btn-wrapper">
          <WhiteBtn 
            :text="$t('buttons.cancel')" 
            :width="98"
          />
        </div>
        <GreenBtn 
          :text="$t('buttons.save')" 
          :width="89"
        />
      </div>
    </div>
    <div class="tab-block">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-element', {active : tab.isActive}]"
        @click="changeTab(tab.id, tab.url)"
      >
        <img :src="tab.img" :alt="tab.name">
        {{ $t('profile.' + tab.name) }}
      </div>
    </div>
    <div class="rate-plan-tab">
      {{ $t('profile.rate-plan') }}
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'

import userIcon from '../../../assets/img/user-icon.svg'
import database from '../../../assets/img/database.svg'
import notification from '../../../assets/img/notification-small.svg'

export default {
  name: 'user-cabinet',
  components: {
    GreenBtn,
    WhiteBtn
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          name: 'my-profile',
          img: userIcon,
          url: '/application/profile/my-profile',
          isActive: false
        },
        {
          id: 1,
          name: 'rate-plan',
          img: database,
          url: '/application/profile/rate-plan',
          isActive: true
        },
        {
          id: 2,
          name: 'notifications',
          img: notification,
          url: '/application/profile/notifications',
          isActive: false
        }
      ]
    }
  },
  methods: {
    changeTab(id, url) {
      this.tabs = this.tabs.map(item => ({ ...item, isActive: false }))
                            .map(item => {
                              return item.id === id ?
                                { ...item, isActive: true } :
                                item
                            })
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.title-block {
  display: flex;
  justify-content: space-between;
  .title {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    color: #262541;
  }
  .subtitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #575775;
    margin-top: 4px;
  }
  .buttons {
    display: flex;
    @media (max-width: 768px) {
      display: none;
    }
    .btn-wrapper {
      margin-right: 12px;
    }
  }
}
.tab-block {
  display: flex;
  border-bottom: 1px solid #DFDEED;
  margin-top: 28px;
  cursor: pointer;
  .tab-element {
    display: flex;
    align-items: center;
    margin-right: 24px;
    padding-bottom: 12px;
    text-decoration: none;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    color: #262541;
    user-select: none;
    img {
      margin-right: 8px;
    }
    &.active {
      border-bottom: 2px solid #262541;
    }
  }
}
.rate-plan-tab {}
</style>