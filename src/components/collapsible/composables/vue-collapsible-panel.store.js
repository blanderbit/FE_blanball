import { computed, reactive } from 'vue'

const state = reactive({
  panelGroups: {},
})

export const useCollapsiblePanelStore = () => {
  const useGroupAccordion = (idGroup) =>
    computed(() => state.panelGroups[idGroup].accordion)

  const setGroupAccordionStatus = (idGroup, status) => {
    state.panelGroups[idGroup] = {
      ...state.panelGroups[idGroup],
      accordion: status,
    }
  }

  const panelExpanded = (idGroup, idPanel) =>
    computed(
      () => state.panelGroups[idGroup]?.panelExpandStatus?.[idPanel] || false
    )

  const setPanelExpandedStatus = (idGroup, idPanel, status) => {
    state.panelGroups[idGroup] = {
      ...state.panelGroups[idGroup],
      panelExpandStatus: {
        ...(state.panelGroups[idGroup]?.panelExpandStatus || {}),
        [idPanel]: status,
      },
    }
  }

  const togglePanelExpandedStatus = (idGroup, idPanel) => {
    if (!state.panelGroups[idGroup].accordion) {
      state.panelGroups[idGroup].panelExpandStatus[idPanel] =
        !state.panelGroups[idGroup].panelExpandStatus[idPanel]
      return state.panelGroups[idGroup].panelExpandStatus[idPanel]
    }

    if (!state.panelGroups[idGroup].panelExpandStatus[idPanel]) {
      Object.keys(state.panelGroups[idGroup].panelExpandStatus).forEach(
        (key) => {
          state.panelGroups[idGroup].panelExpandStatus[key] = false
        }
      )
    }

    state.panelGroups[idGroup].panelExpandStatus[idPanel] =
      !state.panelGroups[idGroup].panelExpandStatus[idPanel]
    return state.panelGroups[idGroup].panelExpandStatus[idPanel]
  }

  return {
    useGroupAccordion,
    setGroupAccordionStatus,
    panelExpanded,
    setPanelExpandedStatus,
    togglePanelExpandedStatus,
  }
}
