<template>
  <main class="layout-content">
    <section :class="$style.pricingContent">
      <BreadCrumbs :class="$style.breadcrumbs" :items="breadcrumbs" is-header />

      <LazyHydrate :when-visible="whenVisibleOpt">
        <NewTariffs
          :header="tariffSection.header"
          :product-seo-data="seoData"
          service-page="vds"
          is-pricing-page
          size-title="h1"
        />
      </LazyHydrate>
    </section>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import { whenVisibleOpt } from "@/utils/lazyHydrate";
import type { ProductSeoData } from "@/types/ProductSeoData";

export default {
  name: "PricingPage",

  components: { BreadCrumbs, LazyHydrate, NewTariffs: () => import("@/components/New/Tariffs/index.vue") },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      breadcrumbs: [
        { name: "Hostman", path: "/" },
        { name: "Pricing", path: this.$route.path },
      ],
      tariffSection: {
        header: {
          title: "Pricing",
          subtitle: "We offer pay-as-you-go for all cloud services. You only pay for the time you actually use them",
        },
      },
      seoData: {
        title: "Hostman Cloud Service Pricing Overview | Clear Cloud Computing Costs",
        description:
          "Hostman offers detailed information on Cloud Computing Costs and Cloud Service pricing. It emphasizes transparency, enabling businesses to make well-informed decisions by selecting the pricing plan that best suits their budget and requirements.",
      } as ProductSeoData,
      whenVisibleOpt,
    };
  },
  head() {
    return this.getPageMeta({
      title: this.seoData.title,
      description: this.seoData.description,
    });
  },
};
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.breadcrumbs {
  height: 0;
  margin: 0;
  visibility: hidden;
}
.pricingContent {
  margin-top: 40px;

  @include desktop {
    margin-top: 80px;
  }
}
</style>
