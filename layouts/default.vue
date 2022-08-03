<template>
  <div class="main-wrapper">
    <Sidebar />
    <div class="main-block">
      <div class="container">
        <MainHeader />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import MainHeader from '../components/MainHeader.vue'

export default {
  name: 'main-layout',
  components: {
    Sidebar,
    MainHeader
  }
}
</script>

<style lang="scss">
@import 'bootstrap/dist/css/bootstrap-grid.min.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main-wrapper {
  display: grid;
  grid-template-columns: 64px 1fr;
  height: 100vh;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}
</style>