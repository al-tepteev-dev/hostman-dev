<template>
  <div
    :class="[
      $style.loader,
      $style.defaultLoader,
      loaderType === 'button' && $style.buttonLoader,
      isCentered && $style.buttonLoaderCentered,
      color === 'is-black' && $style.blackLoader,
      color === 'is-white' && $style.whiteLoader,
    ]"
  />
</template>

<script lang="ts">
import Vue from "vue";

export type LoaderType = "default" | "button";
export type LoaderColor = "is-black" | "is-white";

export default Vue.extend({
  name: "TwRingLoader",

  props: {
    loaderType: {
      type: String as () => LoaderType,
      default: "default",
    },
    color: {
      type: String as () => LoaderColor,
      default: "is-gray",
    },
    isCentered: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss" module>
$loaderColor: rgba(127, 127, 127, 0.5);

.loader,
.loader::after {
  border-radius: 50%;
  width: 45px;
  height: 45px;
}

.loader {
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: loading 0.6s infinite linear;
  animation: loading 0.6s infinite linear;
}

.defaultLoader {
  border-top: 0.25em solid $line-color;
  border-right: 0.25em solid $line-color;
  border-bottom: 0.25em solid $line-color;
  border-left: 0.25em solid #fff;
}

.buttonLoader {
  width: 16px;
  height: 16px;
  border-top: 2px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-color: $loaderColor;
  border-left: 2px solid transparent;
}

.buttonLoaderCentered {
  margin: 0 auto;
}

.blackLoader {
  border-top: 2px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-color: $black;
  border-left: 2px solid transparent;
}

.whiteLoader {
  border-top: 2px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-color: white;
  border-left: 2px solid transparent;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
