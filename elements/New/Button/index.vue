<template>
  <button class="body2 semibold" :class="coreClasses" :disabled="disabled" @click="onClick">
    <NewLoader v-if="loading" :is-accent="theme === 'inverted'" />

    <div v-else :class="$style.content">
      <SvgIcon v-if="iconPath" :class="iconClasses" color="is-inherit" :icon-path="iconPath" />
      <slot />
    </div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import NewLoader from "@/elements/New/Loader/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { gtmAnalytics } from "@/utils/GTMAnalytics";

export type BtnIconPlacement = "left" | "right";
export type BtnSize = "sm" | "md" | "lg";
export type BtnTheme = "accent" | "primary" | "secondary" | "inverted";

export default Vue.extend({
  name: "NewButton",

  components: { NewLoader, SvgIcon },

  props: {
    alternative: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    gtmEvent: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    iconPlacement: {
      type: String as () => BtnIconPlacement,
      default: "left",
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as () => BtnSize,
      default: "lg",
    },
    theme: {
      type: String as () => BtnTheme,
      default: "accent",
    },
  },

  computed: {
    coreClasses() {
      return [
        this.$style.core,
        this.$style[`size-${this.size}`],
        this.$style[`theme-${this.theme}`],
        this.alternative && this.$style.alternative,
        this.disabled && this.$style.disabled,
        this.expanded && this.$style.expanded,
        this.isIcon && this.$style.iconBtn,
        this.isRounded && this.$style.roundedBtn,
        this.loading && this.$style.loading,
      ];
    },
    iconClasses() {
      return [this.iconPlacement === "right" && this.$style.iconRight];
    },
    iconPath() {
      return this.icon ? `icons/new/${this.icon}.svg` : undefined;
    },
  },

  methods: {
    onClick() {
      if (this.disabled || this.loading) {
        return;
      }
      if (this.gtmEvent) {
        gtmAnalytics.send(this.gtmEvent);
      }
      this.$emit("click");
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/New/Button/index";
</style>
