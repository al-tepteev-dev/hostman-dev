<template>
  <NewCard :header="header" size-title="h3" :class-content="contentClasses">
    <div :class="$style.socials">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        class="nd-link-primary"
        :class="$style.socialLink"
        :href="social.href"
        target="_blank"
      >
        <SvgIcon
          color="is-inherit"
          :icon-path="`icons/new/socials/${social.icon}.svg`"
          :width="iconSize"
          :height="iconSize"
        />
      </a>
    </div>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import NewCard from "@/elements/New/Card/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { socials } from "@/utils/links/footer";

export default Vue.extend({
  name: "NewBlockContactUsSocials",

  components: { NewCard, SvgIcon },

  data() {
    return {
      header: {
        title: "We are on Socials",
      },
      iconSize: 40,
    };
  },
  computed: {
    socialLinks() {
      return socials.slice(0, -1);
    },
    contentClasses() {
      return `${this.$style.content}`;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";
.content {
  display: grid;
  gap: 16px;
}
.socials {
  display: flex;
  gap: 16px;

  .socialLink {
    transition: none;
  }
}
</style>
