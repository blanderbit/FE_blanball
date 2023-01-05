import { ref } from 'vue'

export default function useWindowWidth() {
  const windowWidth = ref(window.innerWidth)
  const isMobileSmall = ref(window.innerWidth <= 576)
  const isMobile = ref(window.innerWidth <= 768)
  const isTablet = ref(window.innerWidth > 768 && window.innerWidth <= 992)
  const isBetweenTabletAndDesktop = ref(window.innerWidth > 992 && window.innerWidth <= 1200)

  function onResize() {
    windowWidth.value = window.innerWidth
    isMobileSmall.value = window.innerWidth <= 576
    isMobile.value = window.innerWidth <= 768
    isTablet.value = window.innerWidth > 768 && window.innerWidth <= 992
    isBetweenTabletAndDesktop.value = window.innerWidth > 992 && window.innerWidth <= 1200
  }

  return {
    onResize,
    windowWidth,
    isMobileSmall,
    isMobile,
    isTablet,
    isBetweenTabletAndDesktop
  }
}