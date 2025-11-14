<template>
  <NewCard background="secondary" :class-content="$style.advantagesSectionItem">
    <div :class="$style.advantagesWrapper">
      <div :class="[$style.title, 'body1 semibold']">
        {{ item.header.title }}
      </div>
    </div>
    <div :class="[$style.subtitle, 'body2 nd-text-secondary', isActive && $style.visible]">
      <span v-html="item.header.subtitle" />
      <div :class="isActive && $style.selectedIndicator"></div>
    </div>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import NewCard from "@/elements/New/Card/index.vue";
import type { CardNew } from "@/types/CardNew";

export default Vue.extend({
  name: "NewBlockControlPanelItem",
  components: { NewCard },
  props: {
    item: {
      type: Object as () => CardNew,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.advantagesSectionItem {
  padding: 20px;
  cursor: pointer;
  @include desktop {
    padding: 28px 32px;
  }
}
.advantagesWrapper {
  display: flex;
  gap: 8px;
}
.selectedIndicator {
  background: var(--surface-accent);
  width: 2px;
  height: 72px;
  border-radius: 1px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.subtitle {
  transition: var(--transition-all);
  visibility: hidden;
  height: 0;
  opacity: 0;
}
.visible {
  height: auto;
  opacity: 1;
  visibility: visible;
  margin-top: 8px;
}
</style>
