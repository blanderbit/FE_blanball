<template>
  <label class="b_switch" :for="id">
    <input type="checkbox" :id="id" />
    <div class="b_switch_slider round"></div>
  </label>
</template>

<script>
export default {
  name: 'switch-component',
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.b_switch {
  display: inline-block;
  height: 20px;
  position: relative;
  width: 40px;
}

.b_switch input {
  display:none;
}

.b_switch_slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.b_switch_slider:before {
  background-color: #fff;
  bottom: 2px;
  content: "";
  height: 16px;
  left: 2px;
  position: absolute;
  transition: .4s;
  width: 16px;
}

input:checked + .b_switch_slider {
  background-color: #148783;
}

input:checked + .b_switch_slider:before {
  transform: translateX(20px);
}

.b_switch_slider.round {
  border-radius: 34px;
}

.b_switch_slider.round:before {
  border-radius: 50%;
}
</style>