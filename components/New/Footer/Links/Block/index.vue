<template>
  <section :class="$style.core">
    <div class="body1 medium">
      {{ block.name }}
    </div>

    <div :class="$style.sectionsWrapper">
      <div v-for="(section, idx) in block.sections" :key="idx" :class="$style.section">
        <NuxtLink v-for="(link, linkIdx) in section.items" :key="linkIdx" class="body2 nd-link-primary" :to="link.href">
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import type { FooterLinkBlock } from "@/types/FooterLink";

export default Vue.extend({
  name: "NewFooterLinksBlock",

  props: {
    block: {
      type: Object as () => FooterLinkBlock,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: 16px;
  align-content: flex-start;

  @include desktop {
    gap: 24px;
  }
}
.sectionsWrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @include desktop {
    flex-direction: row;
    gap: 48px;
  }
}
.section {
  display: grid;
  gap: 12px;
  align-self: start;
}
</style>
