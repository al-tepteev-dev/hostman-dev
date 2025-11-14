<template>
  <section :class="[$style.core, widthClass]">
    <div
      v-if="header.title"
      :class="[$style.headerWrapper, $style[`justify-${headerJustify}`], $style[`mb-${headerMarginSize}`]]"
    >
      <div v-if="header.title" :class="$style.textContent">
        <component :is="sizeTitle" class="medium" :class="titleClass" v-html="header.title" />

        <div v-if="header.subtitle" class="body2" :class="classSubtitle" v-html="header.subtitle" />
      </div>

      <slot v-if="isTopAction" name="action" />
    </div>

    <div v-if="$slots.tabs" :class="$style.tabsWrapper">
      <slot name="tabs" />
    </div>

    <slot />

    <div v-if="$slots.action && !isTopAction" :class="$style.slotActionMobile">
      <slot name="action" />
    </div>

    <div v-if="$slots.bottom" :class="$style.slotBottom">
      <slot name="bottom" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import content from "@/components/New/Content/mixins/content";
import type { ContentWidth } from "@/types/ContentWidth";

export default Vue.extend({
  name: "NewContent",

  mixins: [content],

  props: {
    width: {
      type: String as () => ContentWidth,
      default: "1200",
    },
  },

  computed: {
    isTopAction() {
      return !this.$isMobile;
    },
    widthClass() {
      const w = `content-w-${this.width}`;
      return this.$style[w];
    },
    titleClass() {
      return this.$style[this.sizeTitle];
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/variables";

@mixin contentRestrictWidth($max-width) {
  padding: 0 var(--padding-content-y);
  // width: 100%;

  @media only screen and (min-width: $max-width) {
    padding: 0;
    max-width: $max-width;
  }

  @include mobile {
    overflow: hidden;
  }
}

@mixin textByCenter() {
  justify-content: center;
  text-align: center;
}

.core {
  display: block;
  margin: 0 auto;
  width: 100%;
}

.slotActionMobile {
  margin: var(--padding-content-y) var(--padding-content-y) 0 var(--padding-content-y);
}

.slotBottom {
  margin-top: 48px;

  @include desktop {
    margin-top: 72px;
  }
}

.content-w-894 {
  @include contentRestrictWidth(894px);
}

.content-w-996 {
  @include contentRestrictWidth(996px);
}

.content-w-1055 {
  @include contentRestrictWidth(1055px);
}

.content-w-1200 {
  @include contentRestrictWidth($screen-1200);
}

.content-w-1440 {
  @include contentRestrictWidth(1440px);
}

.h1 {
  margin-bottom: 8px;
}

.content-w-full {
  max-width: 100%;
  overflow: hidden;

  .slotActionMobile {
    margin: var(--padding-content-y) calc(2 * var(--padding-content-y)) 0 calc(2 * var(--padding-content-y));
  }
}

.headerWrapper {
  display: flex;
  max-width: var(--screen-1200);
  margin: 0 auto;
  align-items: center;

  &.justify-space-between {
    justify-content: space-between;
    @include mobile {
      @include textByCenter();
    }
  }
  &.justify-center {
    @include textByCenter();
  }

  @include mobile {
    @include textByCenter();
    margin: 0 20px 20px 20px;
  }

  @include desktop {
    padding: 0 32px;
  }

  &.mb-0 {
    margin-bottom: 0;
  }

  &.mb-24 {
    @include desktop {
      margin-bottom: 24px;
    }
  }

  &.mb-32 {
    @include desktop {
      margin-bottom: 32px;
    }
  }

  &.mb-48 {
    @include desktop {
      margin-bottom: 48px;
    }
  }
}

.tabsWrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;

  @include desktop {
    margin-top: -8px;
    margin-bottom: 32px;
  }
}

.textContent {
  display: grid;
  gap: 12px;
}
</style>
