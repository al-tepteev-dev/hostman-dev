<template>
  <NewContentScrollCard
    v-if="$isMobile"
    data-test-id="marketplace-db-container"
    :header="header"
    :cards="dbs"
    @click-card="onDbClick"
  />

  <NewContent
    v-else
    :class="$style.core"
    data-test-id="marketplace-db-container"
    :header="header"
    header-justify="center"
    :width="$attrs['width']"
  >
    <NewCardGrid
      :cards="dbs"
      :cols-desktop="$attrs['cols-desktop']"
      :class-grid="$style.grid"
      size-title="h3"
      @click-card="onDbClick"
    />
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewCardGrid from "@/elements/New/Card/Grid/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewContentScrollCard from "@/components/New/Content/Scroll/Cards/index.vue";
import type { CardNew } from "@/types/CardNew";
import type { Header } from "@/types/Header";
import { dbaasHref, mysqlHref, psqlHref } from "@/utils/links/common";
import { DbType } from "@/types/DbType";

export default Vue.extend({
  name: "NewBlockDatabases",

  components: { NewCardGrid, NewContent, NewContentScrollCard },

  props: {
    header: {
      type: Object as () => Header,
      default: () => ({
        title: "Optimized managed database solutions",
        subtitle: "Secure, scalable, and always online",
      }),
    },
    cards: {
      type: [] as CardNew[],
      default: () => [],
    },
  },

  computed: {
    isRelatedSqlHref() {
      const sqlHrefs = [dbaasHref, mysqlHref, psqlHref];
      return sqlHrefs.includes(this.$route.path);
    },
    dbs() {
      return this.cards.length
        ? this.cards
        : ([
            {
              id: DbType.MYSQL,
              icon: "dbs/mysql",
              header: {
                title: "MySQL",
                subtitle: this.isRelatedSqlHref
                  ? "The most popular relational database management system from Oracle. Developed under an open-source model"
                  : "Streamline app development with our fully managed MySQL environments, designed for optimal performance and scalability",
              },
              hoverable: true,
            },
            {
              id: DbType.POSTGRES,
              icon: "dbs/psql",
              header: {
                title: "PostgreSQL",
                subtitle: this.isRelatedSqlHref
                  ? "An object-relational database management system. Supported by most UNIX platforms"
                  : "Unlock the power of PostgreSQL. We manage the details: you harness its advanced capabilities for your data-driven solutions",
              },
              hoverable: true,
            },
            {
              id: DbType.REDIS,
              icon: "dbs/redis",
              header: {
                title: "Redis",
                subtitle: this.isRelatedSqlHref
                  ? "A high-performance database that operates on a 'key-value model'. Often used for caching"
                  : "Accelerate with managed Redis. Blazing-fast data handling, zero management overhead — all in your control",
              },
              hoverable: true,
            },
            {
              id: DbType.MONGODB,
              icon: "dbs/mongo",
              header: {
                title: "MongoDB",
                subtitle: this.isRelatedSqlHref
                  ? "A classic database management system oriented towards document storage and supporting JSON queries"
                  : "Flexible, dynamic MongoDB management lets you focus on innovation while we handle the data agility your app needs",
              },
              hoverable: true,
            },
            {
              id: DbType.OPENSEARCH,
              icon: "dbs/open-search",
              header: {
                title: "OpenSearch",
                subtitle: this.isRelatedSqlHref
                  ? "A system of search and analytics resources for monitoring applications and event logs"
                  : "Managed OpenSearch powers your insights. We handle the complexity, you enjoy lightning-fast, scalable search capabilities",
              },
              hoverable: true,
            },
            {
              id: DbType.CLICKHOUSE,
              icon: "dbs/clickhouse",
              header: {
                title: "ClickHouse",
                subtitle: this.isRelatedSqlHref
                  ? "A columnar analytical database. Supports queries to a large array of structured data in real-time mode"
                  : "Instant analytics with managed ClickHouse. Fast, reliable, and maintenance-free — query at the speed of thought",
              },
              hoverable: true,
            },
            {
              id: DbType.KAFKA,
              icon: "dbs/kafka",
              header: {
                title: "Kafka",
                subtitle: this.isRelatedSqlHref
                  ? "An open-source messaging system. Known for its high speed and low latency"
                  : "Effortless data streaming with Kafka. Our management means reliable, scalable, real-time processing for your applications",
              },
              hoverable: true,
            },
            {
              id: DbType.RABBITMQ,
              icon: "dbs/rabbit-mq",
              header: {
                title: "RabbitMQ",
                subtitle: this.isRelatedSqlHref
                  ? "A messaging system based on the AMQP standard"
                  : "Seamless messaging with RabbitMQ. Let us manage the queues while you build responsive, interconnected app features",
              },
              hoverable: true,
            },
          ] as CardNew[]);
    },
  },

  methods: {
    getDbRedirect(id: string) {
      return `/database/create?type=${id}`;
    },
    onDbClick(_event: MouseEvent, id: string) {
      this.$store.commit("modal/openSignUpModal", {
        redirectUrl: this.getDbRedirect(id),
      });
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.grid {
  @include mobile {
    gap: 8px !important;
  }
}
</style>
