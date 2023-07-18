<template>
  <div class="c-not-selected-friend-card">
    <img src="@images/no-records/no-scheduled-events.svg" alt="" />
    <div class="c-title">{{ $t('scheduler.planned') }}</div>
    <div class="c-subtitle">
      {{ $t('scheduler.select-friend-from-the-list') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-not-selected-friend-card {
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  width: 292px;
  height: 184px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 48px;

  .c-title {
    @include exo(18px, 700);
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .c-subtitle {
    @include inter(14px, 400, $--b-main-gray-color);
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
