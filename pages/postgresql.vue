<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop
        :breadcrumb="breadcrumb"
        :header="mainSection.header"
        :features="mainSection.features"
        image="top-block-page-psql"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs db-type="postgres" :header="tariffSection.header" :product-seo-data="seoData" service-page="dbs" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewReviews />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockControlPanel :service="service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction :header="topCtaSection.header" :action-title="topCtaSection.actionTitle" size-title="h3" />
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
      <NewFaq page-name="postgresql" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import { ProductPages } from "@/types/ProductPage";
import { ServiceType } from "@/types/Service";

const og = "https://hostman.com/img/og/postgresql.png";

const seoDefaultDescription =
  "Discover the benefits of PostgreSQL in the cloud. Robust hosting, easy scaling, and advanced security for your database requirements. Explore our PostgreSQL Cloud services now.";

export default {
  name: "PostgresqlPage",

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
      breadcrumb: [{ name: "PostgreSQL" }],
      service: ServiceType.Dbaas,
      mainSection: {
        header: {
          title: "Cloud Managed <br/>PostgreSQL",
          subtitle: "High performance. Open source. Favorite SQL — in the clouds",
        },
        features: [
          {
            header: {
              title: "Feature-rich",
              subtitle:
                "PostgreSQL is a database with a tremendous amount of features and extensions. You can code for it in SQL, JS, C and C++, Java, Python, PHP, Lua and Ruby",
            },
          },
          {
            header: {
              title: "Object-relational",
              subtitle:
                "This database takes advantage of an object-oriented approach. More features — for convenient work and productivity",
            },
          },
          {
            header: {
              title: "Large Data Volumes",
              subtitle: "With PostgreSQL you can work with data of any size. One table alone can take up to 32 TB",
            },
          },
          {
            header: {
              title: "With a Trusted Hoster",
              subtitle:
                "And all of this — on top notch hardware on a pay-as-you-go model. Hostman's support and user-friendly control panel are already waiting for you",
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
          title: "The high-performance cloud <br/>DBMS — for any solution. <br/>For your solutions!",
        },
        actionTitle: "Start",
      },
      databasesSection: {
        header: {
          title: "Alternative databases — for all your needs",
        },
      },
      bottomCtaSection: {
        header: {
          title: "Powerful cloud DBMS — <br/>for all your tasks of all kinds",
        },
        actionTitle: "Start",
      },
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        brand: "Hostman",
        name: "PostgreSQL Cloud Hosting",
        description: seoDefaultDescription,
        image: og,
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

  computed: {
    seoData(): ProductSeoData {
      return {
        title:
          this.$store.state.productPages?.pages[ProductPages.POSTGRESQL]?.title ||
          "PostgreSQL Cloud Hosting: Flexible and Secure Database Solutions",
        description: seoDefaultDescription,
      };
    },
  },
};
</script>
