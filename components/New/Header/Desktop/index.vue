<template>
  <header
    :class="[$style.core, !isOffsetZero && $style.pinned]"
    itemScope="itemscope"
    itemtype="https://schema.org/SiteNavigationElement"
    data-test-id="header"
  >
    <div :class="$style.topPart">
      <NewContent>
        <div :class="$style.secondaryLinks">
          <div class="body4 medium nd-link-primary" :class="$style.topText" @click="openSignUpModal">
            Cloud servers from $4 per/mo - Grab the Deal! Let’s start ->
          </div>

          <div :class="$style.links">
            <NuxtLink
              v-for="(link, idx) in secondPart"
              :key="idx"
              class="body4 medium nd-link-primary"
              :to="link.href"
              itemprop="url"
            >
              <span itemprop="name">{{ link.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </NewContent>
    </div>
    <NewContent>
      <div :class="$style.mainPart">
        <NuxtLink to="/">
          <SvgIcon icon-path="icons/new/logo.svg" width="140" height="36" />
        </NuxtLink>

        <div :class="$style.line" />

        <div :class="$style.mainLinks">
          <div v-for="(link, idx) in firstPart" :key="idx">
            <NewHeaderDesktopDropdown
              v-if="link.hasNested"
              :item="link"
              :class="$style.linkWithDropdown"
              data-test-id="products-dropdown"
            />

            <NewHeaderDesktopDropdownLight v-else-if="link.items" :item="link" data-test-id="community-dropdown" />

            <NuxtLink v-else class="body2 semibold nd-link-primary" :class="$style.link" :to="link.href" itemprop="url">
              <span itemprop="name">{{ link.name }}</span>
            </NuxtLink>
          </div>
        </div>

        <div :class="$style.expander" />

        <AuthBtns />
      </div>
    </NewContent>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import AuthBtns from "@/components/New/Header/AuthBtns/index.vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewHeaderDesktopDropdown from "@/components/New/Header/Desktop/Dropdown/index.vue";
import NewHeaderDesktopDropdownLight from "@/components/New/Header/Desktop/Dropdown/Light/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { firstPart, secondPart } from "@/utils/links/header";

export default Vue.extend({
  name: "NewHeaderDesktop",

  components: {
    AuthBtns,
    NewButton,
    NewContent,
    NewHeaderDesktopDropdown,
    NewHeaderDesktopDropdownLight,
    SvgIcon,
  },

  data() {
    return {
      firstPart,
      isOffsetZero: true,
      secondPart,
    };
  },

  watch: {
    isOffsetZero: {
      handler(val) {
        if (!process.client) {
          return;
        }
        document.body.style.setProperty("--header-shift", val ? "0px" : "-48px");
      },
      immediate: true,
    },
  },

  mounted() {
    document.addEventListener("scroll", this.eventListenerScroll, {
      passive: true,
    });
    this.eventListenerScroll();
  },

  beforeDestroy() {
    document.removeEventListener("scroll", this.eventListenerScroll);
  },

  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
    eventListenerScroll() {
      this.isOffsetZero = window.scrollY < 1;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: none;

  @include desktop() {
    @include fixContentJump();
    display: block;
    position: fixed;
    transition: top 100ms ease-in-out;
    left: 0;
    right: 0;
    top: 0;
    z-index: var(--z-index-header);
  }
}
.pinned {
  background: var(--surface-secondary);
  top: var(--header-shift);
  // .topPart {
  //   display: none;
  // }
  .mainPart {
    margin: 16px 12px;
  }
}
.topPart {
  background: var(--surface-primary);
}
.topText {
  flex: 1;
}
.secondaryLinks {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
}
.links {
  display: flex;
  gap: 32px;
  margin-left: auto;
}
.mainPart {
  display: flex;
  align-items: center;
  position: relative; // For dropdowns
  margin: 24px 12px;
  height: 48px;

  .mainLinks {
    display: flex;
    align-items: center;
  }

  .link {
    padding: 0 20px;
  }

  .linkWithDropdown {
    margin-right: 16px;
  }
}
.line {
  background: var(--surface-line);
  margin: 0 32px;
  height: 44px;
  width: 1px;
}
.expander {
  flex: 1;
}
</style>
