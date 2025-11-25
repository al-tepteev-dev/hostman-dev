<template>
  <component
    :is="cardComponent"
    :to="isNuxtLink ? href : undefined"
    :href="!isNuxtLink ? href : undefined"
    :target="hrefTarget"
    :class="[
      $style.cardCore,
      classBackground,
      classCard,
      classImageBackground,
      disabled && $style.disabled,
      isFixedWidth && $style.isFixedWidth,
      isImageBackground && $style.imageBackground,
      isHoverable && $style.hoverable,
      isOverflowHidden && $style.overflowHidden,
    ]"
    :style="style"
    @click="onClick($event)"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <div :class="[$style.cardContent, classContent]">
      <slot name="beforeHeader" />

      <div v-if="icon || header" :class="$style.contentWrapper">
        <div v-if="icon" :class="$style.cardIcon">
          <SvgIcon :icon-path="`icons/new/${icon}.svg`" :width="iconSize" :height="iconSize" />
        </div>

        <div v-if="header" :class="[$style.textContent, classTextContent]">
          <component :is="sizeTitle" :class="[$style.title, weightTitle]" v-html="header.title" />

          <div
            v-if="header.subtitle"
            :class="[$style.subtitle, classSubtitle, sizeSubtitle]"
            v-html="header.subtitle"
          />
        </div>
      </div>

      <div v-if="$slots.default" :class="[$style.slotData, classSlot]">
        <slot />
      </div>

      <div
        v-if="hrefTitle"
        :class="[$style.linkTitleWrapper, isHrefTypeButtonOnHover && $style.isHrefTypeButtonOnHover]"
      >
        <NewButton v-if="isHrefTypeButtonOnHover" :class="$style.cardLinkBtn" expanded size="md">{{
          hrefTitleOnHover
        }}</NewButton>

        <div
          class="body2 semibold"
          :class="[$style.cardLink, isCardDisabled ? 'nd-text-secondary' : 'nd-text-primary underline']"
          v-html="currentHrefTitle"
        />
      </div>

      <img
        v-if="isImageAbsoluteBottom && !$isMobile"
        v-lazy-load
        :data-not-lazy="dataNotLazy"
        :class="[classImage, $style.imageAbsoluteBottom, imageHeight && $style.withHeight]"
        :src="imageSrc"
        :style="{ height: `${imageHeight}px` }"
      />

      <img
        v-if="(isImageAbsoluteBottom || isImageBackground) && $isMobile && hasMobileImage"
        v-lazy-load
        :data-not-lazy="dataNotLazy"
        :class="$style.imageExpandedByWidth"
        :src="imageSrcMobile"
      />
    </div>
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import SvgIcon from "@/components/SvgIcon/index.vue";
import NewButton from "@/elements/New/Button/index.vue";
import card from "./mixins/card";

export default Vue.extend({
  name: "NewCard",

  components: {
    NewButton,
    SvgIcon,
  },

  mixins: [card],

  computed: {
    ...mapState(["isAutoTest"]),
    cardComponent() {
      if (!this.href) {
        return "div";
      } else if (this.isNuxtLink) {
        return "NuxtLink";
      }
      return "a";
    },
    iconSize() {
      return this.$isMobile ? "36" : "48";
    },
    imageSrc() {
      const props: any = {};
      if (this.imageHeight && (!process.client || window.devicePixelRatio === 1)) {
        props.height = `${this.imageHeight}px`;
      }

      const path = this.isAbsolutePathImage ? this.image : `/img/new/${this.image}.png`;
      return this.$img(path, props, { preset: "webp" });
    },
    imageSrcMobile() {
      return this.$img(`/img/new/${this.image}-mobile.png`, {}, { preset: "webp" });
    },
    isNuxtLink() {
      return this.href && !this.href.startsWith("http");
    },
    dataNotLazy() {
      return this.isAutoTest ? "data-not-lazy" : undefined;
    },
    style() {
      return this.isImageBackground && !this.$isMobile
        ? {
            backgroundImage: `url('${this.imageSrc}')`,
          }
        : {};
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/New/Card/index";
</style>
