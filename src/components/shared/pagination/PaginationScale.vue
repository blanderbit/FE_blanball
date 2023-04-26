<template>
  <div v-if="pagesTotalCount > 1" class="b-pagination-scale">
    <img
      v-if="currentPage !== 1"
      class="b-pagination__button"
      src="../../../assets/img/pagination-arrow-left.svg"
      alt=""
      @click="goToPage(currentPage - 1)"
    />
    <img
      v-else
      class="b-pagination__button-disabled"
      src="../../../assets/img/pagination-arrow-left.svg"
      alt=""
    />
    <div class="b-pagination__body">
      <div
        :class="[
          'b-pagination-page__number',
          { 'b-current-page': pageNumber === currentPage },
        ]"
        v-for="pageNumber in visiblePageNumbers"
        :key="pageNumber"
        @click="pageNumber !== currentPage ? goToPage(pageNumber) : null"
      >
        {{ pageNumber }}
      </div>
      <span v-if="currentPage + 1 < pagesTotalCount">...</span>
      <div
        class="b-pagination-page__number"
        v-if="currentPage + 1 < pagesTotalCount"
        @click="goToPage(pagesTotalCount)"
      >
        {{ pagesTotalCount }}
      </div>
    </div>
    <img
      v-if="currentPage !== pagesTotalCount"
      class="b-pagination__button"
      src="../../../assets/img/pagination-arrow-right.svg"
      alt=""
      @click="goToPage(currentPage + 1)"
    />
    <img
      v-else
      class="b-pagination__button-disabled"
      src="../../../assets/img/pagination-arrow-right.svg"
      alt=""
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pagesTotalCount: {
      type: Number,
      required: true,
    },
  },
  emits: ['changePage'],
  setup(props, { emit }) {
    const visiblePageNumbers = computed(() => {
      const visiblePages = [];
      for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
        if (i > 0 && i <= props.pagesTotalCount) {
          visiblePages.push(i);
        }
      }
      return visiblePages;
    });

    function goToPage(pageNumber) {
      emit('changePage', pageNumber);
    }

    return {
      visiblePageNumbers,
      goToPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-pagination-scale {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 28px;

  .b-pagination__button {
    cursor: pointer;
  }

  .b-pagination__body {
    display: flex;
    align-items: center;
    gap: 28px;
    @include inter(14px, 500, $--b-main-gray-color);

    line-height: 17px;
    text-align: center;

    .b-pagination-page__number {
      cursor: pointer;
    }

    .b-current-page {
      @include inter(14px, 500);
      line-height: 17px;
      padding: 8px 12px;
      text-align: center;
      background: #efeff6;
      border-radius: 8px;
    }
  }
}
</style>
