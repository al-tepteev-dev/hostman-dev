<template>
  <NewCard
    :class-content="$style.faqSectionItem"
    hoverable
    itemprop="mainEntity"
    itemscope
    itemtype="https://schema.org/Question"
    with-hover
    @click-card="toggleOpened"
  >
    <div :class="$style.questionWrapper">
      <div :class="[$style.question, 'body2 medium']" itemprop="name">
        {{ item.question }}
      </div>
      <div :class="$style.iconWraper">
        <SvgIcon :class="opened && $style.opened" color="is-inherit" icon-path="icons/new/chevron-down.svg" />
      </div>
    </div>
    <div
      :class="[$style.answer, 'body2 nd-text-secondary', opened && $style.visible]"
      itemprop="acceptedAnswer"
      itemscope
      itemtype="https://schema.org/Answer"
    >
      <span itemprop="text" v-html="item.answer" />
    </div>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import NewCard from "@/elements/New/Card/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import type { Question } from "@/types/QuestionsAlternate";

export default Vue.extend({
  name: "NewFaqItem",
  components: { NewCard, SvgIcon },
  props: {
    item: {
      type: Object as () => Question,
      required: true,
    },
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    toggleOpened(event: MouseEvent) {
      const elm = event.target as HTMLElement;

      if (["VIDEO", "A"].includes(elm.tagName)) {
        // Not close item when ignored elements clicked inside answer
        return;
      }
      this.opened = !this.opened;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.faqSectionItem {
  padding: 20px;

  @include desktop {
    padding: 28px 24px 28px 32px;
  }
}
.questionWrapper {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}
.question,
.answer {
  max-width: 564px;
  width: 100%;
}
.iconWraper {
  color: var(--icon-primary);
}
.opened {
  transform: rotate(180deg);
}
.answer {
  transition: var(--transition-all);
  visibility: hidden;
  height: 0;
  opacity: 0;
  br {
    display: initial !important;
  }
  ol,
  ul {
    margin: 24px 0 24px 16px;
    padding-left: 16px;
  }
  a {
    color: var(--link-accent);
    transition: var(--transition-color);
    &:hover {
      color: var(--link-accent-hover);
    }
  }
  video {
    width: 100%;
  }
}
.visible {
  height: auto;
  opacity: 1;
  visibility: visible;
  margin-top: 16px;
}
</style>
