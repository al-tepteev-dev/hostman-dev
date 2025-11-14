<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop has-quick-registration :header="mainSection.header" :features="mainSection.features" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="products.header" :cards="products.cards" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockComparison />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction :header="ctaSection.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <!--noindex-->
      <NewPreviewReviews />
      <!--/noindex-->
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewControlPanel />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewNews />
    </LazyHydrate>

    <NewFaq :split-col-index="5" />
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { CardNew } from "@/types/CardNew";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import { appsHref, cloudServer, databaseHref } from "@/utils/links/common";

const hrefTitleOnHover = "View Plans";

export default {
  components: {
    LazyHydrate,
    NewBlockComparison: () => import("@/components/New/Block/Comparison/index.vue"),
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewBlockProducts: () => import("@/components/New/Block/Products/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),
    NewPreviewControlPanel: () => import("@/components/New/Preview/ControlPanel/index.vue"),
    NewPreviewNews: () => import("@/components/New/Preview/News/index.vue"),
    NewPreviewReviews: () => import("@/components/New/Preview/Reviews/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      mainSection: {
        header: {
          title: "Cloud Service Provider <br/>for Developers and Teams",
          subtitle:
            "Sign up today and receive $100 for a 7-day trial. You won’t be charged for <br/>this trial unless you choose to upgrade to a paid account",
        },
        features: [
          {
            header: {
              title: "99.9% Uptime",
              subtitle: "Our cloud service provides the ultimate in server dependability and stability",
            },
          },
          {
            header: {
              title: "Money-back Guarantee",
              subtitle:
                "Experience our high-speed cloud services without any risk, assured by our money-back guarantee",
            },
          },
          {
            header: {
              title: "Easy to Deploy",
              subtitle:
                "Manage your services with ease using our intuitive control panel, where deploying software is a matter of minutes",
            },
          },
          {
            header: {
              title: "Reliable and Available",
              subtitle:
                "Select from 6 datacenter regions around the world based on latency or deploy across regions for redundancy",
            },
          },
        ],
      },
      products: {
        header: {
          title: "Robust cloud services for every demand",
        },
        cards: [
          {
            icon: "cloud",
            header: {
              title: "Cloud Servers",
              subtitle:
                "Cutting-edge hardware for cloud solutions: powerful Intel and AMD processors, ultra-fast NVMe disks",
            },
            href: cloudServer,
            hrefTitle: "Starting at $4",
            hrefTitleOnHover,
            hrefType: "button-on-hover",
          },
          {
            icon: "db",
            header: {
              title: "Databases",
              subtitle:
                "We provide a cloud database ready to store everything you have. The best DBMSs are on deck: MySQL, Redis, Kafka, and more",
            },
            href: databaseHref,
            hrefTitle: "Starting at $4",
            hrefTitleOnHover,
            hrefType: "button-on-hover",
          },
          {
            icon: "apps",
            header: {
              title: "App Platform",
              subtitle:
                "Just link your repo, pick a project to deploy, and Hostman will have it running in the cloud with just a couple of clicks from the dashboard",
            },
            href: appsHref,
            hrefTitle: "Starting at $1",
            hrefTitleOnHover,
            hrefType: "button-on-hover",
          },
          {
            icon: "cloud-shield",
            header: {
              title: "Firewall",
              subtitle: "Multi-layered protection from vulnerability scanning, DDoS, and cyber-attacks",
            },
            hrefTitle: "Coming Soon",
          },
          {
            icon: "k8",
            header: {
              title: "Kubernetes",
              subtitle:
                "Automate the management of containerized applications, from deployment and scaling to monitoring and error handling",
            },
            hrefTitle: "Coming Soon",
          },
          {
            icon: "s3",
            header: {
              title: "S3 Storage",
              subtitle: "A universal object storage compatible with the Amazon S3 protocol",
            },
            hrefTitle: "Coming Soon",
          },
          {
            icon: "backup",
            header: {
              title: "Managed Backups",
              subtitle:
                "Our server and application backup feature allows for both on-demand and scheduled backup and one-click data restoration",
            },
            hrefTitle: "It's Free!",
          },
          {
            icon: "image",
            header: {
              title: "Images",
              subtitle: "Create images for backup free of charge or deploy your own in the Hostman cloud",
            },
            hrefTitle: "It's Free!",
          },
        ] as CardNew[],
      },
      news: {
        header: {
          title: "Latest News",
        },
      },
      ctaSection: {
        header: {
          title: "Get started for free",
          subtitle: "Sign up today and receive $100 for a 7-day trial",
        },
      },
      whenVisibleContent: whenVisibleContentWithFullHeader(this.$isMobile),
      whenVisibleOpt,
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Cloud Service Provider",
        alternateName: "Hostman Cloud Service Provider",
        url: "https://hostman.com",
        image: "https://hostman.com/img/og/index.png",
        description:
          "Hostman is a Cloud Managed Service Provider. Our cloud computing solutions are renowned for their user-friendly experience and round-the-clock support. Discover the simplicity of our services and the peace of mind that comes with 24/7 assistance.",
        brand: {
          "@type": "Brand",
          name: "Hostman",
        },
        offers: {
          "@type": "Offer",
          url: "https://hostman.com",
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
          author: {
            "@type": "Person",
            name: "Hostman team",
          },
        },
      },
    };
  },

  head() {
    return this.getPageMeta({
      title: "Hostman - Cloud Service Provider with a Global Cloud Infrastructure",
      description:
        "Hostman is a Cloud Managed Service Provider. Our cloud computing solutions are renowned for their user-friendly experience and round-the-clock support. Discover the simplicity of our services and the peace of mind that comes with 24/7 assistance.",
      imageURL: "https://hostman.com/img/og/index.png",
      ldData: this.ldMicrodata,
    });
  },
};
</script>
