import { ref } from 'vue'

export default function useWindowWidth() {
  const windowWidth = ref(window.innerWidth)

  function onResize() {
    windowWidth.value = window.innerWidth
  }

  return {
    onResize,
    windowWidth
  }
}