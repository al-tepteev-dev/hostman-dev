<template>
  <div :class="$style.core" @click="$emit('select-item', item)">
    <div :class="$style.iconWrapper">
      <SvgIcon :icon-path="iconPath" :width="iconSize" :height="iconSize" />
    </div>

    <div class="body2 semibold" :class="$style.title">
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export type MarketplaceItem = {
  icon: string;
  title: string;
  os?: number;
  software?: number;
  image?: string;
  type?: string;
  framework?: string;
};

export default Vue.extend({
  name: "NewBlockMarketplaceItem",

  components: { SvgIcon },

  props: {
    item: {
      type: Object as () => MarketplaceItem,
      required: true,
    },
  },

  computed: {
    iconPath() {
      return `icons/new/marketplace/${this.item.icon}.svg`;
    },
    iconSize() {
      return this.$isMobile ? 33 : 48;
    },
  },
});
</script>
<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  cursor: pointer;
  display: grid;
  gap: 20px;
  width: 120px;

  @include desktop {
    width: 160px;
  }

  &:hover {
    .iconWrapper {
      background-color: var(--surface-primary-hover);
    }
  }
}

.iconWrapper {
  background-color: var(--surface-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-bg);
  width: 120px;
  height: 120px;

  @include desktop {
    width: 160px;
    height: 160px;
  }
}

.title {
  text-align: center;
}
</style>
