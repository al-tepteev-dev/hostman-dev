<template>
  <NewContentScroll :header="header">
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>

    <template #default="{ isDrag }">
      <NewCardGrid
        :cards="cards"
        :cols-desktop="cards.length"
        :cols-mobile="cards.length"
        :disabled="isDrag"
        is-card-fixed-width
        :size-title="$attrs['size-title']"
        @click-card="clickCard"
      />
    </template>
  </NewContentScroll>
</template>

<script lang="ts">
import Vue from "vue";
import content from "@/components/New/Content/mixins/content";
import NewCardGrid from "@/elements/New/Card/Grid/index.vue";
import NewContentScroll from "@/components/New/Content/Scroll/index.vue";
import type { CardNew } from "@/types/CardNew";

export default Vue.extend({
  name: "NewContentScrollCards",

  components: { NewCardGrid, NewContentScroll },

  mixins: [content],

  props: {
    cards: {
      type: Array as () => CardNew[],
      required: true,
    },
  },

  methods: {
    clickCard(event: MouseEvent, id: string | number) {
      this.$emit("click-card", event, id);
    },
  },
});
</script>
