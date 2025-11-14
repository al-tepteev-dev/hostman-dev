<template>
  <div :class="[$style.core, hasSeparator && $style.withSeparator]">
    <div v-if="hasSeparator" :class="$style.separator" />
    <NewSwitch v-model="switchType" text-before="Monthly" text-after="Annually - 30%" />
  </div>
</template>

<script>
import Vue from "vue";
import Parent from "@/components/Controls/AppSwitch.vue";
import NewSwitch from "@/elements/New/Switch/index.vue";

export default Vue.extend({
  name: "NewTariffPeriodSwitch",

  components: { NewSwitch },

  extends: Parent,

  props: {
    hasSeparator: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" module>
.core {
  display: flex;
  align-items: center;
  justify-content: center;

  &.withSeparator {
    justify-content: start;
  }
}
.separator {
  background: var(--divider-color-rgba);
  margin: 0 24px;
  width: 1px;
  height: 56px;
}
</style>
