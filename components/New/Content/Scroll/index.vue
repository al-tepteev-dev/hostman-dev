<template>
  <NewContent :header="header" :header-margin-size="headerMarginSize" :header-justify="headerJustify" width="full">
    <template #action>
      <div :class="$style.scrollActions">
        <slot name="action" />

        <div v-if="hasScrollActions" :class="$style.divider" />

        <NewSliderControlsSteps v-if="hasScrollActions" @prev="scroll(false)" @next="scroll(true)" />
      </div>
    </template>

    <template #default>
      <div :class="$style.core">
        <div
          ref="scrollContainer"
          :class="[$style.scrolledContentWrapper, isDragStart && $style.grabbing]"
          @mousedown="mousedown"
          @mouseleave="mouseleave"
          @mouseup="mouseleave"
          @mousemove="mousemove"
        >
          <div :class="$style.scrolledContent">
            <slot :is-drag="isDragMove" />
          </div>
        </div>
      </div>
    </template>

    <template #bottom>
      <slot name="bottom" />
    </template>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewContent from "@/components/New/Content/index.vue";
import content from "@/components/New/Content/mixins/content";
import NewSliderControlsSteps from "@/components/New/SliderControls/Steps/index.vue";

export default Vue.extend({
  // Компонент, необходимый для блоков, контент которых уходит за границу правого края экрана (со скролом)
  name: "NewContentScroll",

  components: { NewContent, NewSliderControlsSteps },

  mixins: [content],

  props: {
    slideStep: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isDragStart: false,
      isDragMove: false,
      startX: 0,
      scrollLeft: 0,
    };
  },

  computed: {
    hasScrollActions() {
      return !this.$isMobile && !!this.slideStep;
    },
  },

  methods: {
    getScrollChildrenCount(from: Element): number {
      if (!from.childElementCount || from.childElementCount > 1) {
        return from.childElementCount;
      }
      return this.getScrollChildrenCount(from.firstElementChild!);
    },
    // DnD здесь добавлен для "протаскивание" контента, чтобы не скролить данные блоки стандартным способом.
    // Иначе при скроле страницы, попадая в view area данного блока, мы будем прерывать скролл по вертикали и скролить по горизонтали
    // Контент данного блока реагирует на touchpad и DnD
    mousedown(event: MouseEvent) {
      if (!this.$refs.scrollContainer) {
        return;
      }
      const scrollContainer = this.$refs.scrollContainer as HTMLElement;
      event.preventDefault();
      event.stopPropagation();
      this.isDragStart = true;
      this.startX = event.pageX - scrollContainer.offsetLeft;
      this.scrollLeft = scrollContainer.scrollLeft;
    },
    mouseleave() {
      this.isDragStart = false;
      this.isDragMove = false;
    },
    mousemove(event: MouseEvent) {
      if (!this.isDragStart || !this.$refs.scrollContainer) {
        return;
      }
      const scrollContainer = this.$refs.scrollContainer as HTMLElement;
      event.preventDefault();
      event.stopPropagation();
      this.isDragMove = true;
      const x = event.pageX - scrollContainer.offsetLeft;
      // scroll speed ratio
      const walk = (x - this.startX) * 2;
      scrollContainer.scrollLeft = this.scrollLeft - walk;
    },
    scroll(isForward: boolean) {
      if (!this.$refs.scrollContainer) {
        return;
      }
      const scrollContainer = this.$refs.scrollContainer as HTMLElement;
      let isFullScrolled: boolean;
      if (isForward) {
        isFullScrolled = scrollContainer.scrollWidth - scrollContainer.scrollLeft === scrollContainer.offsetWidth;
      } else {
        isFullScrolled = scrollContainer.scrollLeft === 0;
      }

      if (isFullScrolled) {
        scrollContainer.scrollTo({
          left: isForward ? 0 : scrollContainer.scrollWidth,
          top: 0,
          behavior: "smooth",
        });
      } else {
        scrollContainer.scrollTo({
          left: isForward
            ? (scrollContainer.scrollLeft += this.slideStep)
            : (scrollContainer.scrollLeft -= this.slideStep),
          top: 0,
          behavior: "smooth",
        });
      }
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.scrollActions {
  display: block;

  @include desktop {
    display: flex;
    align-items: center;
  }
}
.divider {
  background: var(--divider-color-rgba);
  margin: 0 20px;
  height: 56px;
  width: 1px;
}
.scrolledContentWrapper {
  @include hideScrollbar;
  margin-top: calc(var(--box-x) * -1);
  margin-bottom: calc(var(--box-bottom) * -1);
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-top: var(--box-x);
  padding-bottom: var(--box-bottom);

  &.grabbing {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    scroll-behavior: unset;
  }
}
.scrolledContent {
  padding: 0 max(var(--padding-content-y), calc((100% - var(--screen-1200)) / 2));
  width: fit-content;
}
</style>
