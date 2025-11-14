<template>
  <NewContentScrollCard
    v-if="isScrollContent"
    data-test-id="products-cards-container"
    :header="header"
    :cards="cards"
    size-title="h3"
  >
    <template #action>
      <NewButtonLink alternative :href="docsHref" icon="arrow-right" icon-placement="right" theme="primary"
        >See all Products</NewButtonLink
      >
    </template>
  </NewContentScrollCard>

  <NewContent v-else data-test-id="products-cards-container" :header="header">
    <template #action>
      <NewButtonLink alternative :href="docsHref" icon="arrow-right" icon-placement="right" theme="primary"
        >See all Products</NewButtonLink
      >
    </template>
    <template #default>
      <NewCardGrid :cards="cards" :class-grid="$style.productList" size-title="h3" />
    </template>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import type { CardNew } from "@/types/CardNew";
import type { Header } from "@/types/Header";
import { docsHref } from "@/utils/links/common";

export default Vue.extend({
  name: "NewBlockProducts",

  components: {
    NewButtonLink: () => import("@/elements/New/Button/Link/index.vue"),
    NewContent: () => import("@/components/New/Content/index.vue"),
    NewContentScrollCard: () => import("@/components/New/Content/Scroll/Cards/index.vue"),
    NewCardGrid: () => import("@/elements/New/Card/Grid/index.vue"),
  },

  props: {
    header: {
      type: Object as () => Header,
      required: true,
    },
    cards: {
      type: Array as () => CardNew[],
      required: true,
    },
    isMobileScroll: {
      type: Boolean,
      default: false,
    },
    isEverScroll: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      docsHref,
    };
  },

  computed: {
    isScrollContent() {
      return this.isEverScroll || (this.$isMobile && this.isMobileScroll);
    },
  },
});
</script>
<style lang="scss" module>
@import "assets/styles/new/mixins";

.productList {
  @include mobile {
    gap: 8px;
  }
}
</style>
