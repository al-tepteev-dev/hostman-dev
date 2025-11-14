<template>
  <section :class="$style.core">
    <div :class="$style.head">
      <template v-if="submenu">
        <div :class="$style.iconWrapper" @click="submenu = undefined">
          <SvgIcon color="is-inherit" icon-path="icons/new/chevron-left.svg" />
        </div>

        <div class="body1 semibold">{{ submenu.name }}</div>
      </template>

      <template v-else>
        <div :class="$style.iconWrapper" @click="$emit('close')">
          <SvgIcon icon-path="icons/new/cross.svg" />
        </div>

        <NuxtLink to="/">
          <SvgIcon icon-path="icons/new/logo-mobile.svg" width="138" height="32" />
        </NuxtLink>
      </template>
    </div>

    <div v-if="submenu" :class="$style.bodyWithSubmenu">
      <NewHeaderMobileMenuSection has-subitems :links="submenu.items" @show-submenu="showSubmenu" />

      <NewCard>
        <div class="body3 medium" :class="$style.emailUsTitle" v-html="emailUsHeader.title" />
        <div class="body5 nd-text-secondary" :class="$style.emailUsSubtitle" v-html="emailUsHeader.subtitle" />
        <NewButtonLink expanded :href="contactsHref">Email us</NewButtonLink>
      </NewCard>
    </div>

    <div v-else :class="$style.body">
      <NewHeaderMobileMenuSection :links="linksTopPart" @show-submenu="showSubmenu" />

      <NewHeaderMobileMenuSection :links="secondPart" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import NewButtonLink from "@/elements/New/Button/Link/index.vue";
import NewCard from "@/elements/New/Card/index.vue";
import NewHeaderMobileMenuSection from "@/components/New/Header/Mobile/Menu/Section/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { firstPart, secondPart } from "@/utils/links/header";
import type { HeaderLinkMultiLevel } from "@/types/HeaderLink";
import { contactsHref } from "@/utils/links/common";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewHeaderMobileMenu",

  components: {
    NewButtonLink,
    NewCard,
    NewHeaderMobileMenuSection,
    SvgIcon,
  },

  data() {
    return {
      contactsHref,
      emailUsHeader: {
        title: "Did not find what you were looking for?",
        subtitle: "Tell us what you need to implement, and we will find a solution for you",
      } as Header,
      secondPart,
      submenu: undefined as HeaderLinkMultiLevel | undefined,
    };
  },

  computed: {
    linksTopPart() {
      return [...firstPart].filter((elm) => elm.hasNested || !elm.items);
    },
  },

  methods: {
    showSubmenu(link: HeaderLinkMultiLevel) {
      this.submenu = link;
    },
  },
});
</script>

<style lang="scss" module>
.core {
  background: var(--surface-secondary);
  padding: 16px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.head {
  height: 40px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.iconWrapper {
  color: var(--icon-secondary);
  cursor: pointer;
}
.body {
  display: grid;
  gap: 8px;
}
.bodyWithSubmenu {
  display: grid;
  gap: 12px;
}
.emailUsTitle {
  margin-bottom: 6px;
}
.emailUsSubtitle {
  margin-bottom: 16px;
}
</style>
