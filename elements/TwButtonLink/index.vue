<template>
  <a
    :href="to"
    :class="[
      $style.primary,
      type === 'is-secondary' && $style.secondary,
      type === 'is-transparent' && $style.transparent,
      type === 'is-gray' && $style.gray,
      type === 'is-gray' && $style.gray,
      type === 'is-white' && $style.white,
      expanded && $style.expanded,
    ]"
    :target="target"
    @click="onClickButton"
  >
    <ring-loader v-if="loading" loader-type="button" />
    <slot v-else />
  </a>
</template>

<script lang="ts">
import Vue from "vue";
import RingLoader from "~/elements/TwRingLoader/index";
import { btnType } from "~/elements/TwButton/index.vue";

export default Vue.extend({
  name: "HmButtonLink",

  components: {
    RingLoader,
  },

  props: {
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
    to: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: null,
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
