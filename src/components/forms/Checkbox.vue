<template>
  <label :for="fieldId" class="checkbox blue">
    <input
      @input="(event) => $emit('update:checked', event.target.checked)"
      type="checkbox"
      :checked="checked"
      :id="fieldId"
    />
    <span class="indicator"></span>
    <slot name="label">{{ label }}</slot>
  </label>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
  props: {
    label: String,
    fieldId: {
      type: [String, Number],
      default: uuid(),
    },
    checked: {
      type: Boolean,
    },
  },
}
</script>

<style scoped lang="scss">
/* Checkbox styles */

$black: #2d3137;
$blue: $--b-main-gray-color;
$green: #329e78;
$grey: #d6d6d6;
$red: #dd3c3a;
$white: #ffffff;

$border-radius: 3px;
label {
  padding: 0;
  margin: 0;
  cursor: pointer;
}

@mixin checkbox($color) {
  width: 18px;
  height: 18px;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:focus ~ span {
      border: 2px solid lighten($black, 50%);
    }

    &:focus:checked ~ span {
      border: 2px solid darken($color, 15%);
    }

    &:checked ~ span {
      color: $white;
      background: $green
        url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTIgOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZD0iTTQuNTc1IDguOTc3cy0uNDA0LS4wMDctLjUzNi0uMTY1TC4wNTcgNS42NGwuODI5LTEuMjI3TDQuNDcgNy4yNjggMTAuOTIxLjA4NmwuOTIzIDEuMTAzLTYuODYzIDcuNjRjLS4xMzQtLjAwMy0uNDA2LjE0OC0uNDA2LjE0OHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPg0KPC9zdmc+)
        50% 40% no-repeat;
      border: 2px solid $green;
    }
  }

  span {
    border-radius: $border-radius;
    position: absolute;
    left: 0;
    top: -2px;
    width: 18px;
    height: 18px;
    background-color: lighten($black, 65%);
    border: 2px solid lighten($black, 65%);
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

label.checkbox {
  @include checkbox($green);

  &.blue {
    @include checkbox($blue);
  }

  &.red {
    @include checkbox($red);
  }
}
</style>
