<template lang="pug">
svg-icon(:icon-path="icon", :class="backgroundClasses", :width="width", :height="height", color="is-primary")
</template>

<script lang="ts">
import Vue from "vue";
import getDynamicAsset from "@/mixins/getDynamicAsset";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  components: { SvgIcon },
  mixins: [getDynamicAsset],

  props: {
    icon: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: "is-smoke",
    },
    isBigIcon: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "24",
    },
    height: {
      type: String,
      default: "24",
    },
  },

  computed: {
    backgroundClasses() {
      if (this.isBigIcon) {
        return "tw-icon tw-icon__big";
      }
      return "tw-icon tw-icon__bg background-" + this.background;
    },
  },
});
</script>

<style lang="scss" scoped>
.tw-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  max-width: 48px;
  max-height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.tw-icon__bg {
    border-radius: $border-radius-input;
  }
}
</style>
