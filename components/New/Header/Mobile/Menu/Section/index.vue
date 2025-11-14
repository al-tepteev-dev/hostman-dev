<template>
  <div :class="$style.core">
    <NewSelect
      v-if="hasSubitems"
      v-model="selectedIdx"
      :class="$style.selector"
      :options="links"
      option-title="name"
      text-compact
    />

    <NewCard
      :class-content="!hasSubitems ? $style.linksWrapper : ''"
      :class-slot="`${$style.links} ${!hasSubitems ? $style.lightView : ''}`"
    >
      <NewHeaderMobileMenuItem
        v-for="(link, idx) in renderedItems"
        :key="idx"
        :link="link"
        :with-separator="hasSubitems && idx < renderedItems.length - 1"
        @selected="onItemClick"
      />
    </NewCard>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewCard from "@/elements/New/Card/index.vue";
import NewHeaderMobileMenuItem from "@/components/New/Header/Mobile/Menu/Item/index.vue";
import NewSelect from "@/elements/New/Select/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import type { HeaderLink, HeaderLinkMultiLevel } from "@/types/HeaderLink";

export default Vue.extend({
  name: "NewHeaderMobileMenuSection",

  components: {
    NewCard,
    NewHeaderMobileMenuItem,
    NewSelect,
    SvgIcon,
  },

  props: {
    hasSubitems: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array as () => HeaderLink[],
      required: true,
    },
  },

  data() {
    return {
      selectedIdx: 0,
    };
  },

  computed: {
    renderedItems() {
      return this.hasSubitems ? this.links[this.selectedIdx].items : this.links;
    },
  },

  methods: {
    getItemComponent(link: HeaderLinkMultiLevel | HeaderLink): string {
      return link.href ? "NuxtLink" : "div";
    },
    onItemClick(link: HeaderLinkMultiLevel | HeaderLink) {
      if (!link.items) {
        return;
      }
      this.$emit("show-submenu", link);
    },
  },
});
</script>

<style lang="scss" module>
.core {
  display: grid;
  gap: 12px;
}
.linksWrapper {
  padding: 16px;
}
.links {
  display: grid;
}
.lightView {
  gap: 4px;
}
</style>
