<template>
  <div :class="$style.core">
    <NewButton expanded size="sm" @click="openSignUpModal"> Sign Up </NewButton>

    <div :class="$style.socials">
      <a
        v-for="social in socials"
        :key="social.name"
        class="nd-link-primary"
        :class="$style.socialLink"
        :href="social.href"
        target="_blank"
      >
        <SvgIcon color="is-inherit" :icon-path="`icons/new/socials/${social.icon}.svg`" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import NewButton from "@/elements/New/Button/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { socials } from "@/utils/links/footer";

export default Vue.extend({
  name: "NewFooterSocials",

  components: {
    NewButton,
    SvgIcon,
  },

  data() {
    return {
      socials,
    };
  },

  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: 24px;
  align-content: flex-start;

  @include mobile {
    order: -1;
  }

  @include desktop {
    gap: 32px;
    width: 184px;
  }
}
.socials {
  display: flex;
  gap: 16px;

  @include mobile {
    justify-content: center;
  }
  .socialLink {
    transition: none;
  }
}
</style>
