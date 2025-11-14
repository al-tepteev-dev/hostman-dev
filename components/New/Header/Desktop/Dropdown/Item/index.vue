<template>
  <div :class="$style.core">
    <div class="body4 medium">
      {{ item.name }}
    </div>

    <div :class="$style.links">
      <NuxtLink v-for="(link, idx) in item.items" :key="idx" :class="$style.link" :to="link.href" itemprop="url">
        <SvgIcon :class="$style.icon" :icon-path="`icons/new/${link.icon}.svg`" width="32" height="32" />

        <div :class="$style.textContent">
          <div class="body2 semibold" :class="$style.linkTitle" itemprop="name">
            {{ link.name }}
          </div>
          <div :class="$style.description" class="body4 medium nd-text-secondary">
            {{ link.description }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import type { HeaderLinkMultiLevel } from "@/types/HeaderLink";

export default Vue.extend({
  name: "NewHeaderDesktopDropdown",

  components: {
    SvgIcon,
  },

  props: {
    item: {
      type: Object as () => HeaderLinkMultiLevel,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.core {
  width: 254px;
  display: grid;
  gap: 16px;
}
.links {
  display: grid;
  gap: 20px;
}
.link {
  display: flex;
  gap: 12px;
  align-items: center;

  &:hover {
    .linkTitle {
      color: var(--text-secondary);
    }
  }
}
.icon {
  flex: none;
}
.textContent {
  display: grid;
  gap: 4px;
}
.linkTitle {
  transition: var(--transition-color);
}
</style>
