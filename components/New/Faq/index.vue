<template>
  <NewContent width="996" data-test-id="faq-container" :header="header" :header-justify="headerJustify">
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>
    <div :class="$style.faqSection" :itemscope="itemscopeAttribute" :itemtype="itemTypeAttribute">
      <div :class="$style.faqList">
        <NewFaqItem v-for="item in first" :key="item.id" :item="item" />
      </div>
      <div :class="$style.faqList">
        <NewFaqItem v-for="item in second" :key="item.id" :item="item" />
      </div>
    </div>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewContent from "@/components/New/Content/index.vue";
import NewFaqItem from "@/components/New/Faq/Item/index.vue";
import type { Question } from "@/types/QuestionsAlternate";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewFaq",

  components: { NewContent, NewFaqItem },

  props: {
    header: {
      type: Object as () => Header,
      default: () => ({
        title: "Answers to Your Questions",
      }),
    },
    pageName: {
      type: String,
      default: "index",
    },
    splitColIndex: {
      type: Number,
      default: undefined,
    },
    items: {
      type: Array,
      default: null,
    },
    headerJustify: {
      type: String as () => "space-between" | "center",
      default: "center",
    },
    addFaqPageMark: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    itemscopeAttribute() {
      return this.addFaqPageMark ? "" : undefined;
    },
    itemTypeAttribute() {
      return this.addFaqPageMark ? "https://schema.org/FAQPage" : undefined;
    },
    renderedItems() {
      return this.items || this.getQuestionsByUrl(this.pageName);
    },
    midIndex() {
      return this.splitColIndex || Math.ceil(this.renderedItems.length / 2);
    },
    first() {
      return this.renderedItems.slice(0, this.midIndex);
    },
    second() {
      return this.renderedItems.slice(this.midIndex);
    },
  },

  methods: {
    getQuestionsByUrl(path: string): Question[] {
      if (!this.$store.state.productPages || !this.$store.state.productPages.questions) {
        return [];
      }
      return this.$store.state.productPages.questions.filter((question: any) => {
        return question.landing_pages?.find(
          (page: any) => page.landing_pages_id.path === path && question.show_on_product_page
        );
      });
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.faqSection {
  display: grid;
  align-items: start;
  gap: 12px;

  @include desktop {
    gap: 24px;
    grid-template-columns: repeat(2, 1fr);
  }
}
.faqList {
  display: grid;
  gap: 12px;
}
</style>
