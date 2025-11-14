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
      <NewPreviewControlPanel />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="topProducts.header" :cards="topProducts.cards" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction :header="ctaSection.header" :tariff="firstVdsTariff" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPartners />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap :header="locationMapSection.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewReviews :has-partners="false" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="bottomProducts.header" :cards="bottomProducts.cards" is-ever-scroll />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="vps-server-hosting" />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import type { CardNew } from "@/types/CardNew";
import { Locations } from "@/types/Locations";
import {
  appsHref,
  databaseHref,
  docsHref,
  docsCloudServersCreateServer,
  docsCloudServersCloudInit,
  docsCloudServersBackups,
} from "@/utils/links/common";

const hrefTitle = "Coming Soon";

export default {
  name: "VPSServerHostingPage",

  components: {
    LazyHydrate,
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockComparison: () => import("@/components/New/Block/Comparison/index.vue"),
    NewBlockMarketplace: () => import("@/components/New/Block/Marketplace/index.vue"),
    NewBlockProducts: () => import("@/components/New/Block/Products/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),
    NewPartners: () => import("@/components/New/Partners/index.vue"),
    NewPreviewControlPanel: () => import("@/components/New/Preview/ControlPanel/index.vue"),
    NewPreviewReviews: () => import("@/components/New/Preview/Reviews/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      breadcrumb: [{ name: "VPS Hosting" }],
      mainSection: {
        header: {
          title: "VPS Hosting",
          subtitle:
            "Deploy your virtual private server in under a minute with Hostman. Our VPS <br/>plans are designed to meet the demands of your growing business, ensuring <br/>you never have to worry about scalability",
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
              title: "200 Mbit Channels <br/>with Unlimited Traffic",
              subtitle:
                "Enjoy seamless connectivity with our 200 Mbit channels, providing unlimited traffic with no overage fees",
            },
          },
          {
            header: {
              title: "24/7 Monitoring <br/>and Support",
              subtitle: "Get support from our experts at any hour – they’re available to help 24/7",
            },
          },
          {
            header: {
              title: "Cost-Effective <br/>Management",
              subtitle:
                "Say goodbye to budget blowouts. Our managed VPS comes with transparent, predictable pricing, eliminating the need for costly in-house management",
            },
          },
        ],
        image: "top-block-page-vps",
      },
      tariffSection: {
        header: {
          title: "Efficient VPS hosting plans",
          subtitle:
            "Our Virtual Private Server solutions deliver top-notch performance with NVMe SSDs and ample RAM <br/>at cost-effective rates, allowing you to expand affordably",
        },
      },
      marketplaceSection: {
        header: {
          title: "Available operating systems, applications, <br/>and setup choices for your VPS",
          subtitle: "Select the desired OS or App and install it in one click",
        },
      },
      topProducts: {
        header: {
          title: "Hostman VPS features",
        },
        cards: [
          {
            icon: "ip",
            header: {
              title: "IP Addresses",
              subtitle:
                "Every server has a dedicated IPv4 address, and you can create more IP addresses to accommodate your expanding network needs",
            },
            href: docsCloudServersCreateServer,
          },
          {
            icon: "devops",
            header: {
              title: "DevOps Features ",
              subtitle:
                "Enhance your deployment process with custom images, cloud-init, and an SSH key manager designed for rapid and effective development operations",
            },
            href: docsCloudServersCloudInit,
          },
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
      ctaSection: {
        header: {
          title: "Explore our starter <br/>VPS solution",
        },
      },
      locationMapSection: {
        header: {
          title: "Available worldwide",
          subtitle: "Select a place is close to you, close to your client, or even across the world",
        },
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
                "Hostman will deploy a database in the cloud that can accommodate everything. Popular DBMSs, from MySQL and Redis to Apache Kafka and OpenSearch, are already in place",
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
            icon: "balancer",
            header: {
              title: "Load Balancer",
              subtitle:
                "Ensure optimal performance and scalability by evenly distributing traffic across multiple servers with our load balancer feature",
            },
            href: docsHref,
          },
          {
            icon: "k8",
            header: {
              title: "Kubernetes",
              subtitle:
                "Automate the management of containerized applications: from deployment and scaling to monitoring and error handling",
            },
            hrefTitle,
          },
          {
            icon: "backup",
            header: {
              title: "Object Storage",
              subtitle:
                "Cutting-edge hardware for cloud solutions: powerful Intel and AMD processors, ultra-fast NVMe disks. <br/>Hostman reserves resources for your",
            },
            hrefTitle,
          },
        ] as CardNew[],
      },

      seoData: {
        title: "VPS Servers by Hostman | Reliable VPS Cloud Server Hosting",
        description:
          "Hostman offers high-performance VPS cloud server hosting solutions. Get the flexibility and power of VPS servers in the cloud with Hostman's reliable and scalable VPS hosting services.",
      } as ProductSeoData,
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "VPS Server",
        description:
          "Hostman offers high-performance VPS cloud server hosting solutions. Get the flexibility and power of VPS servers in the cloud with Hostman's reliable and scalable VPS hosting services.",
        image: "https://hostman.com/img/og/vps.png",
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
      whenVisibleContent: whenVisibleContentWithFullHeader(this.$isMobile),
      whenVisibleOpt,
    };
  },

  head() {
    return this.getPageMeta({
      title: this.seoData.title,
      description: this.seoData.description,
      imageURL: "https://hostman.com/img/og/vps.png",
      ldData: this.ldMicrodata,
    });
  },

  computed: {
    firstVdsTariff() {
      return this.$store.state.servicesTariffs.vdsTariffs.find((tariff: any) => tariff.location === Locations.US);
    },
  },
};
</script>
