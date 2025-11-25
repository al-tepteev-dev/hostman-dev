<template>
  <section :class="[$style.core, classTabs, insideContentSlot && $style.insideContentSlot]">
    <div
      v-for="tab in items"
      :key="tab.id"
      class="body4 semibold"
      :class="[$style.tabItem, value === tab.id && $style.active]"
      @click="selectTab(tab.id)"
    >
      {{ tab.title }}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export type TabItem = {
  id: number | string;
  title: string;
};

export default Vue.extend({
  name: "NewTabs",

  props: {
    classTabs: {
      type: String,
      default: "",
    },
    insideContentSlot: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array as () => TabItem[],
      required: true,
    },
    value: {
      type: [Number, String],
      default: "",
    },
  },

  created() {
    if (!this.value) {
      this.selectTab(this.items[0].id);
    }
  },

  methods: {
    selectTab(tabId: string | number) {
      this.$emit("input", tabId);
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/variables";

.core {
  display: flex;
  gap: 8px;

  &.insideContentSlot {
    @include mobile {
      @include hideScrollbar();
      margin: 0 calc(-1 * var(--padding-content-y));
      overflow-x: scroll;
      padding: 0 var(--padding-content-y);
    }
  }

  @include desktop {
    justify-content: center;
  }
}
.tabItem {
  background: var(--surface-primary);
  border-radius: $border-card-desktop;
  cursor: pointer;
  display: flex;
  flex: none;
  align-items: center;
  height: var(--height-control-sm);
  padding: 0 20px;
  transition: var(--transition-all);

  &:hover {
    background: var(--surface-primary-hover);
  }

  &.active {
    background: var(--surface-accent) !important;
  }
}
</style>
