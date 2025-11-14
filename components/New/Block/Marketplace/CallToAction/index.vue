<template>
  <NewCard
    :class-content="$style.content"
    :header="header"
    image="cta-block-page-marketplace"
    image-height="147"
    size-title="h3"
    weight-title="medium"
    :class-slot="$style.btn"
    :class-image-background="$style.img"
  >
    <NewButton :class="$style.btn" @click="openSignUpModal">Get started</NewButton>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import NewButton from "@/elements/New/Button/index.vue";
import NewCard from "@/elements/New/Card/index.vue";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewBlocMarketplaceCallToAction",

  components: {
    NewButton,
    NewCard,
  },

  props: {
    header: {
      type: Object as () => Header,
      required: true,
    },
  },

  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.content {
  display: grid;
  padding: 32px;
  gap: 16px;

  @include desktop {
    padding: 40px;
    align-items: center;
    gap: 8px;
    grid-template-columns: 1fr minmax(0, 133px);
  }
}
.btn {
  width: 100%;

  @include desktop {
    max-width: 133px;
  }
}
.img {
  background-position: 75% bottom;
}
</style>
