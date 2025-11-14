<template>
  <div ref="wrapper" :class="$style.core">
    <NewButton size="md" theme="primary" @click="toggleOpen">
      {{ item.name }}

      <SvgIcon
        :class="[$style.icon, isOpened && $style.opened]"
        color="is-inherit"
        icon-path="icons/new/chevron-down.svg"
      />
    </NewButton>

    <div
      v-if="isOpened"
      :class="$style.dropdown"
      data-test-id="dropdown-menu"
      :style="{
        gridTemplateColumns: `repeat(${item.items?.length}, minmax(auto, 1fr))`,
      }"
    >
      <NewDropdownItem v-for="(elm, idx) in item.items" :key="idx" :item="elm" />
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
  name: "NewHeaderDesktopDropdown",

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

  watch: {
    "$route.path"(to, from) {
      if (from !== to && this.isOpened) {
        this.toggleOpen();
      }
    },
    "$route.query"() {
      if (this.isOpened) {
        this.toggleOpen();
      }
    },
  },

  mounted() {
    document.addEventListener("click", this._onMenuItemClickOutside);
    document.addEventListener("keydown", this._onKeydown);
  },

  destroyed() {
    if (this.isOpened) {
      this.toggleOpen();
    }
    document.removeEventListener("click", this._onMenuItemClickOutside);
    document.removeEventListener("keydown", this._onKeydown);
  },

  methods: {
    _onKeydown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !this.isOpened) {
        return;
      }
      this.toggleOpen();
    },
    _onMenuItemClickOutside(event: Event) {
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
      if (this.isOpened) {
        this.toggleBodyBackdrop(true);
        this.toggleBodyScroll(false);
      } else {
        this.toggleBodyBackdrop(false);
        this.toggleBodyScroll(true);
      }
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.icon {
  color: var(--icon-primary) !important;
  margin-right: -8px;
  transition: var(--transition-all);
  &.opened {
    transform: rotate(180deg);
  }
}
.dropdown {
  background: var(--surface-primary-hover);
  border-radius: 20px;
  display: grid;
  align-items: flex-start;
  gap: 12px;
  padding: 36px 40px;
  position: absolute;
  left: 0;
  top: 56px;
}
</style>
