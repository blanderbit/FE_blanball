<template>
  <div class="sidebar">
    <div class="sidebar-arrow">
      <img src="../assets/img/sidebar-arrow.svg" alt="">
    </div>
    <div class="top-block">
      <div class="picture-top">
        <img src="../assets/img/Rectangle_149.png" alt="">
      </div>
      <div class="menu-block">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.id"
            :class="['menu-item', { active: item.isActive }]"
          >
            <img :src="item.url" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-block">
      <div class="picture-bottom">
        <img src="../assets/img/Rectangle_148.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-sidebar',
  data() {
    return {
      menuItems: [
        {
          id: 0,
          url: require('../assets/img/Notification.svg'),
          isActive: true
        },
        {
          id: 1,
          url: require('../assets/img/Settings.svg'),
          isActive: false
        },
        {
          id: 2,
          url: require('../assets/img/record.svg'),
          isActive: false
        },
        {
          id: 3,
          url: require('../assets/img/window.svg'),
          isActive: false
        },
        {
          id: 4,
          url: require('../assets/img/members.svg'),
          isActive: false
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  /* background: red; */
  position: relative;
  height: 100%;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  padding-top: 24px;
  padding-bottom: 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 992px) {
    display: none;
  }
  .sidebar-arrow {
    position: absolute;
    width: 32px;
    height: 32px;
    right: -20px;
    top: 72px;
    background: #FFFFFF;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    display: flex;
    cursor: pointer;
    img {
      margin: auto;
    }
  }
  .top-block {
    .picture-top {
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid rgb(206, 206, 206);
      display: flex;
      img {
        margin: auto;
      }
    }
    .menu-block {
      .menu-item {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        display: flex;
        &.active {
          background: #D3F8F7;
        }
        img {
          margin: auto;
        }
      }
    }
  }

}


</style>