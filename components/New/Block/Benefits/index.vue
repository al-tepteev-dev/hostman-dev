<template>
  <NewContent
    :data-test-id="dataTestId"
    :header="header"
    :header-justify="$attrs['header-justify']"
    :width="$attrs['width']"
  >
    <NewCardGrid
      :class-text-content="$attrs['class-text-content']"
      :cards="cards"
      size-title="h3"
      :cols-desktop="cols"
    />
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import type { CardNew } from "@/types/CardNew";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewBlockBenefits",

  components: {
    NewContent: () => import("@/components/New/Content/index.vue"),
    NewCardGrid: () => import("@/elements/New/Card/Grid/index.vue"),
  },

  props: {
    header: {
      type: Object as () => Header,
      required: true,
    },
    cards: {
      type: Array as () => CardNew[],
      required: true,
    },
    cols: {
      type: Number,
      default: 3,
    },
    dataTestId: {
      type: String,
      default: "benefits",
    },
  },
});
</script>
