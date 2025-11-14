<template>
  <NewCard
    :class-content="$style.content"
    :class-text-content="$style.cardTextContent"
    :header="card.header"
    :href="card.href"
    size-title="h3"
  >
    <template #beforeHeader>
      <div :class="$style.cardTopPart">
        <SvgIcon :width="card.iconSize" :icon-path="card.icon" :height="card.iconSize" />
        <span class="body4 nd-text-secondary" v-text="card.installs" />
      </div>
    </template>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import { getPreviewIconSrc, MarketplaceItemModel } from "@/services/marketplace/models/MarketplaceItemModel";
import NewCard from "@/elements/New/Card/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewBlockMarketplaceListItem",

  components: { NewCard, SvgIcon },

  props: {
    app: {
      type: Object as () => MarketplaceItemModel,
      required: true,
    },
  },

  computed: {
    card() {
      const card = {
        header: {
          title: this.app.name,
          subtitle: this.app.description,
        },
        href: this.app.path + "/",
        icon: getPreviewIconSrc(this.app.icon),
        iconSize: this.iconSize,
        installs: new Intl.NumberFormat("ru-RU", { style: "decimal" }).format(this.app.installs) + " installs",
      };
      return card;
    },
    iconSize() {
      return this.$isMobile ? 36 : 48;
    },
  },
});
</script>
<style lang="scss" module>
@import "assets/styles/new/mixins";

.content {
  gap: 20px;
  align-content: flex-start;

  @include desktop {
    gap: 16px;
  }
}
.cardTextContent {
  gap: 8px;

  @include desktop {
    gap: 12px;
  }
}
.cardTopPart {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
