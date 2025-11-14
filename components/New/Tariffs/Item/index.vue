<template>
  <NewCard :class-content="$style.core">
    <div :class="$style.tariffItem">
      <NewTariffsItemProps :items="props">
        <div v-if="hasPublicIp" :class="$style.publicIpProp">
          <div class="body4 medium nd-text-secondary" :class="$style.label">Public IP</div>
          <NewSwitch v-model="withPublicIp" bg="secondary" />
        </div>
      </NewTariffsItemProps>

      <div :class="$style.price">
        <div :class="$style.priceValue">
          <div class="semibold" :class="priceClasses">{{ price }}</div>
          <span :class="pricePeriodClasses">&nbsp;/mo</span>
        </div>
        <div v-if="hasSaveText" class="body4" :class="$style.saveText">Save 10%</div>
        <NewButton :class="$style.action" size="md" @click="handleTariffClick(item)">
          {{ btnText }}
        </NewButton>
      </div>
    </div>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import Parent from "@/components/Pricing/PriceCard/priceCard.vue";
import NewTariffsItemProps from "@/components/New/Tariffs/Item/Props/index.vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewCard from "@/elements/New/Card/index.vue";
import NewSwitch from "@/elements/New/Switch/index.vue";
import { IP_PRICE } from "@/utils/constants";

type ItemProp = {
  class: string;
  title: string;
  value: string;
};

export default Vue.extend({
  name: "NewTariffsItem",

  components: { NewButton, NewCard, NewSwitch, NewTariffsItemProps },

  extends: Parent,

  props: {
    item: {
      type: Object,
      required: true,
    },
    defaultBandwidth: {
      type: String,
      default: "",
    },
  },

  computed: {
    hasPublicIp() {
      return this.item.is_allowed_local_network;
    },
    hasSaveText() {
      return this.$isMobile && this.type;
    },
    priceWithIp() {
      return this.item.price + (this.hasPublicIp && this.withPublicIp ? IP_PRICE : 0);
    },
    price() {
      return `$${this.type ? (this.priceWithIp * 0.7).toFixed(1) : this.priceWithIp}`;
    },
    priceClasses() {
      return this.$isMobile ? "h2" : "h3";
    },
    pricePeriodClasses() {
      return this.$isMobile ? "body1 medium" : "body2 semibold";
    },
    props() {
      const res: ItemProp[] = [];
      if (this.item.cpu) {
        res.push({
          class: this.$style.cpu,
          title: "CPU",
          value: `${this.item.cpu} x ${this.cpuFrequency} GHz`,
        });
      }

      if (this.item.ram) {
        res.push({
          class: this.$style.ram,
          title: "RAM",
          value: `${this.item.ram / 1024} GB`,
        });
      }

      if (this.item.disk) {
        res.push({
          class: this.$style.disk,
          title: "NVMe",
          value: `${this.item.disk / 1024} GB`,
        });
      }

      if (this.item.bandwidth || this.defaultBandwidth) {
        if (this.item.bandwidth === 1000 || this.defaultBandwidth === 1000) {
          res.push({
            class: this.$style.bandwidth,
            title: "Bandwidth",
            value: `1 Gbps`,
          });
        } else {
          res.push({
            class: this.$style.bandwidth,
            title: "Bandwidth",
            value: `${this.item.bandwidth || this.defaultBandwidth} Mbps`,
          });
        }
      }

      if (this.item.replica_count) {
        res.push({
          class: this.$style.rc,
          title: "Replicas",
          value: this.replicaCount(this.item.replica_count),
        });
      }

      if (this.item.requests) {
        res.push({
          class: this.$style.rq,
          title: "Requests",
          value: `${this.item.requests} k/mo`,
        });
      }

      return res;
    },
  },
});
</script>

<style lang="scss" module>
@import "./index";
</style>
