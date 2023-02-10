<template>
  <div class="b-users-table" :style="tableStyle">
    <div class="b-users-table__table-label" :style="labelStyle">
      {{ tableTitle }}
    </div>
    <SmallPlayerCard
      v-for="player of data"
      :key="player.id"
      :data-player="player"
    />
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

import SmallPlayerCard from './SmallPlayerCard.vue'

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
  },
  components: {
    SmallPlayerCard,
  },
  setup(props) {
    const tableTitle = ref(props.tableTitleText)
    const tableStyle = reactive({
      border: `1px solid ${props.tableColor}`,
    })
    const labelStyle = reactive({
      background: props.tableColor,
    })

    return {
      tableTitle,
      tableStyle,
      labelStyle,
    }
  },
}
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
  @media (max-width: 768px) {
    width: 100%;
  }
  .b-users-table__table-label {
    position: absolute;
    left: 20px;
    top: -12px;
    padding: 2px 12px;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
