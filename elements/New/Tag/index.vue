<template>
  <div class="body4 medium" :class="$style.core">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NewTag",
});
</script>

<style lang="scss" module>
@import "assets/styles/new/variables";

.core {
  background: var(--surface-accent);
  border-radius: $border-card-desktop;
  width: max-content;
  height: 36px;
  padding: 0 15px;
  display: flex;
  align-items: center;
}
</style>
