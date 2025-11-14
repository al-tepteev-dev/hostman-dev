<template>
  <div class="container">
    <page-header title="The Hostman Blog" :subtitle="subTitle" :breadcrumb="breadcrumbs">
      <NewsNavigation />
    </page-header>
    <news-list-page
      v-if="isLoading || newsList.length"
      :is-loading="isLoading"
      :news-list="newsList"
      :remaining-news="remainingNews"
      :columns="3"
      @fetch-more-news="fetchMoreNews"
    />
    <div v-else-if="!isLoading" class="newsSection">No results</div>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import getPageMeta from "@/mixins/getPageMeta";
import PageHeader from "@/components/PageHeader/index.vue";
import NewsListPage from "@/components/NewsListPage/index.vue";
import { fetchController } from "@/utils/fetchBlog";
import { TutorialsResponse } from "@/types/Tutorials";
import { tokenizeQuery } from "@/utils/fetchTutorials";
import TutorialsNavigation from "@/components/TutorialsNavigation/index.vue";
import NewsNavigation from "@/components/NewsListPage/NewsNavigation/index.vue";

export default {
  name: "Blog",
  components: {
    NewsNavigation,
    TutorialsNavigation,
    NewsListPage,
    PageHeader,
  },
  mixins: [getPageMeta],
  scrollToTop: true,
  data() {
    return {
      subTitle:
        "Dive into Hostman product updates, company news, and educational </br>content on how developers and startups can leverage the cloud",
      isLoading: true,
      newsList: [],
      totalNews: 0,
      loadedNews: 0,
      remainingNews: 0,
    };
  },
  async fetch() {
    this.isLoading = true;
    this.newsList = [];
    this.loadedNews = 0;
    this.totalNews = 0;
    this.remainingNews = 0;
    const data = await fetchController(this.$nuxt.context);
    Object.assign(this, data);
    this.isLoading = false;
  },
  head() {
    return this.getPageMeta({
      title: "Hostman Blog - Explore Cloud Technology Insights",
      description:
        "Explore the world of cloud technology with the Hostman Blog. Discover insights, updates, and industry news to stay informed about the latest in cloud computing.",
    });
  },
  computed: {
    ...mapState("blog", ["articles", "currentArticle"]),
    isAuthorized() {
      return this.$store.state.editor.isAuthorized;
    },
    stackEdit() {
      return this.$store.state.editor.stackEdit;
    },
    breadcrumbs() {
      return [
        {
          name: "Blog",
          path: "/blog/",
        },
      ];
    },
  },
  watch: {
    "$route.query.q"() {
      this.$fetch();
    },
  },
  methods: {
    async fetchMoreNews() {
      const limit = this.$route.params.author || this.$route.params.tagname ? 12 : 6;
      const req: TutorialsResponse = await this.$store.dispatch("news/getNews", {
        ...(this.$route.params.topic && { topic: this.$route.params.topic }),
        ...(this.$route.params.tagname && { tag: this.$route.params.tagname }),
        ...(this.$route.query.q && { searchWords: tokenizeQuery(this.$route.query.q as string).words }),
        limit,
        offset: this.loadedNews,
      });
      this.remainingNews = Math.max(this.remainingNews - req.data.length, 0);
      this.loadedNews += req.data.length;
      this.newsList.push(...req.data);
    },
  },
};
</script>

<style scoped lang="scss">
.innerContainer {
  display: grid;
  gap: 48px 36px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 0 auto 120px;
  padding-top: 50px;
  @media only screen and (max-width: $mb-mobile) {
    margin-top: 72px;
    row-gap: 32px;
  }
}

.btnAddArticle {
  display: block;
  margin-left: auto;
  @media only screen and (max-width: $mb-mobile) {
    display: none;
  }
}

.newsSection {
  margin-bottom: 64px;

  @media (max-width: $mb-mobile) {
    margin-bottom: 32px;
  }
}
</style>
