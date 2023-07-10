<template>
  <router-link :to="derivedTo">
    <slot />
  </router-link>
</template>
<script>
import { computed } from 'vue';

import { isNil } from '../../../utils/isNil';

export default {
  name: 'Route',
  props: {
    to: {
      default: '#',
      type: [String, Object],
    },
  },
  setup({ to }) {
    const derivedTo = computed(() => {
      if (typeof to === 'string') {
        return to;
      }

      const derivedTo = { ...to };

      if (isNil(derivedTo.params)) {
        derivedTo.params = {};
      }

      return derivedTo;
    });

    return {
      derivedTo,
    };
  },
};
</script>
