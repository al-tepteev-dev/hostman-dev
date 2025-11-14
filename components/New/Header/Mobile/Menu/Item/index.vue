<template>
  <div>
    <component
      :is="component"
      :class="[$style.core, isSeveralLines && $style.severalLines]"
      :to="link.href"
      @click="$emit('selected', link)"
    >
      <div :class="$style.text">
        <div class="medium" :class="[$style.title, isSeveralLines ? 'body3' : 'body1']">
          {{ link.name }}
        </div>
        <div v-if="isSeveralLines" class="body5 nd-text-secondary">
          {{ link.description }}
        </div>
      </div>

      <SvgIcon v-if="icon" :icon-path="icon" :width="iconSize" :height="iconSize" />
    </component>

    <div v-if="withSeparator" :class="$style.separator" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import type { HeaderLink, HeaderLinkMultiLevel } from "@/types/HeaderLink";

export default Vue.extend({
  name: "NewHeaderMobileMenuItem",

  components: { SvgIcon },

  props: {
    link: {
      type: Object as () => HeaderLink | HeaderLinkMultiLevel,
      required: true,
    },
    withSeparator: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    component() {
      return this.link.href ? "NuxtLink" : "div";
    },
    icon() {
      if (!this.link.icon && !this.link.items) {
        return;
      }
      return `icons/new/${this.link.icon || "chevron-right"}.svg`;
    },
    iconSize() {
      return this.link.icon ? "32" : "24";
    },
    isSeveralLines() {
      return !!this.link.description;
    },
  },
});
</script>

<style lang="scss" module>
.core {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 40px;
  padding-left: 8px;

  &.severalLines {
    align-items: start;
    padding-left: 0;
  }

  &:hover {
    .title {
      color: var(--link-primary-hover);
    }
  }
}
.title {
  transition: var(--transition-color);
}
.text {
  display: grid;
  gap: 6px;
}
.separator {
  background: var(--surface-line);
  width: 100%;
  height: 1px;
  margin: 16px 0;
}
</style>
