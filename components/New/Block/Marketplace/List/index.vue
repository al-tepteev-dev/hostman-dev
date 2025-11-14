<template>
  <section>
    <section v-if="isEmptyQuery" :class="$style.grid">
      <NewBlockMarketplaceListItem v-for="app in filteredAppsByCategory" :key="app.id" :app="app" />
      <NewBlockMarketplaceCallToAction :header="ctaSection.header" :class="$style.cta" />
    </section>

    <section v-else :class="$style.sectionSearch">
      <div :class="$style.header">
        <h2 class="semibold" v-text="title" />
      </div>

      <div v-if="filteredAppsByQuery.length" :class="$style.grid">
        <NewBlockMarketplaceListItem v-for="app in filteredAppsByQuery" :key="app.id" :app="app" />
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import NewBlockMarketplaceCallToAction from "@/components/New/Block/Marketplace/CallToAction/index.vue";
import NewBlockMarketplaceListItem from "@/components/New/Block/Marketplace/List/Item/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import { MarketplaceItemModel } from "@/services/marketplace/models/MarketplaceItemModel";

export default Vue.extend({
  name: "NewBlockMarketplaceList",

  components: { NewContent, NewBlockMarketplaceListItem, NewBlockMarketplaceCallToAction },

  props: {
    apps: {
      type: Array as () => MarketplaceItemModel[],
      required: true,
    },
    activeCategoryId: {
      type: Number,
      default: 0,
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      nothingFoundText: "Nothing found :(",
      sectionSearch: {
        header: {
          title: "Search results",
        },
      },
      ctaSection: {
        header: {
          title: "Our clouds are ready for your data",
          subtitle: "It's the perfect time to migrate to Hostman!",
        },
      },
    };
  },

  computed: {
    isEmptyQuery() {
      return !this.searchQuery.length;
    },
    title() {
      return this.filteredAppsByQuery.length ? this.sectionSearch.header.title : this.nothingFoundText;
    },
    filteredAppsByQuery() {
      return this.filteredAppsByCategory.filter((el) => el.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    filteredAppsByCategory() {
      return this.activeCategoryId === 0
        ? this.apps
        : this.apps.filter((el) => el.categoryId === this.activeCategoryId);
    },
  },
});
</script>
<style lang="scss" module>
@import "assets/styles/new/mixins";

.header {
  justify-content: space-between;
  @include mobile {
    justify-content: center;
    text-align: center;
  }
}
.sectionSearch {
  display: grid;
  gap: 20px;

  @include desktop {
    gap: 32px;
  }
}
.grid {
  display: grid;
  gap: 12px;

  @include desktop {
    gap: 24px;
    grid-template-columns: repeat(3, minmax(auto, 1fr));
  }
}
.cta {
  grid-row: 4 / 5;

  @include desktop {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
  }
}
</style>
