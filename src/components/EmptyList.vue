<template>
  <div class="b-empty-list d-flex align-items-center justify-content-between">
    <div class="b-empty-list__left-side">
      <div class="b-empty-list__title">
        {{title}}
      </div>
      <div class="b-empty-list__description">
        {{description}}
      </div>
      <div class="b-empty-list__actions"></div>
    </div>
    <div  class="b-empty-list__right-side">
      <img :src="imageLink"/>
    </div>
  </div>
</template>

<script>
  import EmptyNotificationsSvg from '../assets/img/no-records/empty-notifications.svg'
  export default {
    name: "EmptyList",
    props: {
      title: {
        type: String,
        require: true
      },
      description: {
        type: String,
        require: true
      },
      imageLink: {
        type: String,
        require: false,
        default: EmptyNotificationsSvg
      },
    }
  }
</script>

<style scoped lang="scss">
  .b-empty-list {
    padding: 20px;
    background: #F9F9FC;
    border-radius: 12px;

    &__title {
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 28px;
      color: #262541;
      margin-bottom: 12px;
    }
    &__description{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #575775;
    }
  }
</style>