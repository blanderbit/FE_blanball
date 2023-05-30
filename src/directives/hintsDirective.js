import { useHintsStore } from '../stores/hints';
import { BlanballEventBus } from '../workers/event-bus-worker';

export function hintsDirective(el, hintsData) {
  const hintsStore = useHintsStore();

  const hintsToShow = hintsData.value.filter((result) => {
    return hintsStore.hintsData.results.some(
      (value) => value.name === result.name
    );
  });

  const calculatePosition = (hint) => {
    return {
      ...hint,
      top: el.getBoundingClientRect().top + el.offsetHeight + hint.marginTop,
      left: el.getBoundingClientRect().left - hint.width / 2,
    };
  };

  hintsToShow.map(calculatePosition);

  if (hintsToShow.length) {
    BlanballEventBus.emit('createHints', { hints: hintsToShow, element: el });
  }
}
