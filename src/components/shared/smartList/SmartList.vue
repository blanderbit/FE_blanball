<template>
  <DynamicScroller
    :items="list"
    :min-item-size="50"
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
        :size-dependencies="[list.length, item?.metadata?.expanding]"
        :data-index="index"
      >
        <slot name="smartListItem" :index="index" :smartListItem="item"> </slot>
      </DynamicScrollerItem>
    </template>
    <template #after>
      <slot name="after"></slot>
    </template>
  </DynamicScroller>
</template>
<script>
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller';

import notification from '../../main/notifications/Notification.vue';

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
  },
  emits: ['update:selected-list', 'update:scrollbar-existing'],
  setup(props, { emit, expose }) {
    let activeNotification = ref(0);
    let scroller = ref();
    const router = useRouter();

    watch(
      () => props.selectedList,
      () => {
        const array = [...props.selectedList];
        list.value = Array.isArray(array) ? (!array.length ? [] : array) : [];
        scroller.value.forceUpdate();
      }
    );

    watch(
      () => props.list,
      () => {
        nextTick(() => {
          emit(
            'update:scrollbar-existing',
            scroller.value.$el.scrollHeight > scroller.value.$el.clientHeight
          );
        });
      },
      {
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
