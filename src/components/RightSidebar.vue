<template>
  <div class="b_right_sidebar">
    <div class="b_right_sidebar_title-block">
      <div class="b_right_sidebar_title">{{ $t('events.planned-events') }}</div>
      <div class="b_right_sidebar_subtitle">{{ $t('events.your-events') }}</div>
    </div>

    <div class="b_right_sidebar_cards-block">
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
.b_right_sidebar {
  @media (max-width: 1200px) {
    display: none;
  }
  .b_right_sidebar_title-block {
    .b_right_sidebar_title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: #262541;
    }
    .b_right_sidebar_subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
    }
  }
  .b_right_sidebar_cards-block {
    margin-top: 20px;
  }
}
</style>