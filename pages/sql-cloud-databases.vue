<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop
        :breadcrumb="breadcrumb"
        has-quick-registration
        :header="mainSection.header"
        :features="mainSection.features"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockDatabases
        :cols-desktop="3"
        :header="databasesSection.header"
        :cards="databasesSection.cards"
        width="996"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction
        :header="topCtaSection.header"
        :action-title="topCtaSection.actionTitle"
        :image="topCtaSection.image"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffSection.header" :product-seo-data="seoData" service-page="dbs" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockControlPanel :service="service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewReviews :has-partners="false" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction
        :header="bottomCtaSection.header"
        :action-title="bottomCtaSection.actionTitle"
        :image="bottomCtaSection.image"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockProducts :header="products.header" :cards="products.cards" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPartners />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap :header="mapSection.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewNews :header="newsSection.header" topic="mysql" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq page-name="sql_cloud_databases" :split-col-index="6" />
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
import { DbType } from "@/types/DbType";

const og = "https://hostman.com/img/og/sql-database.png";

export default {
  name: "SQLDatabasePage",

  components: {
    LazyHydrate,
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewBlockControlPanel: () => import("@/components/New/Block/ControlPanel/index.vue"),
    NewBlockDatabases: () => import("@/components/New/Block/Databases/index.vue"),
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
      breadcrumb: [{ name: "SQL Databases" }],
      service: ServiceType.Dbaas,
      mainSection: {
        header: {
          title: "SQL Database <br/>Hosting",
          subtitle: "Our cloud solutions will let you manage your databases easier",
        },
        features: [
          {
            header: {
              title: "Advanced Scalability",
              subtitle:
                "With our SQL cloud databases, you can easily scale your resources up or down to meet your application's demands. This flexibility ensures optimal performance and cost-efficiency, regardless of workload fluctuations",
            },
          },
          {
            header: {
              title: "High Availability",
              subtitle:
                "Our SQL cloud databases are designed to ensure high availability and reliability. We make sure, your database is always online and accessible, thanks to our redundant infrastructure and automatic failover mechanisms",
            },
          },
          {
            header: {
              title: "Simplified Management",
              subtitle:
                "Managing your SQL databases is straightforward with Hostman's intuitive control panel. You can easily configure, monitor, and optimize your databases without needing extensive technical knowledge. Our platform handles routine maintenance tasks, so you don't have to",
            },
          },
          {
            header: {
              title: "Comprehensive Support",
              subtitle:
                "Enjoy 24/7 technical support with Hostman Cloud Database. Our dedicated support team is always available to assist you with any issues or questions, ensuring that your database operations run without interruptions",
            },
          },
        ],
      },
      topCtaSection: {
        header: {
          title: "Get started with Hostman <br/>cloud database platform",
          subtitle: "You'll receive a $100 credit and a 7-day trial to use however <br/>you like",
        },
        actionTitle: "Sign up for free",
        image: "cta-block-page-sql-cloud-databases-top",
      },
      databasesSection: {
        header: {
          title: "SQL Databases for every purpose",
          subtitle: "Secure, scalable, and always online",
        },
        cards: [
          {
            id: DbType.REDIS,
            icon: "dbs/redis",
            header: {
              title: "Redis",
              subtitle:
                "Accelerate with managed Redis. Blazing-fast data handling, zero management overhead — all in your control",
            },
            hoverable: true,
          },
          {
            id: DbType.MYSQL,
            icon: "dbs/mysql",
            header: {
              title: "MySQL",
              subtitle:
                "Streamline app development with our fully managed MySQL environments, designed for optimal performance and scalability",
            },
            hoverable: true,
          },
          {
            id: DbType.MONGODB,
            icon: "dbs/mongo",
            header: {
              title: "MongoDB",
              subtitle:
                "Flexible, dynamic MongoDB management lets you focus on innovation while we handle the data agility your app needs",
            },
            hoverable: true,
          },
          {
            id: DbType.POSTGRES,
            icon: "dbs/psql",
            header: {
              title: "PostgreSQL",
              subtitle:
                "Unlock the power of PostgreSQL. We manage the details: you harness its advanced capabilities for your data-driven solutions",
            },
            hoverable: true,
          },
          {
            id: DbType.RABBITMQ,
            icon: "dbs/rabbit-mq",
            header: {
              title: "RabbitMQ",
              subtitle:
                "Seamless messaging with RabbitMQ. Let us manage the queues while you build responsive, interconnected app features",
            },
            hoverable: true,
          },
          {
            id: DbType.CLICKHOUSE,
            icon: "dbs/clickhouse",
            header: {
              title: "ClickHouse",
              subtitle:
                "Instant analytics with managed ClickHouse. Fast, reliable, and maintenance-free — query at the speed of thought",
            },
            hoverable: true,
          },
        ],
      },
      tariffSection: {
        header: {
          title: "Simple and predictable pricing",
          subtitle:
            "Choose a plan that fits your needs. Our flexible pricing ensures you only pay <br/>for what you use",
        },
      },
      bottomCtaSection: {
        header: {
          title: "Ready to get started?",
          subtitle: "You'll receive a $100 credit and a 7-day trial",
        },
        actionTitle: "Create account",
        image: "cta-block-page-sql-cloud-databases-bottom",
      },
      products: {
        header: {
          title: "Start turning your ideas into solutions <br/>with Hostman products and services",
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
            hrefTitle: "Coming Soon",
          },
          {
            icon: "k8",
            header: {
              title: "Kubernetes",
              subtitle:
                "Just link your repo, pick a project to deploy, and Hostman will have it running in the cloud with just a couple of clicks from the dashboard",
            },
            hrefTitle: "Coming Soon",
          },
        ] as CardNew[],
      },
      mapSection: {
        header: {
          title: "Global network of Hostman data centers",
          subtitle: "Select a place is close to you, close to your client, <br/>or even across the world",
        },
      },
      newsSection: {
        header: {
          title: "Dive deeper into how to utilize our SQL databases",
        },
      },
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Managed Database",
        image: og,
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
          itemCondition: "https://schema.org/UsedCondition",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2025-06-14T21:30",
          seller: {
            "@type": "WebSite",
            name: "Executive Objects",
          },
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
      seoData: {
        title: "SQL Database | Cloud SQL Databases by Hostman",
        description:
          "Explore our cloud server offerings with robust SQL databases. Elevate your data management capabilities effortlessly. Scale, secure, and streamline your operations with our cutting-edge cloud solutions.",
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
