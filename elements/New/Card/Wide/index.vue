<template>
  <component :is="contentWrapper ? 'NewContent' : 'section'" :width="$attrs['width']">
    <NewCard
      :class-content="contentClasses"
      :class-image="classImage"
      :color-subtitle="colorSubtitle"
      :class-text-content="classTextContent"
      :disabled="disabled"
      :header="header"
      :href="href"
      :href-title="hrefTitle"
      :href-type="hrefType"
      :size-title="sizeTitle"
      :size-subtitle="sizeSubtitle"
      :image="image"
      :image-type="imageType"
      :image-height="imageHeight"
      :is-overflow-hidden="isOverflowHidden"
      :is-absolute-path-image="isAbsolutePathImage"
      :weight-title="weightTitle"
      :has-mobile-image="hasMobileImage"
    >
      <template v-if="$slots.beforeHeader" #beforeHeader>
        <slot name="beforeHeader" />
      </template>

      <slot />
    </NewCard>
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import NewContent from "@/components/New/Content/index.vue";
import card from "../mixins/card";

import NewCard from "@/elements/New/Card/index.vue";

type SizePadding = "std" | "compact";

export default Vue.extend({
  name: "NewCardWide",

  components: {
    NewCard,
    NewContent,
  },

  mixins: [card],

  props: {
    contentWrapper: {
      type: Boolean,
      default: false,
    },
    paddingsSize: {
      type: String as () => SizePadding,
      default: "std",
    },
  },

  computed: {
    contentClasses() {
      return `${this.classContent} ${this.$style.cardWideContent} ${this.$style[this.paddingsSize]}`;
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/New/Card/index";
</style>
