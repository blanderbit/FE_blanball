<template>
  <div class="c-no-user-card">
    <span>{{ $t('errors.no-results') }}</span>
  </div>
</template>

<style lang="scss" scoped>
.c-no-user-card {
  margin-top: 16px;
  width: 240px;
  span {
    @include inter(13px, 500, $--b-main-gray-color);
    line-height: 20px;
    word-break: break-word;
  }
}
</style>
