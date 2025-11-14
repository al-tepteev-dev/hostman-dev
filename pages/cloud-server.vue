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
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" service-page="vds" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockMarketplace :header="marketplaceSection.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockComparison />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="topProducts.header" :cards="topProducts.cards" />
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
      <NewBlockProducts :header="bottomProducts.header" :cards="bottomProducts.cards" is-mobile-scroll />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewNews />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="cloud-server" />
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
import { appsHref, databaseHref, docsCloudServersBackups } from "@/utils/links/common";

const hrefTitle = "Coming Soon";
const seoDescription =
  "Create Cloud Server for Your Business ✔ Any of the available distributions ✔ Servers all over the world ✔ Easy scaling ✔ Hostman Cloud servers";

export default {
  name: "CloudServersPage",

  components: {
    LazyHydrate,
    NewBlockComparison: () => import("@/components/New/Block/Comparison/index.vue"),
    NewBlockControlPanel: () => import("@/components/New/Block/ControlPanel/index.vue"),
    NewBlockMarketplace: () => import("@/components/New/Block/Marketplace/index.vue"),
    NewBlockProducts: () => import("@/components/New/Block/Products/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),
    NewPartners: () => import("@/components/New/Partners/index.vue"),
    NewPreviewNews: () => import("@/components/New/Preview/News/index.vue"),
    NewPreviewReviews: () => import("@/components/New/Preview/Reviews/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      breadcrumb: [{ name: "Cloud Servers" }],
      service: ServiceType.Vds,
      ldMicrodata: {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: "Cloud Server",
        image: "https://hostman.com/img/og/cloud-servers.png",
        description:
          "Create Cloud Server for Your Business ✔ Any of the available distributions ✔ Servers all over the world ✔ Easy scaling ✔ Hostman Cloud servers",
        brand: {
          "@type": "Brand",
          name: "Hostman",
        },
        offers: {
          "@type": "Offer",
          url: "https://hostman.com/cloud-server/",
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
      mainSection: {
        header: {
          title: "Scalable Cloud Servers",
          subtitle:
            "$100 free trial credit, prices from $4/ mo, unlimited traffic. <br/>Locations in the US, Europe and Asia",
        },
        features: [
          {
            header: {
              title: "3.3 GHz Processors <br/>and NVMe Disks",
              subtitle:
                "Increase productivity with our 3.3 GHz processors and fast NVMe drives for rapid data handling and smooth performance",
            },
          },
          {
            header: {
              title: "200 Mbit Channels with <br/>Unlimited Traffic",
              subtitle:
                "Enjoy seamless connectivity with our 200 Mbit channels, providing unlimited traffic with no overage fees",
            },
          },
          {
            header: {
              title: "Guaranteed <br/>100% CPU Share",
              subtitle:
                "Enjoy reliable, top-notch performance with a 100% CPU share committed to handling your most demanding tasks",
            },
          },
          {
            header: {
              title: "Free Tech <br/>Support",
              subtitle: "Get support from our experts at any hour – they’re available to help 24/7, no matter the time",
            },
          },
        ],
        image: "top-block-page-cloud-server",
      },
      tariffSection: {
        header: {
          title: "Simple and Predictable Pricing",
        },
      },
      marketplaceSection: {
        header: {
          title: "Deploy any software in seconds",
          subtitle: "Select the desired OS or App and install it in one click",
        },
      },
      topProducts: {
        header: {
          title: "Efficient tools for your convenient work",
        },
        cards: [
          {
            icon: "backup",
            header: {
              title: "Backups, Snapshots",
              subtitle:
                "Protect your data with regular backups and snapshots, ensuring you never lose crucial information",
            },
            href: docsCloudServersBackups,
          },
          {
            icon: "firewall",
            header: {
              title: "Firewall ",
              subtitle:
                "Enhance your security measures with our robust firewall protection, safeguarding your infrastructure against potential threats",
            },
          },
          {
            icon: "balancer",
            header: {
              title: "Load Balancer",
              subtitle:
                "Ensure optimal performance and scalability by evenly distributing traffic across multiple servers with our load balancer feature",
            },
          },
          {
            icon: "network",
            header: {
              title: "Private Networks",
              subtitle:
                "Establish secure and isolated connections between your servers with private networks, shielding sensitive data and enhancing network efficiency",
            },
          },
        ] as CardNew[],
      },
      bottomProducts: {
        header: {
          title: "More cloud services from Hostman",
        },
        cards: [
          {
            icon: "db",
            header: {
              title: "Managed Databases",
              subtitle:
                "Hostman will deploy a database in the cloud that can accommodate everything. Popular DBMSs are already in place, from MySQL and Redis to Apache Kafka and OpenSearch",
            },
            href: databaseHref,
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
                "Cutting-edge hardware for cloud solutions: powerful Intel and AMD processors, ultra-fast NVMe disks",
            },
            hrefTitle,
          },
          {
            icon: "k8",
            header: {
              title: "Kubernetes",
              subtitle:
                "Automate the management of containerized applications, from deployment and scaling to monitoring and error handling",
            },
            hrefTitle,
          },
        ] as CardNew[],
      },
      seoData: {
        title: "Cloud Servers by Hostman - Reliable Cloud Hosting",
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
      imageURL: "https://hostman.com/img/og/cloud-servers.png",
      ldData: this.ldMicrodata,
    });
  },
};
</script>
