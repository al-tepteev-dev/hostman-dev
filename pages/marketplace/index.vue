<template>
  <main class="layout-content">
    <NewContent>
      <section :class="$style.grid">
        <section :class="$style.mobileHidden">
          <LazyHydrate when-idle="when-idle">
            <ListToggle v-model="activeCategoryId" :list="categories" />
          </LazyHydrate>
        </section>

        <section :class="$style.colRight">
          <LazyHydrate when-idle="when-idle">
            <NewBlockTop
              v-model="searchQuery"
              :breadcrumb="breadcrumb"
              content-width="497"
              :header="mainSection.header"
              :has-mobile-image="false"
              has-search
              :image="mainSection.image"
              :is-overflow-hidden="false"
              :options="categories"
              :paddings-size="paddingsSize"
              :with-content="false"
            >
              <template #select>
                <NewSelect
                  v-model="activeCategoryId"
                  bg-secondary
                  :class="$style.desktopHidden"
                  :options="categories"
                  option-key="id"
                  option-title="name"
                />
              </template>
            </NewBlockTop>
          </LazyHydrate>
          <LazyHydrate :when-visible="whenVisibleOpt">
            <NewLoader v-if="isLoading" />
            <NewBlockMarketplaceList
              v-else
              :apps="apps"
              :active-category-id="activeCategoryId"
              :search-query="searchQuery"
            />
          </LazyHydrate>
        </section>
      </section>
    </NewContent>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { whenVisibleOpt } from "@/utils/lazyHydrate";

export default {
  name: "MarketplacePage",

  components: {
    LazyHydrate,
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewBlockMarketplaceList: () => import("@/components/New/Block/Marketplace/List/index.vue"),
    NewContent: () => import("@/components/New/Content/index.vue"),
    ListToggle: () => import("@/elements/New/List/Toggle/index.vue"),
    NewSelect: () => import("@/elements/New/Select/index.vue"),
    NewLoader: () => import("@/elements/New/Loader/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      isLoading: true,
      activeCategoryId: 0,
      searchQuery: "",
      breadcrumb: [{ name: "Marketplace" }],
      mainSection: {
        header: {
          title: "One cloud platform <br/>to deploy all solutions",
        },
        image: "top-block-page-marketplace",
      },
      seoData: {
        title: "Hostman Marketplace App | Diverse Selection of Online Marketplace Apps",
        description:
          "The Hostman Marketplace App for seamless one-click access to a wide array of app platform solutions, designed to enhance your business efficiency and scalability. Unlock new possibilities with Hostman's app platform offerings today.",
      } as ProductSeoData,
      whenVisibleOpt,
    };
  },

  async fetch() {
    await Promise.all([
      this.$store.dispatch("fetchMarketplaceApps"),
      this.$store.dispatch("fetchMarketplaceCategories"),
    ]);
    this.isLoading = false;
  },

  head() {
    return this.getPageMeta({
      title: this.seoData.title,
      description: this.seoData.description,
    });
  },

  computed: {
    apps() {
      return this.$store.state.marketplaceApps;
    },
    categories() {
      const allSelect = {
        id: 0,
        name: "All solutions",
        slug: "all-solutions",
      };

      const categories = [allSelect].concat(this.$store.state.marketplaceCategories);
      return categories;
    },
    isMobile() {
      return this.$isMobile;
    },
    paddingsSize() {
      return this.isMobile ? "std" : "compact";
    },
  },
};
</script>
<style lang="scss" module>
@import "assets/styles/new/mixins";

.grid {
  display: grid;
  gap: 24px;

  @include desktop {
    grid-template-columns: 198px 1fr;
  }
  .mobileHidden {
    @include mobile {
      display: none;
    }
  }
  .desktopHidden {
    @include desktop {
      display: none;
    }
  }
}
.colRight {
  padding: 0px;
  display: grid;
  gap: 56px;

  @include desktop {
    gap: 64px;
  }
}
</style>
