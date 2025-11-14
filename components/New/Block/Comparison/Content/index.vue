<template>
  <section :class="$style.core">
    <div itemprop="offers" itemtype="https://schema.org/AggregateOffer" itemScope="itemscope">
      <meta itemprop="priceCurrency" content="USD" />
      <meta itemprop="lowPrice" :content="seoTariffData.lowPrice" />
      <meta itemprop="highPrice" :content="seoTariffData.highPrice" />
      <meta itemprop="offerCount" :content="seoTariffData.offerCount" />
    </div>

    <div :class="$style.scrollWrapperTable">
      <div :class="$style.tableWrapper">
        <div :class="$style.compareTable">
          <NewCard>
            <section :class="$style.content">
              <div v-for="(item, idx) in rows" :key="idx">
                <NewBlockComparisonRow :item="item" />
                <div v-if="idx < rows.length - 1" :class="$style.divider" />
              </div>
            </section>
          </NewCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import NewBlockComparisonRow, { ComparisonRow } from "@/components/New/Block/Comparison/Row/index.vue";
import NewCard from "@/elements/New/Card/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import type { TariffResponseVds } from "@/types/Tariff";
import { IP_PRICE } from "@/utils/constants";

type TariffParams = {
  cpu: number;
  ram: number;
  disk: number;
};

export default Vue.extend({
  name: "NewBlockComparisonContent",

  components: { NewBlockComparisonRow, NewCard, NewContent },

  props: {
    currentTab: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState("servicesTariffs", ["vdsTariffs"]),
    nyTariffs(): TariffResponseVds[] {
      return this.vdsTariffs.filter((tariff: any) => tariff.tags.includes("nyc_nvme"));
    },
    seoTariffData() {
      const count = this.vdsTariffs.length;

      return {
        offerCount: count,
        lowPrice: this.vdsTariffs[0].price,
        highPrice: this.vdsTariffs[count - 1].price,
      };
    },
    rows(): ComparisonRow[] {
      const params = this.getTariffParams();

      return [
        {
          isHead: true,
          header: {
            title: `${params.cpu} CPU, ${params.ram} GB RAM, ${params.disk} GB SSD`,
            subtitle: "Configuration",
          },
          providers: [
            {
              icon: "providers/hostman",
              text: "Hostman",
            },
            {
              icon: "providers/digital-ocean",
              text: "DigitalOcean",
            },
            {
              icon: "providers/google-cloud",
              text: "Google Cloud",
            },
            {
              icon: "providers/aws",
              text: "AWS",
            },
            {
              icon: "providers/vultr",
              text: "Vultr",
            },
          ],
        },
        {
          header: {
            title: "Price",
          },
          providers: [
            {
              text: this.getProviderPrice(this.currentTab, "hostman", params),
            },
            {
              text: this.getProviderPrice(this.currentTab, "do", params),
            },
            {
              text: this.getProviderPrice(this.currentTab, "gc", params),
            },
            {
              text: this.getProviderPrice(this.currentTab, "aws", params),
            },
            {
              text: this.getProviderPrice(this.currentTab, "vultr", params),
            },
          ],
        },
        {
          header: {
            title: "Tech support",
          },
          providers: [
            {
              text: "Free",
            },
            {
              text: "$24/mo",
            },
            {
              text: "$29/mo + 3% of <br/>monthly charges",
            },
            {
              text: "$29/mo or 3% of <br/>monthly charges",
            },
            {
              text: "Free",
            },
          ],
        },
        {
          header: {
            title: "Backups",
          },
          providers: [
            {
              text: "from $0.07/GB",
            },
            {
              text: "20% or 30% higher <br/>base daily/weekly fee",
            },
            {
              text: "$0.03/GB per mo",
            },
            {
              text: "$0.05/GB per mo",
            },
            {
              text: "20% higher base <br/>monthly/hourly fee",
            },
          ],
        },
        {
          header: {
            title: "Bandwidth",
          },
          providers: [
            {
              text: "Free",
            },
            {
              text: "$0.01 per GB",
            },
            {
              text: "$0.01 per GB",
            },
            {
              text: "$0.09/GB first <br/>10 TB / mo",
            },
            {
              text: "$0.01 per GB",
            },
          ],
        },
        {
          header: {
            title: "Live chat support",
          },
          providers: [
            {
              icon: "bg/check",
            },
            {
              icon: "bg/cross",
            },
            {
              icon: "bg/cross",
            },
            {
              icon: "bg/cross",
            },
            {
              icon: "bg/cross",
            },
          ],
        },
        {
          header: {
            title: "Avg. support response time",
          },
          providers: [
            {
              text: "<15 min",
            },
            {
              text: "<24 hours",
            },
            {
              text: "<4 hours",
            },
            {
              text: "<12 hours",
            },
            {
              text: "<12 hours",
            },
          ],
        },
      ];
    },
  },

  methods: {
    getProviderPrice(configId: number, providerId: string, params: TariffParams): string {
      const providerPrices: Record<string, string[]> = {
        do: ["6", "24", "48", "96"],
        gc: ["6.88", "27.55", "55.09", "110.19"],
        aws: ["7.59", "30.37", "60.74", "121.19"],
        vultr: ["5", "20", "40", "80"],
      };

      let price;
      if (providerId === "hostman") {
        const tariff: TariffResponseVds | undefined = this.nyTariffs.find(
          (nyTariff) =>
            nyTariff.cpu === params.cpu && nyTariff.ram === params.ram * 1024 && nyTariff.disk === params.disk * 1024
        );
        price = tariff ? tariff.price + IP_PRICE : 4;
      } else {
        price = providerPrices[providerId][configId];
      }

      return `$${price}`;
    },
    getTariffParams(): TariffParams {
      const params: Record<number, TariffParams> = {
        0: { cpu: 1, ram: 1, disk: 25 },
        1: { cpu: 2, ram: 4, disk: 80 },
        2: { cpu: 4, ram: 8, disk: 160 },
        3: { cpu: 8, ram: 16, disk: 320 },
      };

      return params[this.currentTab];
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

$gap-row-mobile: 16px;
$gap-row: 20px;

.scrollWrapperTable {
  @include mobile {
    @include hideScrollbar();
    overflow-x: scroll;
  }
}
.compareTable {
  padding: 0 20px;
  min-width: 932px;
}
.content {
  padding-bottom: $gap-row-mobile;
  @include desktop {
    padding-bottom: $gap-row;
  }
}
.divider {
  margin: $gap-row-mobile 0;
  background: var(--surface-line);
  width: 100%;
  height: 1px;
  @include desktop {
    margin: $gap-row 0;
  }
}
</style>
