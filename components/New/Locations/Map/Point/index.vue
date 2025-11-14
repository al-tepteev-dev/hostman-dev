<template>
  <div>
    <div
      :class="$style.core"
      :style="{
        opacity: point.opacity,
        top: `${point.posy}%`,
        left: `${point.posx}%`,
      }"
      @touchstart="showTooltip = true"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
    />

    <div
      class="body3 medium"
      :class="[$style.tooltip, showTooltip && $style.active]"
      :style="{
        top: `${point.posy - 12}%`,
        left: `${point.posx}%`,
      }"
    >
      {{ point.title }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export type LocationsMapPoint = {
  title: string;
  opacity: number;
  posx: number;
  posy: number;
};

export default Vue.extend({
  name: "NewLocationsMapPoint",

  props: {
    point: {
      type: Object as () => LocationsMapPoint,
      required: true,
    },
  },

  data() {
    return {
      showTooltip: false,
    };
  },
});
</script>

<style lang="scss" module>
.core {
  background: var(--surface-accent);
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  transform: translateX(-50%);
  transition: var(--transition-all);
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--surface-accent-hover);
    scale: 1.15;
  }
}
.tooltip {
  opacity: 0;
  background: var(--surface-primary);
  border-radius: var(--border-card);
  width: fit-content;
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: var(--transition-all);
  position: absolute;
  bottom: 10px;
  transform: translateX(-50%);
  &.active {
    opacity: 1;
    z-index: 3;
  }
}
</style>
