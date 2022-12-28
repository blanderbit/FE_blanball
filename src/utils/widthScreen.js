import { ref } from 'vue'

export default function useWindowWidth() {
  const isMobile = ref(window.innerWidth < 768)

  function onResize() {
    isMobile.value = window.innerWidth < 768
  }

  return {
    onResize,
    isMobile
  }
}