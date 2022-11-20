
const passive = () => [];

const lazy = ({meta, errorMessage}) => {
  return ['change'];
};

const aggressive = () => ['input'];

const eager = ({meta, errorMessage}) => {
  if (errorMessage.value) {
    return ['input'];
  }

  return ['change'];
};

export const modes = {
  passive,
  lazy,
  aggressive,
  eager,
};
