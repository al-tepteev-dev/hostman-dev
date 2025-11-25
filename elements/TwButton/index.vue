<template>
  <component
    :is="isDiv ? 'div' : 'button'"
    :disabled="loading"
    :class="[
      $style.primary,
      className,
      type === 'is-secondary' && $style.secondary,
      type === 'is-transparent' && $style.transparent,
      type === 'is-gray' && $style.gray,
      type === 'is-white' && $style.white,
      disabled && $style.disabled,
      expanded && $style.expanded,
    ]"
    @click="onClickButton"
  >
    <ring-loader v-if="loading" loader-type="button" :color="loaderColor" />
    <slot v-else />
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import RingLoader from "~/elements/TwRingLoader/index";

export type btnType = "is-primary" | "is-secondary" | "is-transparent" | "is-gray" | "is-white";

export default Vue.extend({
  name: "TwButton",

  components: {
    RingLoader,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as () => btnType,
      default: "primary",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    isDiv: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    loaderColor() {
      return ["is-transparent", "is-white"].includes(this.type) ? "is-black" : "is-white";
    },
  },

  methods: {
    onClickButton() {
      this.$emit("click");
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/TwButton/index";
</style>
