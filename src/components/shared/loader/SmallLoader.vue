<template>
  <div class="loader-wrapper">
    <div class="loader" />
  </div>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  padding: 1em;
}

.loader {
  font-size: 10px;
  margin: 0px auto;
  text-indent: -9999em;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: $--b-main-white-color;
  background: linear-gradient(
    to right,
    $--b-main-green-color 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: load3 1.4s infinite linear;
  transform: translateZ(0);
}

.loader:before {
  width: 50%;
  height: 50%;
  background: $--b-main-green-color;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}

.loader:after {
  background: $--b-main-white-color;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@-webkit-keyframes load3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes load3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
