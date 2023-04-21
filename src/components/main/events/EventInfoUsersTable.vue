<template>
  <div
    v-if="data.length"
    class="b-users-table"
    :style="border ? tableStyle : null"
  >
    <div v-if="border" class="b-users-table__table-label" :style="labelStyle">
      {{ tableTitle }}
      <span v-if="maxPlayersCount"
        >{{ data.length }} / {{ maxPlayersCount }}</span
      >
    </div>
    <slot name="user"></slot>
  </div>
  <emptyList
    v-else
    :title="emptyListData.title"
    :description="emptyListData.description"
    :buttonText="emptyListData.button_text"
    :image="emptyListData.image"
    @buttonClick="emptyListData?.action"
  />
</template>

<script>
import { ref, reactive } from 'vue';
import emptyList from '../../shared/emptyList/EmptyList.vue';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    tableTitleText: {
      type: String,
      default: '',
    },
    tableColor: {
      type: String,
      default: '#000',
    },
    border: {
      type: Boolean,
      default: true,
    },
    maxPlayersCount: {
      type: Number,
    },
    emptyListData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    emptyList,
  },
  setup(props) {
    const tableTitle = ref(props.tableTitleText);
    const tableStyle = reactive({
      border: `1px solid ${props.tableColor}`,
    });
    const labelStyle = reactive({
      background: props.tableColor,
    });

    return {
      tableTitle,
      tableStyle,
      labelStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-users-table {
  padding: 24px 20px 12px 20px;
  margin-bottom: 32px;
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  @include tabletAndMobile {
    width: 100%;
  }
  .b-users-table__table-label {
    @include inter(14px, 500, $--b-main-white-color);
    position: absolute;
    left: 20px;
    top: -12px;
    padding: 2px 12px;
    border-radius: 4px;
    line-height: 20px;
    text-align: center;
  }
}
</style>
