<template>
  <img
    src="../../../assets/img/dropdown-arrow-disabled.svg"
    alt="dropdown-arrow"
  />
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    console.log(props.mode);
  },
};
</script>
