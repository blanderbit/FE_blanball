<template>
  <div class="b-right-sidebar">
    <div class="b-right-sidebar__title-block">
      <div class="b-right-sidebar__title">{{ $t('events.planned-events') }}</div>
      <div class="b-right-sidebar__subtitle">{{ $t('events.your-events') }}</div>
    </div>
    <div class="b-right-sidebar__cards-block">
      <SmallEventCard 
        v-for="item in 5"
        :key="item"
      />
    </div>
  </div>
</template>

<script setup>
import SmallEventCard from './SmallEventCard.vue'
</script>

<style lang="scss" scoped>
.b-right-sidebar {
  @media (max-width: 992px) {
    display: none;
  }
  .b-right-sidebar__title-block {
    .b-right-sidebar__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: #262541;
    }
    .b-right-sidebar__subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
    }
  }
  .b-right-sidebar__cards-block {
    margin-top: 20px;
  }
}
</style>