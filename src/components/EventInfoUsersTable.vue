<template>
  <div 
    class="users-table"
    :style="tableStyle"
  >
    <div 
      class="table-label"
      :style="labelStyle"
    >
      {{tableTitle}}
    </div>
    <div 
      v-for="player of data"
      :key="player.id"
      :class="['table_card', { inactive: !player.isActive }]"
    >
      <div class="left-side">
        <div class="picture">
          <img :src="player.img" alt="">
        </div>
        <div class="name-duty">
          <div class="name">
            {{player.name}}
          </div>
          <div class="duty">
            {{player.duty}}
          </div>
        </div>
      </div>
      <div class="right-side">
        <div
          v-if="player.isActive"
          class="status"
        >
          {{ player.status }}
        </div>
        <img 
          v-else 
          :src="player.status" 
          class="inactive"
          alt=""
        >
        <div class="icon">
          <img :src="player.icon" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    tableTitleText: {
      type: String,
      default: ''
    },
    tableColor: {
      type: String,
      default: '#000'
    }
  },
  setup(props) {
    const tableTitle = ref(props.tableTitleText)
    const tableStyle = reactive({
      border: `1px solid ${props.tableColor}`
    })
    const labelStyle = reactive({
      background: props.tableColor
    })
    return {
      tableTitle,
      tableStyle,
      labelStyle
    }
  }
}



</script>

<style lang="scss" scoped>
.users-table {
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
  .table-label {
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
    color: #FFFFFF;
  }
  .table_card {
    width: 380px;
    padding: 14px 20px;
    border: 1px solid #DFDEED;
    border-radius: 4px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #262541;
    @media (min-width: 1200px) and (max-width: 1400px) {
      width: 368px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 300px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    &.inactive {
      font-size: 13px;
      color: #575775;
    }
    .left-side {
      display: flex;
      align-items: center;
      .picture {
        margin-right: 16px;
      }
      .name-duty {
        .duty {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
        }
      }

    }
    .right-side {
      display: flex;
      align-items: center;
      .status {
        margin-right: 24px;
      }
      .inactive {
        margin-right: 24px;
      }
    }
  }
}
</style>