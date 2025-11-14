<template>
  <NewContent :header="header" header-justify="center">
    <div :class="$style.grid">
      <NewCard
        v-for="(card, idx) in cards"
        :key="idx"
        :class-content="$style.content"
        :header="card.header"
        size-title="h3"
      >
        <template #beforeHeader>
          <div :class="$style.cardIcon">
            <SvgIcon :icon-path="`icons/new/${card.icon}.svg`" :width="iconSize" :height="iconSize" />
          </div>
        </template>
      </NewCard>
    </div>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import type { CardNew } from "@/types/CardNew";
import NewButton from "@/elements/New/Button/index.vue";
import NewCard from "@/elements/New/Card/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import type { Header } from "@/types/Header";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewBlockBenefitsHorizontal",

  components: {
    NewButton,
    NewCard,
    NewContent,
    SvgIcon,
  },

  props: {
    cards: {
      type: Array as () => CardNew[],
      default: () => [
        {
          icon: "power",
          header: {
            title: "Powerful Xeon® Gold",
            subtitle:
              "VMs are based on the latest 2nd Gen Intel® Scalable CPUs with 3.1 GHz frequency and deliver a revolutionary new level of cloud computing",
          },
        },
        {
          icon: "ssd",
          header: {
            title: "Blazing SSDs",
            subtitle:
              "Cloud platform has fast-speed solid-state drives with an awesome IOPS rate. Data is stored 3x and always available with no lags",
          },
        },
      ],
    },
    header: {
      type: Object as () => Header,
      default: () => ({
        title: "Enjoy amazing flexibility of your Cloud Database",
        subtitle: "Feel the great power of CPU, RAM, and drives inside every Cloud Database",
      }),
    },
  },

  computed: {
    iconSize() {
      return this.$isMobile ? 64 : 80;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";
.grid {
  display: grid;
  gap: 20px;

  @include desktop {
    gap: 24px;
    grid-template-columns: repeat(2, minmax(auto, 1fr));
  }
}
.content {
  display: grid;
  gap: 24px;

  @include desktop {
    padding: 40px;
    grid-template-columns: 80px minmax(auto, 1fr);
  }
}
</style>
