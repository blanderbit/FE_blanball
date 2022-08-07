<template>
  <div class="events-page">
    <div class="main-body">
      <div class="header-block">
        <div class="left-part">
          <div class="title">Майбутні події</div>
          <div class="event-switcher">
            <div class="general-events">Загальна</div>
            <div class="my-events">Мої події</div>
          </div>
        </div>
        <div class="right-part">
          <GreenBtn 
            :text="'Створити подію'" 
            :width="168"
            :icon="require('../../assets/img/plus.svg')"
            :height="40"
          />
        </div>
      </div>
      <div class="main-search-block">
        <div class="grey-rectangle"></div>
        <div class="search-block">
          <div class="first-line">
            <Dropdown 
              :options="dataDropdown"
              :main-title="'Тип гри'"
              :outsideTitle="true"
              :width="152"
            />
          </div>
          <div class="second-line"></div>
        </div>
        <div class="cards-block">
          <div class="event-card"></div>
        </div>
      </div>
    </div>

    <div class="right-sidebar">
       <div class="title-block">
          <div class="title">Заплановані події</div>
          <div class="subtitle">Заходи у яких ви запланували участь</div>
       </div>
       <div class="cards-block">
        <div class="card"></div>
       </div>
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../components/GreenBtn.vue'
import Dropdown from '../../components/Dropdown.vue'

export default {
  name: 'events-page',
  components: {
    GreenBtn,
    Dropdown
  },
  data() {
    return {
      dataDropdown: [
        {
          id: 0,
          value: 'Футбол'
        },
        {
          id: 1,
          value: 'Хокей'
        },
        {
          id: 2,
          value: 'Баскетбол'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .events-page {
    display: grid;
    grid-template-columns: 1fr 256px;
    grid-gap: 16px;
    .main-body {
      .header-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-part {
          .title {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 32px;
            color: #262541;
            margin-bottom: 4px;     
          }
          .event-switcher {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            text-align: center;
            color: #262541;
            display: flex;
            .general-events {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              gap: 10px;
              width: 100px;
              height: 28px;
              border: 1px solid #148581;
              border-radius: 6px 0px 0px 6px;
              cursor: pointer;
            }
            .my-events {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              gap: 10px;
              width: 100px;
              height: 28px;
              border: 1px solid #DFDEED;
              border-radius: 0px 6px 6px 0px;
              cursor: pointer;
            }
          }
        }
        .right-part {

        }
      }
      .main-search-block {
        margin-top: 36px;
        padding: 20px 16px;
        position: relative;
        .grey-rectangle {
          width: 100%;
          height: 208px;
          background: #F9F9FC;
          border-radius: 8px;
          position: absolute;
          top: 0;
          left: 0;
        }
        .search-block {

        }
        .cards-block {

        }
      }
    }
    .right-sidebar {
      .title-block {
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: #262541;
        }
        .subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
        }
        .cards-block {
          .card {

          }
        }
      }
    }
  }
</style>