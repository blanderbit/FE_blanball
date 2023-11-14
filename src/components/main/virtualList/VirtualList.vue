<template>
  <DynamicScroller
    :items="elements"
    :min-item-size="84"
    :key-field="virtualListRecord.idKeyField"
    class="scroller"
    ref="scroller"
  >
    <template #before>
    </template>
    <template v-slot="{ item, index, active, itemWithSize }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :sizeDependencies="[elements.length, item.metadata?.expanding]"
        :data-index="index"
      >
        <component
          :is="virtualListRecord.componentName"
          :instanceData="item"
          :selectable="selectable"
          :active="activeNotification === item.notification_id"
          :selectedCount="selectedList.length"
          :checked="selectedList.includes(item.notification_id)"
          :notCollapsible="isCollapsible"
          @handler-action="handlerAction($event, item)"
          @selected="handleSelected($event)"
          @openContextMenu="$emit('openContextMenu', $event)"
          @closeMobileMenu="$emit('closeMobileMenu', $event)"
        >
        </component>
      </DynamicScrollerItem>
    </template>
    <template #after>
      <slot name="after"></slot>
    </template>
  </DynamicScroller>
</template>

<script>
import Notification from '../notifications/Notification.vue';
import ChatCard from '../chat/ChatCard.vue';
import { useRouter } from 'vue-router';
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
  computed,
} from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller';
import { notificationButtonHandlerMessage } from '@workers/utils-worker';
import { useWindowWidth } from '@workers/window-size-worker/widthScreen';

export default {
  components: {
    Notification,
    DynamicScroller,
    DynamicScrollerItem,
    ChatCard,
  },
  props: {
    elements: {
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
    virtualListRecord: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:selected-list', 'update:scrollbar-existing', 'delete'],
  setup(context, { emit, expose }) {
    let activeNotification = ref(0);
    let list = ref(context.selectedList);
    let scroller = ref();
    const router = useRouter();
    const maxSelectedNotificationsCount = 100;

    const { isMobile, isTablet, onResize } = useWindowWidth();

    const isCollapsible = computed(() => !(isMobile.value || isTablet.value));

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    watch(
      () => context.selectedList,
      () => {
        const array = [...context.selectedList];
        list.value = Array.isArray(array) ? (!array.length ? [] : array) : [];
        scroller.value.forceUpdate();
      }
    );

    // watch(
    //   () => context.elements,
    //   (e) => {
    //     nextTick(() => {
    //       emit(
    //         'update:scrollbar-existing',
    //         scroller.value?.$el.scrollHeight > scroller.value.$el.clientHeight
    //       );
    //     });
    //   },
    //   {
    //     immediate: true,
    //   }
    // );

    const handlerAction = async (button, notificationInstance) => {
      emit('removePushNotificationAfterSidebarAction', notificationInstance);
      await notificationButtonHandlerMessage({
        button,
        notificationInstance,
        router,
        activeNotification,
      });
      emit('updateElements');
    };

    const handleSelected = (e) => {
      if (e.selected) {
        if (list.value.length < maxSelectedNotificationsCount) {
          list.value.push(e.notification.notification_id);
        }
      } else {
        const index = list.value.findIndex(
          (item) => item === e.notification.notification_id
        );
        list.value.splice(index, 1);
      }
      emit('update:selected-list', list.value);
    };

    expose({
      scrollToItem: (index) => scroller.value.scrollToItem(index),
      scrollToFirstElement: () => scroller.value.scrollToItem(0),
    });

    return {
      activeNotification,
      list,
      handlerAction,
      handleSelected,
      scroller,
      isCollapsible,
    };
  },
};
</script>

<style scoped lang="scss">
.scroller {
  height: 100%;
}

.notification-wrapper {
  position: relative;
}
</style>
