<template>
  <div>
    <!-- <Checkbox
      :checked="modelValue"
      @update:checked="valueChange"
    /> -->
    <label class="b_switch" :for="id">
      <input 
        type="checkbox"
        :id="id" 
        :checked="modelValue" 
        @change="valueChange"
        @input="valueChange($event.target.checked)"
      />
      <div class="b_switch_slider round"></div>
    </label>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { CustomModelWorker } from '../workers/custom-model-worker'
import Checkbox from '../components/Checkbox.vue'

export default {
  name: 'switch-component',
  components: {
    Checkbox
  },
  props: {
    id: {
      type: String,
      required: true
    },
    initialValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    name: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const { modelValue, modelErrorMessage, modelHandlers } = CustomModelWorker(props)

    function valueChange(val) {
      modelHandlers.value.input[0](val)
      modelHandlers.value.input[1](val, false)
      console.log(modelValue)
    }

    return {
      modelValue,
      modelHandlers,
      valueChange
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
  display: none;
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

input:checked+.b_switch_slider {
  background-color: #148783;
}

input:checked+.b_switch_slider:before {
  transform: translateX(20px);
}

.b_switch_slider.round {
  border-radius: 34px;
}

.b_switch_slider.round:before {
  border-radius: 50%;
}
</style>