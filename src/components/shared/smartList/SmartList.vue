<template>
  <DynamicScroller
    :items="list"
    :min-item-size="50"
    :emitUpdate="true"
    :key-field="keyField"
    class="scroller"
    ref="scroller"
    @scroll-start="scrollStart"
  >
    <template #before>
      <slot name="before"></slot>
    </template>
    <template v-slot="{ item, index, active, itemWithSize }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[list.length, item?.metadata?.expanding]"
        :data-index="index"
      >
        <div :style="itemsGapStyle">
          <slot name="smartListItem" :index="index" :smartListItem="item">
          </slot>
        </div>
      </DynamicScrollerItem>
    </template>
    <template #after>
      <slot name="after"></slot>
    </template>
  </DynamicScroller>
</template>

<script>
import { ref, watch, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import { DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller';

import notification from '@mainComponents/notifications/Notification.vue';

export default {
  components: {
    notification,
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
    itemsGap: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:selected-list', 'update:scrollbar-existing'],
  setup(props, { emit, expose }) {
    let activeNotification = ref(0);
    let scroller = ref();
    const router = useRouter();

    const itemsGapStyle = computed(() => {
      if (props.itemsGap) {
        return {
          'padding-top': `${props.itemsGap}px`,
        };
      }
    });

    watch(
      () => props.selectedList,
      () => {
        const array = [...props.selectedList];
        props.list = Array.isArray(array) ? (!array.length ? [] : array) : [];
      }
    );

    watch(
      () => props.list,
      () => {
        nextTick(() => {
          scroller.value.vScrollUpdate();
          emit(
            'update:scrollbar-existing',
            scroller.value.$el.scrollHeight > scroller.value.$el.clientHeight
          );
        });
      },
      {
        deep: true,
        immediate: true,
      }
    );

    expose({
      scrollToItem: (index) => scroller.value.scrollToItem(index),
      scrollToFirstElement: () => scroller.value.scrollToItem(0),
    });

    return {
      activeNotification,
      scroller,
      itemsGapStyle,
    };
  },
};
</script>

<style scoped lang="scss">
// SCSS variables for hex colors
$color-efeff6: #efeff6;

.scroller {
  height: 100%;
}
:deep {
  .vcp--expandable {
    background: $--b-main-white-color;
    border-bottom: 1px solid $color-efeff6;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
  }
}
</style>
