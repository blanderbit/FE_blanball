import { watch, ref } from 'vue'
import {cloneDeep, isEqual} from 'lodash'
const $updateQuery = (queryConfig) => {
  const {router} = queryConfig;

  return (query) => {
    query = Object.keys(query)
      .filter(item => !!query[item])
      .reduce((prev, cur) => ({
        ...prev,
        [cur]: query[cur]
      }), {});
    return router
      .replace({
        path: router.currentRoute.value.path,
        query
      })
      .catch(err => err);
  }
};

const filterParseFromUrl = (config, query) => {
  Object
    .keys(config)
    .forEach(key => {
      debugger
      if (config[key]) {
        config[key].value = query[key]
      }
    });
  return config;
};

const getValuesFromFilter = (values) => {
  return Object
    .keys(values)
    .reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: values[cur]?.value
      }
    }, {})
};

const FilterPatch = (config) => {
  const {
    filters: filtersConfig,
    afterUpdateFiltersCallBack,
    router,
    transpilledQuery
  } = config;
  debugger
  const filters = ref(filterParseFromUrl(
    filtersConfig,
    router.currentRoute.value.meta.transpilledQuery || transpilledQuery || {}
  ));
  debugger
  const updateQuery = $updateQuery(config);
  debugger
  const updateFilter = () => {
    updateQuery(getValuesFromFilter(filters.value));
    if (typeof afterUpdateFiltersCallBack === 'function') {
      afterUpdateFiltersCallBack()
    }
  };

  const setFilters = (value) => {
    filterParseFromUrl(filters.value, value)
  };

  const clearFilters = () => {
    Object
      .keys(filters.value)
      .forEach((key) => filters.value[key].value = filters.value[key].default)
  };

  watch(
    () => cloneDeep(getValuesFromFilter(filters.value)),
    (a, b) => {
      if(!isEqual(a, b)) {
        updateFilter()
      }

    },
    {
      deep: true,
      immediate: false
    }
  );

  return {
    updateFilter,
    filters,
    setFilters,
    clearFilters,
    getRawFilters: () => getValuesFromFilter(filters.value)
  }
};

export {
  FilterPatch
}