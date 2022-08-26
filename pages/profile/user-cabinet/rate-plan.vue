<template>
  <div class="user-cabinet">
    <div class="title-block">
      <div class="titles">
        <div  class="title">{{ $t('profile.title') }}</div>
        <div class="subtitle">{{ $t('profile.change-personal-data') }}</div>
      </div>
      <div class="buttons">
        <WhiteBtn 
          :text="$t('buttons.cancel')" 
          :width="98"
        />
        <GreenBtn 
          :text="$t('buttons.save')" 
          :width="89"
        />
      </div>
    </div>
    <div class="tab-block">
      <nuxt-link
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-element', {active : tab.isActive}]"
        @click="changeTab(tab.id)"
        :to="tab.url"
      >
        <img :src="tab.img" :alt="tab.name">
        {{ $t('profile.' + tab.name) }}
      </nuxt-link>
    </div>
    <div class="rate-plan-tab">
      Rate-plan
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'

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
          img: require('../../../assets/img/user.svg'),
          url: '/profile/user-cabinet/my-profile',
          isActive: false
        },
        {
          id: 1,
          name: 'rate-plan',
          img: require('../../../assets/img/database.svg'),
          url: '/profile/user-cabinet/rate-plan',
          isActive: true
        },
        {
          id: 2,
          name: 'notifications',
          img: require('../../../assets/img/notification-small.svg'),
          url: '/profile/user-cabinet/notifications',
          isActive: false
        }
      ]
    }
  },
  methods: {
    changeTab(id) {
      this.tabs = this.tabs.map(item => ({ ...item, isActive: false }))
                            .map(item => {
                              return item.id === id ?
                                    { ...item, isActive: true } :
                                    item
                            })
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