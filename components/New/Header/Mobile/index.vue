<template>
  <div>
    <header :class="$style.core">
      <div :class="$style.menuWrapper">
        <div :class="$style.iconWrapper" @click="setIsMenuOpened(true)">
          <SvgIcon icon-path="icons/new/menu.svg" />
        </div>

        <NuxtLink to="/">
          <SvgIcon icon-path="icons/new/logo-mobile-compact.svg" height="32" width="32" />
        </NuxtLink>
      </div>

      <AuthBtns />
    </header>

    <NewHeaderMobileMenu v-if="isMenuOpened" @close="setIsMenuOpened(false)" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import AuthBtns from "@/components/New/Header/AuthBtns/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewHeaderMobileMenu from "@/components/New/Header/Mobile/Menu/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import bodyTransform from "@/components/New/mixins/bodyTransform";

export default Vue.extend({
  name: "NewHeaderMobile",

  components: {
    AuthBtns,
    NewContent,
    NewHeaderMobileMenu,
    SvgIcon,
  },

  mixins: [bodyTransform],

  data() {
    return {
      isMenuOpened: false,
      isOffsetZero: true,
    };
  },

  watch: {
    "$route.path"(to, from) {
      if (from !== to) {
        this.setIsMenuOpened(false);
      }
    },
  },

  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
    setIsMenuOpened(val: boolean) {
      this.isMenuOpened = val;
      if (this.isMenuOpened) {
        this.toggleBodyScroll(false);
      } else {
        this.toggleBodyScroll(true);
      }
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  background: var(--surface-primary);
  display: block;
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include desktop() {
    display: none;
  }
}

.menuWrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.iconWrapper {
  cursor: pointer;
}
</style>
