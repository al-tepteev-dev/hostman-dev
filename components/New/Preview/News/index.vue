<template>
  <NewContentScroll data-test-id="news-container" :header="header" :slide-step="408">
    <template #action>
      <NewButtonLink alternative size="md" theme="primary" :href="tutorialsHref">More News</NewButtonLink>
    </template>

    <template #default="{ isDrag }">
      <div
        :class="$style.core"
        :style="{
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        }"
      >
        <NewPreviewNewsCard v-for="item in items" :key="item.id" :disabled="isDrag" :item="item" />
      </div>
    </template>
  </NewContentScroll>
</template>

<script lang="ts">
import Vue from "vue";
import NewButtonLink from "@/elements/New/Button/Link/index.vue";
import NewContentScroll from "@/components/New/Content/Scroll/index.vue";
import { fetchTutorialsForMainPage } from "@/utils/fetchTutorials";
import NewPreviewNewsCard from "@/components/New/Preview/News/Card/index.vue";
import { tutorialsHref } from "@/utils/links/common";
import type { Header } from "@/types/Header";

const DESCRIPTION_PREVIEW_SYMBOLS = 70;

export default Vue.extend({
  name: "NewPreviewNews",

  components: { NewButtonLink, NewPreviewNewsCard, NewContentScroll },

  props: {
    header: {
      type: Object as () => Header,
      default: () => ({
        title: "Latest News",
      }),
    },
    topic: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      items: [],
      tutorialsHref,
    };
  },

  async fetch() {
    if (this.topic) {
      const { data } = await this.$nuxt.context.store.dispatch("tutorials/getTutorials", {
        limit: 10,
        topic: this.topic,
      });
      this.items = data;
    } else {
      const { data } = await fetchTutorialsForMainPage(this.$nuxt.context);
      this.items = data;
    }
  },

  methods: {
    truncateString(html: string) {
      let stringWithoutTags = html.replace(/<[^>]*>/g, "");

      if (stringWithoutTags.length > DESCRIPTION_PREVIEW_SYMBOLS) {
        stringWithoutTags = stringWithoutTags.substring(0, DESCRIPTION_PREVIEW_SYMBOLS);
      }
      return `${stringWithoutTags}...`;
    },
  },
});
</script>

<style lang="scss" module>
.core {
  display: grid;
  gap: var(--gap-card);
}
.card {
  width: 384px;
}
</style>
