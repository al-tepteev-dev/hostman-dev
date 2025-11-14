<template>
  <div :class="$style.core">
    <div :class="$style.first">
      <div v-if="item.header.subtitle" :class="[textClass, 'nd-text-secondary']" v-html="item.header.subtitle" />

      <div :class="textClass" v-html="item.header.title" />
    </div>

    <div v-for="(provider, idx) in item.providers" :key="idx" :class="$style.provider">
      <SvgIcon
        v-if="provider.icon"
        :class="$style.icon"
        color="is-inherit"
        :icon-path="`icons/new/${provider.icon}.svg`"
        :width="iconSize"
        :height="iconSize"
      />

      <div v-if="provider.text" :class="textClass" v-html="provider.text" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import getDynamicAsset from "@/mixins/getDynamicAsset";
import type { Header } from "@/types/Header";

export type ComparisonRowProvider = {
  icon?: string;
  text?: string;
};

export type ComparisonRow = {
  isHead?: boolean;
  header: Header;
  providers: ComparisonRowProvider[];
};

export default Vue.extend({
  name: "NewBlockComparison",

  components: { SvgIcon },

  mixins: [getDynamicAsset],

  props: {
    item: {
      type: Object as () => ComparisonRow,
      required: true,
    },
  },

  computed: {
    isHead() {
      return this.item.isHead || false;
    },
    iconSize() {
      return this.isHead ? (this.$isMobile ? "30" : "36") : "24";
    },
    textClass() {
      return this.isHead ? `body2 semibold ${this.$style.isHead}` : `body3 medium ${this.$style.isRow}`;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: flex;
  align-items: center;
}
.first {
  flex: 1;
  display: grid;
  gap: 4px;
}
.provider {
  color: var(--icon-accent);
  width: 136px;
  display: grid;
  gap: 12px;
  justify-content: center;
  text-align: center;
  .isHead {
    letter-spacing: -0.4px !important;
  }
  .isRow {
    letter-spacing: -0.08px !important;
  }
  @include desktop {
    width: 156px;
  }
}
.icon {
  margin: 0 auto;
}
</style>
