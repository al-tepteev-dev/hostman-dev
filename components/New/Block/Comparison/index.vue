<template>
  <NewContent data-test-id="prices-comparison-container" :header="header" header-justify="center" :width="contentWidth">
    <template #tabs>
      <NewTabs v-model="currentTab" :class-tabs="$style.compareTabs" inside-content-slot :items="tabs" />
    </template>

    <template #default>
      <NewBlockComparisonContent :current-tab="currentTab" />
    </template>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewBlockComparisonContent from "@/components/New/Block/Comparison/Content/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewTabs, { TabItem } from "@/elements/New/Tabs/index.vue";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewBlockComparison",

  components: { NewBlockComparisonContent, NewContent, NewTabs },

  props: {
    header: {
      type: Object as () => Header,
      default: () => ({
        title: "Hostman's commitment to simplicity <br/>and budget-friendly solutions",
      }),
    },
  },

  data() {
    return {
      currentTab: 0,
      tabs: [
        {
          id: 0,
          title: "1 CPU",
        },
        {
          id: 1,
          title: "2 CPU",
        },
        {
          id: 2,
          title: "4 CPU",
        },
        {
          id: 3,
          title: "8 CPU",
        },
      ] as TabItem[],
    };
  },

  computed: {
    contentWidth() {
      return this.$isMobile ? "full" : "1200";
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.compareTabs {
  @include mobile {
    margin: 0 !important;
    padding: 0 40px !important;
  }
}
</style>
