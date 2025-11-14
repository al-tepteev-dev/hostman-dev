<template>
  <div :class="$style.articles">
    <TutorialsMain
      v-if="!blogEntry"
      :is-loading="isLoading"
      :main-fetch-data="mainFetchData"
      :remaining-news="remainingNews"
      @fetch-more="$emit('fetch-more')"
    />
    <div v-if="blogEntry" :class="$style.tutorial">
      <news-wrapper :blog-entry="blogEntry" :topics="sortedTopics" is-tutorial />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewsListPage from "@/components/NewsListPage/index.vue";
import { News } from "@/types/News";
import { Tutorial, TutorialsTopic } from "@/types/Tutorials";
import NewsWrapper from "@/components/NewsWrapper/index.vue";
import PageHeader from "@/components/PageHeader/index.vue";
import TutorialsNavigation from "@/components/TutorialsNavigation/index.vue";
import TutorialsMain from "@/components/TutorialsMain/index.vue";

export default Vue.extend({
  name: "TutorialsListTopic",

  components: {
    TutorialsMain,
    TutorialsNavigation,
    PageHeader,
    NewsWrapper,
    NewsListPage,
  },
  scrollToTop: true,
  props: {
    mainFetchData: {
      type: Object as () => {
        popularTutorialsList: Tutorial[];
        newTutorialsList: Tutorial[];
        topics: TutorialsTopic[];
      },
      required: true,
    },
    blogEntry: {
      type: Object as () => News | Tutorial,
      default: null,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    remainingNews: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    currentTopic() {
      return this.mainFetchData.topics?.find((topic) => topic.path === this.$route.params.articleId);
    },
    sortedTopics() {
      return [...this.mainFetchData.topics].sort((a, b) => b.tutorials.length - a.tutorials.length).splice(0, 6);
    },
    breadcrumbs() {
      return [
        {
          name: "Tutorials",
          path: "/tutorials/",
        },
        {
          name: this.currentTopic.name,
        },
      ];
    },
  },
});
</script>

<style lang="scss" module>
.articles {
  min-height: 500px;
}

.tutorial {
  margin-bottom: 64px;
}
</style>
