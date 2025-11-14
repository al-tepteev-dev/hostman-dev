<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop
        has-quick-registration
        :breadcrumb="breadcrumb"
        :header="mainSection.header"
        image="top-block-page-apps"
        redirect-url="/apps/create"
      >
        <template #bottom>
          <NewPartners />
        </template>
      </NewBlockTop>
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" :service-page="appType" is-apps-page />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBenefits
        data-test-id="about-advantages-container"
        :header="topBenefits.header"
        :cards="topBenefits.cards"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockMarketplace :header="marketplaceSection.header" :initial-tab="initialTab" service-page="app" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBenefits
        data-test-id="why-hostman-container"
        :header="bottomBenefits.header"
        :cards="bottomBenefits.cards"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockControlPanel :service="service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="products.header" :cards="products.cards" is-mobile-scroll />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction
        data-test-id="get-start-hostman-container"
        :header="сtaSection.header"
        :action-title="сtaSection.actionTitle"
        size-title="h3"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="app-platform" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import { cloudServer, docsCloudServersCreateServer, databaseHref } from "@/utils/links/common";
import type { CardNew } from "@/types/CardNew";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { ServiceType } from "@/types/Service";
import { whenVisibleOpt } from "@/utils/lazyHydrate";

const seoDescription =
  "Discover the ultimate app platform as a service (PaaS) solution for seamless deployment and management of cloud apps. Explore our comprehensive services for deploying, scaling, and managing applications effortlessly. Leverage the power of our cloud app platform and take your business to new heights.";

export default {
  name: "AppsPage",

  components: {
    LazyHydrate,
    NewBlockBenefits: () => import("@/components/New/Block/Benefits/index.vue"),
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockControlPanel: () => import("@/components/New/Block/ControlPanel/index.vue"),
    NewBlockMarketplace: () => import("@/components/New/Block/Marketplace/index.vue"),
    NewBlockProducts: () => import("@/components/New/Block/Products/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewPartners: () => import("@/components/New/Partners/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      breadcrumb: [{ name: "App Platform" }],
      service: ServiceType.Dbaas,
      appType: "",
      initialTab: 0,
      mainSection: {
        header: {
          title: "Cloud App Platform <br/>As a Service",
          subtitle: "Fast deployment. Easy management. Resources as needed",
        },
      },
      tariffSection: {
        header: {
          title: "Pricing",
        },
      },
      topBenefits: {
        header: {
          title: "Everything that development teams need",
        },
        cards: [
          {
            icon: "cloud-upload",
            header: {
              title: "Fast Project Deployment",
              subtitle:
                "Code is delivered from the repository and deployed in a matter of seconds - with just one push",
            },
          },
          {
            icon: "refresh",
            header: {
              title: "Automatic Code Updates",
              subtitle:
                "Update your application code as needed - the service will automatically pull all changes to production",
            },
          },
          {
            icon: "rollback",
            header: {
              title: "One-tap Rollback to Any Version",
              subtitle:
                "Forget about Git commands for rolling back to previous releases. Simply select the desired commit and press a button",
            },
          },
        ] as CardNew[],
      },
      marketplaceSection: {
        header: {
          title: "A single Cloud App Platform solution for all your needs",
          subtitle: "Hostman supports all popular development environments and programming languages",
        },
      },
      bottomBenefits: {
        header: {
          title: "Why is it necessary to choose a Hostman",
        },
        cards: [
          {
            icon: "scalability",
            header: {
              title: "Scalability and Cost Control",
              subtitle:
                "Scale your resources as your projects grow - Hostman helps you gain more power while saving costs",
            },
          },
          {
            icon: "check-circle",
            header: {
              title: "Adjacent Services at Your Fingertips",
              subtitle:
                "Hostman has everything you need for your infrastructure, including servers, databases, and load balancers - for any type of application",
            },
          },
          {
            icon: "drive",
            header: {
              title: "Top-notch Hardware Under the Hood",
              subtitle:
                "Modern server processors like Intel Xeon Gold and Platinum, high-frequency Intel i9-12900K, and AMD EPYC 7763. Plus, lightning-fast NVMe disks",
            },
          },
        ] as CardNew[],
      },
      products: {
        header: {
          title: "What to add to the PaaS solution from Hostman",
        },
        cards: [
          {
            icon: "db",
            header: {
              title: "Managed Databases",
              subtitle:
                "Hostman deploys cloud databases that can handle any workload. Popular database management systems (DBMS) are readily available, including MySQL, Redis, Apache Kafka, and OpenSearch",
            },
            href: databaseHref,
          },
          {
            icon: "balancer",
            header: {
              title: "Load Balancer",
              subtitle:
                "Hostman provides load balancing capabilities to efficiently distribute traffic across servers, ensuring smooth performance for your projects without slowdowns",
            },
          },
          {
            icon: "cloud",
            header: {
              title: "VDS+DВaaS",
              subtitle:
                "Launch a cloud server with managed cloud databases to ensure constant availability and faster performance for your projects",
            },
            href: cloudServer,
          },
          {
            icon: "network",
            header: {
              title: "Private Networks",
              subtitle:
                "Create high-speed virtual private networks featuring unlimited internal traffic for enhanced security and performance",
            },
            href: docsCloudServersCreateServer,
          },
        ] as CardNew[],
      },
      сtaSection: {
        header: {
          title: "Get started in the <br/>Hostman Cloud today",
          subtitle: "Sign up and Receive $100 for Free",
        },
        actionTitle: "Create your account",
      },
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Apps",
        description: seoDescription,
        image: "https://hostman.com/img/og/index.png",
        brand: {
          "@type": "Brand",
          name: "Hostman",
        },
        offers: {
          "@type": "Offer",
          url: "https://hostman.com/paas/",
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
          author: { "@type": "Person", name: "Hostman Team" },
        },
      },
      seoData: {
        title: "Secure and Efficient App Platform with PaaS Solutions | Hostman",
        description: seoDescription,
      } as ProductSeoData,
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

  watch: {
    "$route.query.type"(val) {
      this.initType(val);
    },
  },

  created() {
    this.initType(this.$route.query?.type);
  },

  methods: {
    initType(val: string) {
      this.appType = val || "backend";
      this.initialTab = val === "frontend" ? 0 : 1;
    },
  },
};
</script>
