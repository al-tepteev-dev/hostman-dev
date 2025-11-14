<template>
  <NewCardWide
    :class-content="$attrs['class-content']"
    :class-text-content="$style.textСontent"
    content-wrapper
    :header="header"
    size-title="h2"
    width="996"
    weight-title="medium"
  >
    <slot />
  </NewCardWide>
</template>

<script lang="ts">
import Vue from "vue";
import NewCardWide from "@/elements/New/Card/Wide/index.vue";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewBlockCard",

  components: {
    NewCardWide,
  },

  props: {
    header: {
      type: Object as () => Header,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.textСontent {
  gap: 12px;

  @include desktop {
    gap: 24px;
  }
}
</style>
