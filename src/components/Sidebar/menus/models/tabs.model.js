import { ref } from 'vue';
import { PaginationWorker } from '../../../../workers/pagination-worker';
import { FilterPatch } from '../../../../workers/api-worker/http/filter/filter.patch';
import {
  finishSpinner,
  startSpinner,
} from '../../../../workers/loading-worker/loading.worker';
import router from '../../../../router';
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
    },
    selectable: true,
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

  constructor(options, instance) {
    const { records } = options;

    this.records = {
      record: {
        componentName: records.record.componentName,
      },
      request: {
        api: records.request.api,
        filtersModel: records.request.filtersModel,
        dataTransformation: records.request.dataTransformation,
        beforeConcat: records.request.beforeConcat,
      },
      selectable: records.selectable,
      scrollStrategy: records.scrollStrategy,
      watchChanges: records.watchChanges,
      contextMenu: records.contextMenu,
      selectedList: ref([]),
      blockScrollToTopIfExist: ref(false),
    };

    this.badge.count.value = options.badge.count || 0;

    this.uniqueName = options.uniqueName;

    this.title = options.title;

    Object.assign(this, this.usePagination(instance || {}));

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
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        this.records.request.api({
          ...getRawFilters(),
          page,
        }),
      dataTransformation: this.records.request.dataTransformation,
      beforeConcat: this.records.request.beforeConcat,
    });

    const { getRawFilters, updateFilter, filters, clearFilters, setFilters } =
      FilterPatch({
        router: passedRouter || router,
        filters: this.records.request.filtersModel,
        afterUpdateFiltersCallBack: () => {
          paginationClearData();
        },
      });

    const loadNewData = async (pageNumber, $state, forceUpdate, isLoading) => {
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

  $emit() {
    MenuTabsConfigEventBus.emit(...arguments);
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
