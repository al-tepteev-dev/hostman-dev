<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop :breadcrumb="breadcrumb" :header="mainSection.header" :image="mainSection.image" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBanefits
        :header="banefitsBlock.header"
        header-justify="center"
        :cards="banefitsBlock.cards"
        width="996"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockDatabases :header="databasesSection.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" service-page="dbs" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockControlPanel :service="service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="products.header" :cards="products.cards" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction :header="ctaSection.header" :action-title="ctaSection.actionTitle" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="dbaas" :split-col-index="7" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import type { CardNew } from "@/types/CardNew";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { ServiceType } from "@/types/Service";
import { appsHref, databaseHref } from "@/utils/links/common";

const hrefTitleOnHover = "View Plans";

export default {
  name: "DBaaSPage",
  components: {
    LazyHydrate,
    NewBlockBanefits: () => import("@/components/New/Block/Benefits/index.vue"),
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockControlPanel: () => import("@/components/New/Block/ControlPanel/index.vue"),
    NewBlockDatabases: () => import("@/components/New/Block/Databases/index.vue"),
    NewBlockProducts: () => import("@/components/New/Block/Products/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      service: ServiceType.Dbaas,
      breadcrumb: [{ name: "DBaaS: databases as a service" }],
      mainSection: {
        header: {
          title: "DBaaS: Databases As <br/>A Service",
          subtitle: "No administration. No downtime. With hourly billing",
        },
        image: "top-block-page-dbaas",
      },
      banefitsBlock: {
        header: {
          title: "Three top reasons to choose DBaaS from Hostman",
        },
        cards: [
          {
            icon: "balancer",
            header: {
              title: "It's simple",
              subtitle:
                "Working with a database is as easy as using any other service. It is time for system administrators to retire!",
            },
          },
          {
            icon: "risk-down",
            header: {
              title: "It's reliable",
              subtitle:
                "Hostman databases are protected from external and internal security threats. In addition, data can be backed up for extra protection",
            },
          },
          {
            icon: "discount",
            header: {
              title: "It's profitable",
              subtitle:
                "Don't 'bury' your money in complex and expensive solutions. Use DBaaS - and pay only for the resources actually used",
            },
          },
        ],
      },
      databasesSection: {
        header: {
          title: "Work with the Database as a familiar service",
        },
      },
      tariffSection: {
        header: {
          title: "Simple and predictable pricing",
        },
      },
      products: {
        header: {
          title: "What you can add to databases",
        },
        cards: [
          {
            icon: "db",
            header: {
              title: "Cloud servers",
              subtitle:
                "Advanced hardware for cloud solutions: powerful Intel and AMD processors, ultra-fast NVMe disks, Hostman reserves resources for your solutions to keep everything running at maximum speed",
            },
            href: databaseHref,
            hrefTitle: "Starting at $4",
            hrefTitleOnHover,
            hrefType: "button-on-hover",
          },
          {
            icon: "apps",
            header: {
              title: "Apps",
              subtitle:
                "Connect your repository and select a project to deploy — and Hostman will launch it in the cloud in a couple of clicks in the dashboard. All popular frontend and backend frameworks are supported",
            },
            href: appsHref,
            hrefTitle: "Starting at $4",
            hrefTitleOnHover,
            hrefType: "button-on-hover",
          },
          {
            icon: "firewall",
            header: {
              title: "Firewall",
              subtitle: "Multi-level protection against scanning for vulnerabilities from DDoS and cyberattacks",
            },
            hrefTitle: "Coming Soon",
          },
          {
            icon: "network",
            header: {
              title: "Private networks",
              subtitle: "Connect servers into private networks with high data rates and minimal latency",
            },
            hrefTitle: "Coming Soon",
          },
        ] as CardNew[],
      },
      ctaSection: {
        header: {
          title: "Get started in the <br/>Hostman Cloud today",
          subtitle: "Sign up and Receive $100 for Free",
        },
        actionTitle: "Create your account",
      },

      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        brand: "Hostman",
        name: "Cloud Servers",
        description:
          "Create Cloud Server for Your Business ✔ Any of the available distributions ✔ Servers all over the world ✔ Easy scaling ✔ Hostman Cloud servers",
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
          priceValidUntil: "2025-06-14T21:30",
          seller: {
            "@type": "WebSite",
            name: "Executive Objects",
          },
        },
      },
      seoData: {
        title: "DBaaS Service: Simplify Database Management with our Database as a Service Platform",
        description:
          "Explore our DBaaS solution for seamless database deployment, scaling, and security. Get started easily and enjoy robust performance. Your database, our expertise",
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
