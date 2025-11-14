<template>
  <NewCardWide
    content-wrapper
    :data-test-id="dataTestId"
    :header="newHeader"
    :image="image"
    image-height="310"
    :color-subtitle="$attrs['color-subtitle']"
    :size-title="$attrs['size-title']"
    :width="width"
    weight-title="medium"
  >
    <NewButton :class="$style.btn" @click="onBtnClick">{{ actionName }}</NewButton>
  </NewCardWide>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import NewButton from "@/elements/New/Button/index.vue";
import NewCardWide from "@/elements/New/Card/Wide/index.vue";
import type { ContentWidth } from "@/types/СontentWidth";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewBlockCallToAction",

  components: {
    NewButton,
    NewCardWide,
  },

  props: {
    dataTestId: {
      type: String,
      default: "call-to-action",
    },
    header: {
      type: Object as () => Header,
      required: true,
    },
    image: {
      type: String,
      default: "cta-block-page-main",
    },
    tariff: {
      type: Object,
      default: undefined,
    },
    width: {
      type: String as () => ContentWidth,
      default: "996",
    },
    actionTitle: {
      type: String,
      default: "Get started",
    },
  },

  computed: {
    actionName() {
      return this.tariff ? "Order" : this.actionTitle;
    },
    newHeader() {
      let subtitle = this.header.subtitle;
      if (this.tariff) {
        const bytes = 1024;
        const diskType = this.tariff.disk_type === "nvme" ? "NVMe" : "SSD";
        subtitle = `${this.tariff.cpu} CPU / ${this.tariff.ram / bytes}GB RAM / ${
          this.tariff.disk / bytes
        }GB ${diskType} / ${this.tariff.bandwidth} Mbps / $${this.tariff.price}/mo`;
      }

      return {
        title: this.header.title,
        subtitle,
      };
    },
  },

  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
    onBtnClick() {
      const body: any = {};
      if (this.tariff) {
        body.redirectUrl = `/servers/create?preset=${this.tariff.id}&zone=${this.tariff.location}`;
      }
      this.openSignUpModal(body);
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.btn {
  min-width: 91px;
  @include mobile {
    width: 100%;
  }
}
</style>
