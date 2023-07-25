<template>
  <div class="b-mob-menu__bottom-side">
    <div class="b-mob-menu__found-error" @click="$emit('foundBug')">
      <img src="@images/white-warning-icon.svg" alt="" />
      <span>{{ $t('slide_menu.found-error') }}</span>
    </div>

    <div class="b-bottom-block__info">
      <router-link
        class="b-blanball__version"
        :to="versionsPageRoute"
        @click="closeMobMenu"
      >
        <span>{{ $t('slide_menu.version') }} {{ clientVersion }}</span>
      </router-link>
      <div class="b-bottom-block__footer">
        <span>{{ $t('slide_menu.blanball-year', { year: currentYear }) }}</span>
        <span @click="showPrivacyContextModal">{{
          $t('policy.data-security')
        }}</span>
        <div class="b-bottom-block__company">
          <img src="@images/logo-flumx.svg" alt="" />
          <span>{{ $t('slide_menu.flumx') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue';

import { ROUTES } from '@/routes/router.const';

export default {
  setup() {
    const clientVersion = ref(inject('clientVersion'));

    const versionsPageRoute = computed(() => {
      return ROUTES.APPLICATION.VERSIONS.absolute;
    });

    const currentYear = computed(() => {
      return new Date().getFullYear();
    });

    return {
      versionsPageRoute,
      clientVersion,
      currentYear,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-dfdeed: #dfdeed;
.b-mob-menu__found-error {
  background: $--b-main-gray-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  padding: 4px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  max-width: 193px;
  position: absolute;
  min-width: max-content;
  bottom: 100px;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);

  span {
    @include inter(14px, 500, $--b-main-white-color);
    line-height: 24px;
  }
}
.b-bottom-block__info {
  position: absolute;
  bottom: 0;
  padding: 12px 16px 0px 0px;
  border-top: 1px solid $color-dfdeed;
  width: calc(100% - 32px);
  padding-right: 16px;

  .b-blanball__version {
    @include inter(12px, 500, $--b-main-gray-color);
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }

  .b-bottom-block__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include inter(12px, 500, $--b-main-gray-color);
    line-height: 20px;
    margin-top: 4px;

    .b-bottom-block__company {
      display: flex;
      align-items: center;
    }
  }
}
</style>
