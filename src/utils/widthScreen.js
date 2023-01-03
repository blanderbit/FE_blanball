import { ref } from 'vue'

export default function useWindowWidth() {
  const isMobile = ref(window.innerWidth < 768)
  const isTablet = ref(window.innerWidth > 576 && window.innerWidth < 992)

  function onResize() {
    isMobile.value = window.innerWidth < 768
    isTablet.value = window.innerWidth > 576 && window.innerWidth < 992
  }

  return {
    onResize,
    isMobile,
    isTablet
  }
}