<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop
        :breadcrumb="breadcrumb"
        :header="mainSection.header"
        :features="mainSection.features"
        :image="mainSection.image"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockDatabases />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" service-page="dbs" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPartners />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockControlPanel :service="service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewReviews :has-partners="false" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="products.header" :cards="products.cards" is-mobile-scroll />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewNews />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="dbaas" :split-col-index="7" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { CardNew } from "@/types/CardNew";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { ServiceType } from "@/types/Service";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import { appsHref, cloudServer } from "@/utils/links/common";

const hrefTitle = "Coming Soon";

export default {
  name: "ManegedDatabasePage",

  components: {
    LazyHydrate,
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewBlockDatabases: () => import("@/components/New/Block/Databases/index.vue"),
    NewPartners: () => import("@/components/New/Partners/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
    NewBlockControlPanel: () => import("@/components/New/Block/ControlPanel/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),
    NewPreviewNews: () => import("@/components/New/Preview/News/index.vue"),
    NewBlockProducts: () => import("@/components/New/Block/Products/index.vue"),
    NewPreviewReviews: () => import("@/components/New/Preview/Reviews/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      breadcrumb: [{ name: "Databases" }],
      service: ServiceType.Dbaas,
      mainSection: {
        header: {
          title: "Affordable Managed </br>Database Hosting",
          subtitle: "Set up a managed cloud database in minutes, with free backups <br/>included",
        },
        features: [
          {
            header: {
              title: "Secure Data Encryption",
              subtitle:
                "Lock down your data with cutting-edge encryption both in transit and at rest. Our security protocols are constantly updated and patched by industry experts, so you can rest easy knowing your data is in safe hands",
            },
          },
          {
            header: {
              title: "Effortless Scaling",
              subtitle:
                "Your business is unique, and your database should be too. Choose from numerous environments like MySQL, PostgreSQL, Redis, and beyond, all customized for your project’s needs",
            },
          },
          {
            header: {
              title: "24/7 Support",
              subtitle:
                "With our 24/7 monitoring,  we ensure your database is always up, performing optimally, and supported by specialists who are ready whenever you need them",
            },
          },
          {
            header: {
              title: "Cost-Effective Management",
              subtitle:
                "Say goodbye to budget blowouts. Our managed databases come with transparent, predictable pricing, eliminating the need for costly in-house management. Invest in your growth, not unexpected expenses",
            },
          },
        ],
        image: "top-block-page-dbaas",
      },
      tariffSection: {
        header: {
          title: "Simple and predictable pricing",
        },
      },
      products: {
        header: {
          title: "More cloud services from Hostman",
        },
        cards: [
          {
            icon: "cloud",
            header: {
              title: "Cloud Servers",
              subtitle:
                "Hostman's cloud servers deliver scalable, secure, and efficient performance for all workloads. Designed for optimal uptime and growth; deploy effortlessly and expand as needed",
            },
            href: cloudServer,
          },
          {
            icon: "apps",
            header: {
              title: "Apps",
              subtitle:
                "Apps is a cloud service that automatically pulls code from repositories and deploys applications on Hostman servers. It supports popular frameworks and connects with GitHub, GitLab, or Bitbucket repositories",
            },
            href: appsHref,
          },
          {
            icon: "backup",
            header: {
              title: "Object Storage",
              subtitle:
                "Cutting-edge hardware for cloud solutions: powerful Intel and AMD processors, ultra-fast NVMe disks. Hostman reserves resources for your",
            },
            hrefTitle,
          },
          {
            icon: "k8",
            header: {
              title: "Kubernetes",
              subtitle:
                "Just link your repo, pick a project to deploy, and Hostman will have it running in the cloud with just a couple of clicks from the dashboard",
            },
            hrefTitle,
          },
        ] as CardNew[],
      },
      seoData: {
        title: "Hostman - Managed Databases | Database Server Hosting",
        description:
          "Hostman offers high-performance managed databases, delivering reliable database solutions in the cloud. Explore our database server hosting services and experience seamless management with Hostman.",
      } as ProductSeoData,
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Managed Database",
        image: "https://hostman.com/img/og/dbaas.png",
        description:
          "Hostman offers high-performance managed databases, delivering reliable database solutions in the cloud. Explore our database server hosting services and experience seamless management with Hostman.",
        brand: {
          "@type": "Organization",
          name: "Hostman",
        },
        offers: {
          "@type": "Offer",
          url: "https://hostman.com/managed-database/",
          priceCurrency: "USD",
          price: 4,
          availability: "https://schema.org/InStock",
          priceValidUntil: "2025-06-14T21:30",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.9,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 420,
        },
        review: {
          "@type": "Review",
          reviewBody: "",
          author: { "@type": "Person", name: "Hostman team" },
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
      imageURL: "https://hostman.com/img/og/dbaas.png",
      ldData: this.ldMicrodata,
    });
  },
};
</script>
