<template>
  <DynamicScroller
    :emit-update="true"
    :items="list"
    :item-size="itemHeight"
    :min-item-size="itemMinHeight"
    :grid-items="itemCount"
    :item-secondary-size="itemWidth"
    :key-field="keyField"
    class="scroller"
    ref="scroller"
  >
    <template #before>
      <slot name="before"></slot>
    </template>
    <template v-slot="{ item, index, active, itemWithSize }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :sizeDependencies="[
          list.length,
          item?.metadata?.expanding,
          itemHeight,
          itemMinHeight,
          itemCount,
          itemWidth,
        ]"
        :data-index="index"
      >
        <slot
          name="smartGridListItem"
          :index="index"
          :smartListItem="item"
        ></slot>
      </DynamicScrollerItem>
    </template>
    <template #after>
      <slot name="after"></slot>
    </template>
  </DynamicScroller>
</template>

<script>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

import Notification from '../Notification.vue'

export default {
  name: 'Notifications',
  components: {
    Notification,
    DynamicScroller,
    DynamicScrollerItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    selectedList: {
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    keyField: {
      type: String,
      default: 'id',
    },
    detectSizesForCards: {
      type: Function,
      default: () => {},
    },
  },
  emits: ['update:selected-list', 'update:scrollbar-existing'],
  setup(context, { emit, expose }) {
    let activeNotification = ref(0)
    let list = ref([])
    const itemWidth = ref(0)
    const itemHeight = ref(0)
    const itemMinHeight = ref(0)
    const itemCount = ref(0)
    let scroller = ref()

    watch(
      () => context.selectedList,
      () => {
        const array = [...context.selectedList]
        list.value = Array.isArray(array) ? (!array.length ? [] : array) : []
        scroller.value.forceUpdate()
      }
    )
    watch(
      () => context.list,
      () => {
        setTimeout(() => scroller.value.forceUpdate(true), 100)
      }
    )

    function detectResize() {
      if (context.detectSizesForCards) {
        context.detectSizesForCards({
          itemWidth,
          itemCount,
          itemHeight,
          itemMinHeight,
        })
      }
    }

    onMounted(() => {
      window.addEventListener('resize', detectResize)
      detectResize()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', detectResize)
    })

    watch(
      () => context.list,
      () => {
        nextTick(() => {
          setTimeout(() => {
            emit(
              'update:scrollbar-existing',
              scroller.value.$el.scrollHeight > scroller.value.$el.clientHeight
            )
          }, 0)
        })
      },
      {
        immediate: true,
      }
    )

    expose({
      scrollToItem: (index) => scroller.value.scrollToItem(index),
      scrollToFirstElement: () => scroller.value.scrollToItem(0),
    })

    return {
      activeNotification,
      scroller,
      itemHeight,
      itemWidth,
      itemCount,
      itemMinHeight,
    }
  },
}
</script>

<style scoped lang="scss">


// SCSS variables for hex colors
 $color-efeff6: #efeff6;


.scroller {
  height: 100%;
}

::v-deep {
  .vcp--expandable {
    background: $--b-main-white-color;
    border-bottom: 1px solid $color-efeff6;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
  }
  .vue-recycle-scroller__item-view {
    padding: 5px;
    > div,
    > div > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
