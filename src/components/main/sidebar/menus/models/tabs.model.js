 
import { PaginationWorker } from '@workers/pagination-worker';
import { FilterPatch } from '@workers/api-worker/http/filter/filter.patch';
import {
  finishSpinner,
  startSpinner,
} from '@workers/loading-worker/loading.worker';
import router from '@router/index';
import {
  MenuTabsConfigEventBus,
  SupportTabsBusEvents,
} from '../menu.event.bus';

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

    Object.assign(this, this.usePagination(routerInstance || {}));

    this.$registerOn(
      SupportTabsBusEvents.LoaTabData.event,
      SupportTabsBusEvents.LoaTabData.handler
    );
  }

  setBadgeCount(value) {
    this.badge.count.value = value;
  }

  usePagination({ router: passedRouter }) {
    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationLoad,
    } = this.records.request.paginationFunction({
      paginationDataRequest: (page) =>
        this.records.request.api({
          ...getRawFilters(),
          page,
        }),
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

    return {
      loadNewData,
      getRawFilters,
      updateFilter,
      filters,
      clearFilters,
      setFilters,
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationLoad,
    };
  }

  $emit(emitName, options) {
    MenuTabsConfigEventBus.emit(emitName, options);
  }

  $registerOn(eventName, eventHandlerName) {
    if (eventHandlerName in this) {
      MenuTabsConfigEventBus.on(
        SupportTabsBusEvents.LoaTabData.event,
        this[SupportTabsBusEvents.LoaTabData.handler].bind(this)
      );
    } else {
      console.error(
        '[BLANBALL.[tabs.model.js].$on], does not exist eventHandlerName'
      );
    }
  }
}
