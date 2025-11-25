<template>
  <div ref="wrapper" :class="coreClasses">
    <label v-if="label" class="body3 medium" :class="$style.label">
      {{ label }}
    </label>

    <div class="pointer" :class="$style.selector" @click="toggleDropdown">
      <div v-if="selected" :class="[$style.value, textClasses]">
        <SvgIcon v-if="icon" color="is-inherit" :icon-path="icon" />

        <div v-html="getOptionTitle(selected, true)" />
      </div>
      <div :class="$style.iconWrapper">
        <SvgIcon
          :class="[$style.chevronIcon, isOpenedDropdown && $style.isDropdownOpened]"
          color="is-inherit"
          icon-path="icons/new/chevron-down.svg"
        />
      </div>
    </div>

    <div v-if="isOpenedDropdown" :class="$style.dropdown">
      <div
        v-for="(option, idx) in options"
        :key="idx"
        class="pointer"
        :class="[$style.dropdownItem, textClasses]"
        @click="selectItem(option, idx)"
      >
        <SvgIcon v-if="getOptionIcon(option)" color="is-inherit" :icon-path="getOptionIcon(option)" />

        <div v-html="getOptionTitle(option, true)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewSelect",

  components: { SvgIcon },

  props: {
    bgSecondary: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    options: {
      type: Array as () => any[],
      required: true,
    },
    optionKey: {
      type: String,
      default: null,
    },
    optionIcon: {
      type: String,
      default: "",
    },
    optionTitle: {
      type: String,
      default: "title",
    },
    optionSubtitle: {
      type: String,
      default: "",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    textCompact: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isOpened: false,
    };
  },

  computed: {
    coreClasses() {
      return [
        this.$style.core,
        this.bgSecondary && this.$style.bgSecondary,
        this.expanded && this.$style.expanded,
        this.label && this.$style.withLabel,
        this.rounded && this.$style.rounded,
      ];
    },
    icon() {
      return this.optionIcon ? `icons/${this.selected[this.optionIcon]}` : undefined;
    },
    isOpenedDropdown() {
      return this.isOpened;
    },
    optionIdx() {
      return this.optionKey
        ? this.options.findIndex((o) => o[this.optionKey]?.toString() === this.value?.toString())
        : this.value;
    },
    selected() {
      if (this.optionIdx < 0) {
        return this.options[0];
      }
      return this.options[this.optionIdx];
    },
    textClasses() {
      return this.textCompact ? "body3 medium" : "body2 semibold";
    },
  },

  mounted() {
    document.addEventListener("click", this.onMenuItemClickOutside);
  },

  destroyed() {
    if (this.isOpened) {
      this.toggleDropdown();
    }
    document.removeEventListener("click", this.onMenuItemClickOutside);
  },

  methods: {
    getOptionIcon(option: any) {
      return this.optionIcon ? `icons/${option[this.optionIcon]}` : undefined;
    },
    getOptionId(option: any, idx: number) {
      return this.optionKey ? option[this.optionKey] : idx;
    },
    getOptionTitle(option: any, isSelectedValue = false): string {
      const parts = [];
      const subtitle = !!this.optionSubtitle && option[this.optionSubtitle];
      if (isSelectedValue) {
        parts.push(
          `${option[this.optionTitle]}${subtitle ? " <span class='nd-text-secondary'>" + subtitle + "</span>" : ""}`
        );
      } else {
        parts.push(option[this.optionTitle]);
        if (subtitle) {
          parts.push(subtitle);
        }
      }
      return parts.join(", ");
    },
    onMenuItemClickOutside(event: Event) {
      if (!this.$refs.wrapper) {
        return;
      }
      const target = this.$refs.wrapper as HTMLElement;
      const isClickInsideElement = target.contains(event.target as Element);
      if (!isClickInsideElement && this.isOpened) {
        this.toggleDropdown();
      }
    },
    selectItem(option: any, idx: number) {
      if (this.isOpened) {
        this.toggleDropdown();
      }
      if (this.optionKey === "code") {
        return this.$emit("input", option);
      }
      this.$emit("input", this.getOptionId(option, idx));
    },
    selectItemFromSelect($event) {
      this.$emit("input", $event.target.options[$event.target.options.selectedIndex].value);
    },
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/variables";

.core {
  position: relative;
  display: grid;
  gap: 8px;
}

.expanded {
  width: 100%;
}

.selector {
  background: var(--surface-primary);
  border-radius: var(--border-control);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: var(--height-control-md);
  width: 100%;
  padding: 10px 20px;
  transition: var(--transition-all);

  &:hover {
    background: var(--surface-primary-hover);
  }
}

.value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.iconWrapper {
  color: var(--icon-primary);
  margin-left: auto;
}

.chevronIcon {
  transition: var(--transition-all);

  &.isDropdownOpened {
    transform: rotate(180deg);
  }
}

.dropdown {
  background: var(--surface-primary-hover);
  position: absolute;
  top: 56px;
  border-radius: var(--border-control);
  padding: 8px;
  display: grid;
  gap: 4px;
  width: 100%;
  z-index: var(--z-index-popup);
}

.dropdownItem {
  border-radius: var(--border-control);
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 12px;
  height: 40px;
  transition: var(--transition-all);

  &:hover {
    background: var(--surface-primary);
  }
}

.bgSecondary {
  .selector,
  .dropdown {
    background: var(--surface-secondary);
  }
}

.rounded {
  .selector,
  .dropdown {
    border-radius: $border-card-desktop;
  }
  .dropdownItem {
    border-radius: 20px;
  }
}
</style>
