<template>
  <div class="b-error-page">
    <div class="b-error-page__main-block">
      <img
        class="b-error-page__img-desk"
        src="@images/404.svg"
        alt="404 desktop image"
      />
      <img
        class="b-error-page__img-mob"
        src="@images/404-mob.svg"
        alt="404 mobile image"
      />
      <div class="b-error-page__text-block">
        <div class="b-error-page__text">
          {{ $t('page_404.main-text') }}
        </div>
        <GreenBtn
          :text="$t('page_404.return')"
          :width="202"
          :height="40"
          @click-function="goToMainPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import { ROUTES } from '@routes/router.const';

export default {
  name: '404',
  components: {
    GreenBtn,
  },
  setup() {
    const router = useRouter();

    function goToMainPage() {
      router.push(ROUTES.APPLICATION.EVENTS.absolute);
    }

    return {
      goToMainPage,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f5fffe: #f5fffe;

.b-error-page {
  background: $color-f5fffe;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  .b-error-page__main-block {
    position: relative;
    margin: auto;
    @include tabletAndMobile {
      margin: 0;
      width: 100%;
    }
    img {
      width: 100%;
    }
    .b-error-page__img-desk {
      @include tabletAndMobile {
        display: none;
      }
    }
    .b-error-page__img-mob {
      display: none;
      margin: 20px auto;
      @include tabletAndMobile {
        display: block;
      }
    }
    .b-error-page__text-block {
      position: absolute;
      bottom: 145px;
      left: 95px;
      @include tabletAndMobile {
        position: static;
      }
      .b-error-page__text {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: $--b-main-black-color;
        margin-bottom: 16px;
        @include tabletAndMobile {
          text-align: center;
          font-weight: 700;
          font-size: 24px;
          line-height: 28px;
          width: 216px;
          margin: 20px auto;
        }
      }
      .b-green-btn {
        @include tabletAndMobile {
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
