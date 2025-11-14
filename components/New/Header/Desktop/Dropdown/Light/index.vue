<template>
  <div ref="wrapper" :class="$style.core">
    <div class="body2 semibold nd-link-primary" :class="$style.link" @click="toggleOpen">
      {{ item.name }}

      <SvgIcon
        :class="[$style.icon, isOpened && $style.opened]"
        color="is-inherit"
        icon-path="icons/new/chevron-down.svg"
      />
    </div>

    <div v-if="isOpened" :class="$style.dropdown" data-test-id="dropdown-menu">
      <NuxtLink
        v-for="(link, idx) in item.items"
        :key="idx"
        class="body2 semibold nd-link-primary"
        :class="$style.linkInner"
        :to="link.href"
        itemprop="url"
      >
        <div itemprop="name">{{ link.name }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewButton from "@/elements/New/Button/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import NewDropdownItem from "@/components/New/Header/Desktop/Dropdown/Item/index.vue";
import type { HeaderLinkMultiLevel } from "@/types/HeaderLink";
import bodyTransform from "@/components/New/mixins/bodyTransform";

export default Vue.extend({
  name: "NewHeaderDesktopDropdownLight",

  components: {
    NewButton,
    NewDropdownItem,
    SvgIcon,
  },

  mixins: [bodyTransform],

  props: {
    item: {
      type: Object as () => HeaderLinkMultiLevel,
      required: true,
    },
  },

  data() {
    return {
      isOpened: false,
    };
  },

  mounted() {
    document.addEventListener("click", this.onMenuItemClickOutside);
  },
  destroyed() {
    if (this.isOpened) {
      this.toggleOpen();
    }
    document.removeEventListener("click", this.onMenuItemClickOutside);
  },

  methods: {
    onMenuItemClickOutside(event: Event) {
      if (!this.$refs.wrapper) {
        return;
      }
      const target = this.$refs.wrapper as HTMLElement;
      const isClickInsideElement = target.contains(event.target as Element);
      if (!isClickInsideElement && this.isOpened) {
        this.toggleOpen();
      }
    },
    toggleOpen() {
      this.isOpened = !this.isOpened;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  position: relative;
}
.link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 20px;
}
.icon {
  color: var(--icon-primary) !important;
  margin-right: -8px;
  transition: var(--transition-all);
  &.opened {
    transform: rotate(180deg);
  }
}
.linkInner {
  display: grid;
  gap: 2px;
}
.dropdown {
  background: var(--surface-primary-hover);
  border-radius: 20px;
  display: grid;
  gap: 12px;
  padding: 20px 24px;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 36px;
  width: 100%;
}
</style>
