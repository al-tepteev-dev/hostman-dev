<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop
        :breadcrumb="breadcrumb"
        :header="mainSection.header"
        :features="mainSection.features"
        image="top-block-page-mysql"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" service-page="dbs" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewReviews />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockControlPanel :service="service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction :header="topCtaSection.header" size-title="h3" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockDatabases :header="databasesSection.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewNews />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction
        :header="bottomCtaSection.header"
        :action-title="bottomCtaSection.actionTitle"
        size-title="h3"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="mysql" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { ServiceType } from "@/types/Service";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";

const seoDescription =
  "Experience the power of MySQL in the cloud. Reliable hosting, seamless scaling, and top-notch security for your database needs. Explore our MySQL Cloud services today.";

const og = "https://hostman.com/img/og/mysql.png";

export default {
  name: "MysqlPage",

  components: {
    LazyHydrate,
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockControlPanel: () => import("@/components/New/Block/ControlPanel/index.vue"),
    NewBlockDatabases: () => import("@/components/New/Block/Databases/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),
    NewPreviewNews: () => import("@/components/New/Preview/News/index.vue"),
    NewPreviewReviews: () => import("@/components/New/Preview/Reviews/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",
  data() {
    return {
      breadcrumb: [{ name: "MySQL" }],
      service: ServiceType.Dbaas,
      mainSection: {
        header: {
          title: "Cloud Managed <br/>MySQL",
          subtitle: "Ready-made clusters. No administration. With an hourly rate",
        },
        features: [
          {
            header: {
              title: "No Downtime",
              subtitle:
                "We provide 99.9% reliability according to SLA. We host servers exclusively in Tier IV data centers that meet all international security standards",
            },
          },
          {
            header: {
              title: "Two-click Launch",
              subtitle:
                "Run the database directly in Hostman's modern control panel. All settings, services and facilities are available directly from the panel",
            },
          },
          {
            header: {
              title: "Saving for Real",
              subtitle:
                "Use the database with hourly billing — and pay only for the services you use. No hidden charges and no imposed services",
            },
          },
          {
            header: {
              title: "Convenient Scaling",
              subtitle:
                "Is the project growing? Connect additional resources. Hostman will provide as much power as your service requires",
            },
          },
        ],
      },
      tariffSection: {
        header: {
          title: "Pricing",
        },
      },
      topCtaSection: {
        header: {
          title:
            "Everything is ready to deploy <br/>your MySQL database to our <br/>cloud — up and running <br/>in seconds!",
        },
      },
      bottomCtaSection: {
        header: {
          title: "Get started in the <br/>Hostman Cloud today",
          subtitle: "Sign up and Receive $100 for Free",
        },
        actionTitle: "Create your account",
      },
      databasesSection: {
        header: {
          title: "Databases for all tastes",
        },
      },
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "MySQL database",
        description: seoDescription,
        image: og,
        brand: {
          "@type": "Brand",
          name: "Hostman",
        },
        aggregateRating: {
          "@type": "aggregateRating",
          ratingValue: 4.9,
          bestRating: 5,
          worstRating: 1,
          reviewCount: 53,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: 4,
          itemCondition: "https://schema.org/UsedCondition",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2025-06-14T21:30",
          seller: {
            "@type": "WebSite",
            name: "Executive Objects",
          },
        },
        review: {
          "@type": "Review",
          reviewBody: "",
          author: { "@type": "Person", name: "Hostman Team" },
        },
      },
      seoData: {
        title: "MySQL Cloud Hosting: Scalable and Secure Database Solutions",
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
      imageURL: og,
      ldData: this.ldMicrodata,
    });
  },
};
</script>
