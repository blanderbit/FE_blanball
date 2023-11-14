import { ref, watch } from 'vue';
import { PaginationWorker } from '@workers/pagination-worker';
import { FilterPatch } from '@workers/api-worker/http/filter/filter.patch';
import {
  finishSpinner,
  startSpinner,
} from '@workers/loading-worker/loading.worker';
import router from '@router/index';
import { /*  */ SupportTabsBusEvents } from '../menu.event.bus';
import { EventBus } from '@workers/event-bus-worker/event.bus.worker';

export class TabModel {
  records = {
    request: {
      api() {},
      filtersModel: {},
      dataTransformation() {},
      beforeConcat() {},
      paginationFunction() {},
      messageType: null,
    },
    scrollStrategy: '',
    paginationMetadata: {
      forceUpdate() {},
    },
    watchChanges: [],
    contextMenu: [],
  };

  badge = {
    count: ref(0),
  };
  _bus = new EventBus();
  selectable = ref(false);

  uniqueName = '';

  title = '';

  constructor(options, routerInstance) {
    const { records } = options;

    this.records = {
      record: {
        componentName: records.record.componentName,
        idKeyField: records.record.idKeyField
          ? records.record.idKeyField
          : 'id',
      },
      request: {
        api: records.request.api,
        filtersModel: records.request.filtersModel,
        dataTransformation: records.request.dataTransformation,
        beforeConcat: records.request.beforeConcat,
        paginationFunction: records.request.paginationFunction,
        messageType: records.request?.messageType,
      },
      scrollStrategy: records.scrollStrategy,
      watchChanges: records.watchChanges,
      contextMenu: records.contextMenu,
      selectedList: ref([]),
      blockScrollToTopIfExist: records.blockScrollToTopIfExist,
      emptyListConfig: records.emptyListConfig,
    };

    this.badge.count.value = options.badge.count || 0;

    this.uniqueName = options.uniqueName;
    this.title = options.title;
    this.selectable.value = options.selectable;

    Object.assign(this, this.usePagination(routerInstance || {}));

    this.$registerOn(
      SupportTabsBusEvents.LoaTabData.event,
      SupportTabsBusEvents.LoaTabData.handler
    );
  }

  setBadgeCount(value) {
    this.badge.count.value = value;
  }

  clearSelectedList() {
    this.records.selectedList = [];
  }

  cancelSelectable() {
    this.selectable = false;
    this.clearSelectedList();
  }

  usePagination({ router: passedRouter }) {
    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationLoad,
    } = this.records.request.paginationFunction({
      paginationDataRequest: (page) => {
        return this.records.request.api({
          ...getRawFilters(),
          page,
        });
      },
      dataTransformation: this.records.request.dataTransformation,
      beforeConcat: this.records.request.beforeConcat,
      messageType: this.records.request.messageType,
    });

    const { getRawFilters, updateFilter, filters, clearFilters, setFilters } =
      FilterPatch({
        router: passedRouter || router,
        filters: this.records.request.filtersModel,
        afterUpdateFiltersCallBack: () => {
          paginationClearData();
        },
      });

    const loadNewData = async ({
      pageNumber,
      $state,
      forceUpdate,
      isLoading,
    }) => {
      if (!pageNumber) {
        pageNumber = 1;
      }
      if (isLoading) {
        startSpinner();
      }
      if (forceUpdate) {
        paginationClearData();
      }

      await paginationLoad({ pageNumber, $state, forceUpdate });
      if (isLoading) {
        finishSpinner();
      }
    };

    const removeElementById = (elementId, idFieldName = 'id') => {
      const indexToRemove = paginationElements.value.findIndex(
        (element) => element[idFieldName] === elementId
      );
      if (indexToRemove !== -1) {
        paginationElements.value.splice(indexToRemove, 1);
        paginationTotalCount.value--;
      }
    };

    const addNewElement = (element) => {
      paginationElements.value.unshift(element);
      paginationTotalCount.value++;
    };

    return {
      loadNewData,
      getRawFilters,
      updateFilter,
      filters,
      clearFilters,
      setFilters,
      paginationElements,
      removeElementById,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationLoad,
      addNewElement,
    };
  }

  $emit(emitName, options) {
    this._bus.emit(emitName, options);
  }

  $registerOn(eventName, eventHandlerName) {
    if (eventHandlerName in this) {
      this._bus.on(eventName, this[eventHandlerName].bind(this));
    } else {
      console.error(
        '[BLANBALL.[tabs.model.js].$on], does not exist eventHandlerName'
      );
    }
  }
}
