<template>
  <div
    :class="[$style.core, classGrid]"
    :style="{
      gridTemplateColumns: `repeat(${$isMobile ? colsMobile : colsDesktop}, minmax(auto, 1fr))`,
    }"
  >
    <component
      :is="cardComponent"
      v-for="(card, idx) in cards"
      :id="card.id"
      :key="idx"
      :class-text-content="classTextContent"
      :header="card.header"
      :hoverable="card.hoverable"
      :href="card.href"
      :href-title="card.hrefTitle"
      :href-title-on-hover="card.hrefTitleOnHover"
      :href-type="card.hrefType"
      :disabled="disabled || card.disabled"
      :icon="card.icon"
      :image="card.image"
      :is-fixed-width="isCardFixedWidth"
      :size-title="$attrs['size-title']"
      @click-card="clickCard"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import NewCard from "@/elements/New/Card/index.vue";
import NewCardLight from "@/elements/New/Card/Light/index.vue";
import type { CardNew } from "@/types/CardNew";

type CardType = "light" | "std";

export default Vue.extend({
  name: "NewCardGrid",

  components: {
    NewCard,
    NewCardLight,
  },

  props: {
    cards: {
      type: Array as () => CardNew[],
      required: true,
    },
    cardType: {
      type: String as () => CardType,
      default: "std",
    },
    classTextContent: {
      type: String,
      default: "",
    },
    classGrid: {
      type: String,
      default: "",
    },
    colsDesktop: {
      type: [String, Number],
      default: "4",
    },
    colsMobile: {
      type: [String, Number],
      default: "1",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isCardFixedWidth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cardComponent() {
      return this.cardType === "light" ? "NewCardLight" : "NewCard";
    },
  },

  methods: {
    clickCard(event: MouseEvent, id: string | number) {
      this.$emit("click-card", event, id);
    },
  },
});
</script>

<style lang="scss" module>
.core {
  display: grid;
  gap: var(--gap-card);
}
</style>
