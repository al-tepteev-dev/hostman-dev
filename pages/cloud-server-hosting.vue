<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop :breadcrumb="breadcrumb" :header="mainSection.header" :image="mainSection.image" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" service-page="vds" />
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
      <NewBlockMarketplace :header="marketplaceSection.header" />
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
      <NewFaq page-name="cloud-server-hosting" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import type { CardNew } from "@/types/CardNew";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { appsHref, databaseHref } from "@/utils/links/common";

const hrefTitleOnHover = "View Plans";

export default {
  name: "CloudServerHostingPage",

  components: {
    LazyHydrate,
    NewBlockBanefits: () => import("@/components/New/Block/Benefits/index.vue"),
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockMarketplace: () => import("@/components/New/Block/Marketplace/index.vue"),
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
      breadcrumb: [{ name: "Cloud Server Hosting" }],
      mainSection: {
        header: {
          title: "Cloud Server Hosting In <br/>The Way You Need It",
          subtitle: "Rapid Deployment. Multiple solutions. Economy and efficiency <br/>at every step",
        },
        image: "top-block-page-cloud-server",
      },
      tariffSection: {
        header: {
          title: "Simple and Predictable Pricing",
        },
      },
      banefitsBlock: {
        header: {
          title: "Why should you choose Cloud Server <br/>Hosting from Hostman?",
        },
        cards: [
          {
            icon: "cloud",
            header: {
              title: "Cloud server is the easiest",
              subtitle:
                "Create a server and deploy the software? It's a matter of a few minutes - and a few clicks. You can run your solution without devops and admins",
            },
          },
          {
            icon: "bell",
            header: {
              title: "Savings every hour",
              subtitle:
                "Choose the solutions you need at the moment — and pay only for the resources consumed with hourly accuracy",
            },
          },
          {
            icon: "chat-dots",
            header: {
              title: "Under the professional care",
              subtitle:
                "Don't worry about uptime - the Hostman experts will take care of it. We guarantee SLA availability up to 99.9",
            },
          },
        ],
      },
      marketplaceSection: {
        header: {
          title: "Deploy your cloud server <br/>with any of these available distributions",
          subtitle: "Save time by building on the OS that suits your needs",
        },
      },
      products: {
        header: {
          title: "What to add to cloud hosting server",
        },
        cards: [
          {
            icon: "db",
            header: {
              title: "Cloud databases",
              subtitle:
                "Fast and always available databases in the cloud. Store important data (even sensitive data will be protected). And make your solutions even faster!",
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
        name: "Cloud Servers",
        image: "https://hostman.com/img/og/index.png",
        description:
          "Create Cloud Server for Your Business ✔ Any of the available distributions ✔ Servers all over the world ✔ Easy scaling ✔ Hostman Cloud servers",
        brand: {
          "@type": "Brand",
          name: "Hostman",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.9,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 420,
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
        title: "Cloud Server Hosting",
        description:
          "Experience the power of secure and scalable Cloud Server Hosting. Tailored solutions to meet your business needs, ensuring optimal performance.",
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
