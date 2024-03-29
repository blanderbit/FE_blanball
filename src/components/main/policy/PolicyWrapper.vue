<template>
  <div class="b-policy-wrapper">
    <div class="container">
      <div class="b-go-back" @click="goBack">
        <img src="../../../assets/img/arrow-left-gray.svg" alt="" />
        {{ $t('buttons.return') }}
      </div>
      <div class="b-policy-title">
        <slot name="title"></slot>
      </div>
      <div class="b-policy-content">
        <div class="b-policy-main-text">
          <slot name="content"></slot>
        </div>
        <div class="b-policy-table-contents">
          <div class="b-table-title">{{ $t('policy.document-content') }}</div>
          <div class="b-table-items">
            <div v-for="item in contentItems" class="b-table-item"
              @click="scrollToBlockOfContent(item.elementId)">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

import { ROUTES } from '../../../router/router.const';

export default {
  props: {
    contentItems: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();

    const scrollToBlockOfContent = (elementHtmlId) => {
      const element = document.getElementById(elementHtmlId);
      element.scrollIntoView({ behavior: 'smooth' });
    }

    const goBack = async () => {
      return await router.push(        
        router.currentRoute.value.redirectedFrom 
        ? router.currentRoute.value.redirectedFrom
        : ROUTES.APPLICATION.EVENTS.absolute
      );
    };
    return {
      goBack,
      scrollToBlockOfContent,
    };
  },
};
</script>
<style lang="scss" scoped>
.b-policy-wrapper {
  padding-top: 36px;
  overflow: hidden;
  .b-go-back {
    @include inter(14px, 500);
    display: flex;
    align-items: center;
    gap: 12px;
    line-height: 20px;
    cursor: pointer;
    max-width: max-content;
    cursor: pointer;
  }
  .b-policy-title {
    @include exo(22px, 700);
    line-height: 32px;
    margin-top: 28px;
    padding-bottom: 5px;
  }
  .b-policy-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-content: space-between;
    @include beforeDesktop {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      @include calc-height(60px, 20px, 36px);
    }

    .b-policy-main-text {
      @include desktop {
        @include calc-height(60px, 20px, 36px);
        overflow-y: scroll;
      }
    }
    .b-policy-table-contents {
      @include desktop {
        margin-left: 60px;
      }
      .b-table-title {
        @include exo(16px, 700);
        line-height: 24px;
      }

      .b-table-items {
        @include desktop {
          overflow-y: scroll;
          @include calc-height(200px);
        }
      }
      .b-table-item {
        @include inter(14px, 500);
        background: $--b-main-white-color;
        border: 1px solid #F0F0F4;
        border-radius: 6px;
        margin-top: 16px;
        padding: 16px;
        line-height: 20px;
        cursor: pointer;
        max-width: 400px;
      }
    }
  }
}
</style>
