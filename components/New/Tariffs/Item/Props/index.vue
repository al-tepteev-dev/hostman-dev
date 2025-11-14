<template>
  <div :class="[$style.core, !!$slots.default && $style.gapCompact]">
    <div v-for="(prop, idx) in items" :key="idx">
      <div :class="$style.propMobile">
        <div :class="$style.iconWrapper">
          <SvgIcon color="is-inherit" icon-path="icons/new/bg/check.svg" />
        </div>
        <div class="body4 medium">
          {{ prop.value }}&nbsp;<span class="nd-text-secondary">{{ prop.title }}</span>
        </div>
      </div>
      <div :class="[$style.propDesktop, prop.class]">
        <div :class="propTitleClasses">{{ prop.title }}</div>
        <div :class="propValueClasses">{{ prop.value }}</div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export type ItemProp = {
  class: string;
  title: string;
  value: string;
};

export default Vue.extend({
  name: "NewTariffsItemProps",

  components: { SvgIcon },

  props: {
    items: {
      type: Array as () => ItemProp[],
      required: true,
    },
  },

  computed: {
    propTitleClasses() {
      return "body4 medium nd-text-secondary";
    },
    propValueClasses() {
      return "body2 semibold";
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: 12px;

  @include desktop {
    display: flex;
    gap: 112px;

    &.gapCompact {
      gap: 85px;
    }
  }
}
.propMobile {
  display: none;

  @include mobile {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}
.iconWrapper {
  color: var(--icon-primary);
}
.propDesktop {
  display: none;

  @include desktop {
    display: grid;
    gap: 4px;
  }
}
</style>
