<template>
  <section :class="$style.core">
    <NewFooterLinksBlock v-for="(block, idx) in blocks" :key="idx" :block="block" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { blocks } from "@/utils/links/footer";
import NewFooterLinksBlock from "@/components/New/Footer/Links/Block/index.vue";

export default Vue.extend({
  name: "NewFooterLinks",

  components: {
    NewFooterLinksBlock,
  },

  data() {
    return {
      blocks,
    };
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  @include mobile {
    display: grid;
    gap: 24px;
  }
  @include desktop {
    display: flex;
    gap: 80px;
  }
}
</style>
