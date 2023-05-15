import { useElementSize } from '@vueuse/core';
import { toRefs } from 'vue';

const headerElement = document.getElementById('header');

const { width: headerWidth, height: headerHeight } = useElementSize(header);
