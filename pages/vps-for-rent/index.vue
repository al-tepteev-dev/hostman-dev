<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop :breadcrumb="breadcrumb" :header="mainSection.header">
        <template #bottom>
          <NewPartners />
        </template>
      </NewBlockTop>
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" service-page="vds" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBenefits :header="benefitsSection.header" :cards="benefitsSection.cards" :cols="4" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction :header="сtaSection.header" size-title="h3" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockControlPanel :service="service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewReviews :has-partners="false" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="vps-for-rent" :split-col-index="6" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import { ServiceType } from "@/types/Service";

const seoDescription =
  "Explore our VPS hosting services tailored to suit your business requirements. Rent a Virtual Private Server (VPS) with customizable resources and reliable performance for your projects.";

export default {
  name: "VpsForRentPage",
  components: {
    LazyHydrate,
    NewBlockBenefits: () => import("@/components/New/Block/Benefits/index.vue"),
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockControlPanel: () => import("@/components/New/Block/ControlPanel/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),
    NewPartners: () => import("@/components/New/Partners/index.vue"),
    NewPreviewReviews: () => import("@/components/New/Preview/Reviews/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      breadcrumb: [{ name: "VPS For Rent" }],
      service: ServiceType.Vds,
      mainSection: {
        header: {
          title: "Rent VPS: Power Your Projects <br/>with Our Flexible Hosting <br/>Solutions",
          subtitle:
            "Discover the flexibility and power of VPS hosting tailored to your needs. <br/>Whether you're a startup or an enterprise, our customizable solutions offer <br/>performance, reliability, and scalability. Get started today!",
        },
      },
      tariffSection: {
        header: {
          title: "Affordable VPS Hosting Plan",
        },
      },
      benefitsSection: {
        header: {
          title: "Uncompromising cloud infrastructure for your projects",
        },
        cards: [
          {
            header: {
              title: "Optimal Geographic Coverage",
              subtitle:
                "Hostman servers span across the USA, the Netherlands, and Poland, with expansion plans underway for Singapore, the Middle East, and Africa",
            },
          },
          {
            header: {
              title: "Cutting-Edge Hardware",
              subtitle:
                "Our servers boast modern hardware, featuring Intel Xeon Gold and Platinum processors, high-frequency Intel i9-12900K, and AMD EPYC 7763 chips, coupled with ultra-fast NVMe disks",
            },
          },
          {
            header: {
              title: "Flexible Spending Options",
              subtitle:
                "With Hostman, you only pay for the resources you require and utilize. Our tariffs can easily adjust to match your evolving workload demands",
            },
          },
          {
            header: {
              title: "Scalable Power",
              subtitle:
                "In just a few clicks, you can effortlessly scale up your server's processor cores, memory capacity, or data transfer speed to meet your specific needs",
            },
          },
        ] as CardNew[],
      },
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        brand: "Hostman",
        name: "VPS For Rent: Flexible Hosting Solutions for Your Business Needs",
        description: seoDescription,
        image: "https://hostman.com/img/og/index.png",
        aggregateRating: {
          "@type": "aggregateRating",
          ratingValue: "4.9",
          reviewCount: "53",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: 4,
          itemCondition: "https://schema.org/UsedCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "WebSite",
            name: "Executive Objects",
          },
        },
      },
      сtaSection: {
        header: {
          title: "Hostman - Your Gateway to the <br/>Realm of Cloud Technologies",
          subtitle:
            "Affordable hourly rates, robust servers, round-the-clock <br/>friendly support, top-notch data protection, and the most <br/>intuitive control panel available",
        },
      },
      seoData: {
        title: "VPS For Rent: Flexible Hosting Solutions for Your Business Needs",
        description: seoDescription,
      } as ProductSeoData,
      whenVisibleContent: whenVisibleContentWithFullHeader(this.$isMobile),
      whenVisibleOpt,
    };
  },
  head() {
    return this.getPageMeta({
      title: this.seoData.title,
      description: this.seoData.description,
      ldData: this.ldMicrodata,
    });
  },
};
</script>
