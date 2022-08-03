<template>
  <label class="switch" :for="id">
    <input type="checkbox" :id="id" />
    <div class="slider round"></div>
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
.switch {
  display: inline-block;
  height: 20px;
  position: relative;
  width: 40px;
}

.switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: #fff;
  bottom: 2px;
  content: "";
  height: 16px;
  left: 2px;
  position: absolute;
  transition: .4s;
  width: 16px;
}

input:checked + .slider {
  background-color: #148783;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>