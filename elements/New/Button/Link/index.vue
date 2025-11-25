<template>
  <component
    :is="isExternal ? 'a' : 'NuxtLink'"
    class="body2 semibold"
    :class="coreClasses"
    :disabled="disabled"
    :href="isExternal ? href : undefined"
    :to="isExternal ? undefined : href"
    :target="hrefTarget"
    @click="onClick"
  >
    <div :class="$style.content">
      <SvgIcon v-if="iconPath" :class="iconClasses" color="is-inherit" :icon-path="iconPath" />
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import Vue from "vue";

import Parent from "@/elements/New/Button/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewButtonLink",

  components: { SvgIcon },

  extends: Parent,

  props: {
    href: {
      type: String,
      required: true,
    },
    hrefTarget: {
      type: String,
      default: "_self",
    },
  },

  computed: {
    isExternal() {
      return this.href.startsWith("http") || this.href.startsWith("mailto");
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/New/Button/index";
</style>
