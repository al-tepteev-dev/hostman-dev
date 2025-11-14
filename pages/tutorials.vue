<template>
  <div v-if="!isBlank" class="container">
    <transition name="fade" mode="out-in">
      <div v-if="$route.params.tagname" key="tagView">
        <page-header :title="capitalizedTagName" :breadcrumb="tagBreadcrumbs" />
        <nuxt-child
          :news-list="mainFetchData.newTutorialsList"
          :is-loading="isLoading"
          :remaining-news="remainingNews"
          :tag-name="capitalizedTagName"
          @fetch-more-tutorials="fetchMoreAuthorNews"
        />
      </div>
      <div v-else-if="$route.params.author" key="authorView">
        <nuxt-child
          :author-data="authorData"
          :is-loading="isLoading"
          @fetch-more-tutorials="fetchMoreAuthorTutorials"
          @fetch-more-news="fetchMoreAuthorNews"
        />
      </div>
      <!--      <div v-else-if="$route.params.articleId" key="articleView">-->
      <!--        <nuxt-child-->
      <!--          :blog-entry="blogEntry"-->
      <!--          :topics="mainFetchData.topics"-->
      <!--          :tutorials="mainFetchData.newTutorialsList"-->
      <!--          :is-loading="isLoading"-->
      <!--          :remaining-news="remainingNews"-->
      <!--          @fetch-more="fetchMoreTutorials"-->
      <!--        />-->
      <!--      </div>-->
      <div v-else-if="$route.path === '/tutorials/topics'" key="topicsIndexView">
        <nuxt-child :main-fetch-data="mainFetchData" :is-loading="isLoading" :remaining-news="remainingNews" />
      </div>
      <div v-else-if="$route.path === '/tutorials/authors'" key="authorIndex">
        <PageHeader :title="'Hostman authors'" :breadcrumb="authorsBreadcrumbs" />
        <nuxt-child />
      </div>
      <div v-else key="mainView">
        <div class="section">
          <div class="content">
            <div>
              <nuxt-child
                :main-fetch-data="mainFetchData"
                :is-loading="isLoading"
                :remaining-news="remainingNews"
                :blog-entry="blogEntry"
                @fetch-more="fetchMoreTutorials"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { NewsCategories, NewsResponse } from "@/types/News";
import NewsWrapper from "@/components/NewsWrapper";
import getPageMeta from "@/mixins/getPageMeta";
import getTopLinerOffset from "@/mixins/getTopLinerOffset";
import { fetchTutorial, tokenizeQuery } from "@/utils/fetchTutorials";
import { TutorialsResponse } from "@/types/Tutorials";
import PageHeader from "@/components/PageHeader/index.vue";

function isReservedRoute(params): boolean {
  return [undefined, "authors", ...Object.keys(NewsCategories)].includes(params.id);
}

export default Vue.extend({
  name: "TutorialsPostPage",

  components: {
    PageHeader,
    NewsWrapper,
  },

  mixins: [getPageMeta, getTopLinerOffset],

  scrollToTop: true,

  async asyncData(ctx) {
    if (process.server) {
      return await fetchTutorial(ctx);
    }
  },

  data: () => ({
    isLoading: true,
    blogEntry: null,
    NewsCategories,
    authorData: {
      authorNewsList: [],
      authorTutorialsList: [],
    },
    authorsList: [],
    remainingNews: 0,
    loadedNews: 0,
    mainFetchData: {
      popularTutorialsList: [],
      newTutorialsList: [],
      topics: [],
    },
    isBlank: false,
  }),

  async fetch() {
    if (process.client) {
      window.scrollTo({
        top: 0,
      });
      this.isLoading = true;
      this.mainFetchData.popularTutorialsList = [];
      this.mainFetchData.newTutorialsList = [];
      this.remainingNews = 0;
      this.blogEntry = null;
      const data = await fetchTutorial(this.$nuxt.context);
      Object.assign(this, data);
      this.isLoading = false;
    }
  },

  head() {
    return this.getPageMeta({
      title: this.$route.params.id ? NewsCategories[this.$route.params.id] + " | Hostman Blog" : "Tutorials | Hostman",
      description: "Hostman tutorials",
      host: process.env.BASE_URL_SITE + this.$route.path,
    });
  },

  computed: {
    isReservedRoute() {
      return isReservedRoute(this.$route.params);
    },
    pageTitle(): string {
      return this.$route.params.id ? NewsCategories[this.$route.params.id] : "Tutorials";
    },
    breadcrumbs() {
      return [
        {
          name: "Tutorials",
          path: "/tutorials/",
        },
        ...(this.currentTopic
          ? [
              {
                name: this.currentTopic.name,
              },
            ]
          : []),
      ];
    },
    tagBreadcrumbs() {
      return [
        {
          name: "Tutorials",
          path: "/tutorials/",
        },
        {
          name: `Tutorials with tag "${this.capitalizedTagName}"`,
        },
      ];
    },
    authorsBreadcrumbs() {
      return [
        {
          name: "Tutorials",
          path: "/tutorials/",
        },
        {
          name: `Authors`,
        },
      ];
    },
    currentTopic() {
      return this.mainFetchData.topics.find((topic) => topic.path === this.$route.params.articleId);
    },
    capitalizedTagName() {
      return (
        this.mainFetchData?.newTutorialsList[0]?.tags?.find((tag) => {
          return this.$route.params.tagname.toLowerCase() === tag.toLowerCase();
        }) || ""
      );
    },
  },

  watch: {
    "$route.params.topic"() {
      this.$fetch();
    },
    "$route.params.articleId"() {
      this.$fetch();
    },
    "$route.params.author"() {
      this.$fetch();
    },
    "$route.query.q"() {
      this.$fetch();
    },
    "$route.params.tagname"() {
      this.$fetch();
    },
  },

  created() {
    if (this.$route.path === "/tutorials/author") {
      this.isBlank = true;
    }
  },
  mounted() {
    document.getElementById("footer").style.backgroundColor = "#FFFFFF";
  },

  methods: {
    navigateTo(event) {
      this.$router.push({
        path: event,
      });
    },
    async fetchMoreAuthorNews() {
      const limit = 6;
      const req: NewsResponse = await this.$store.dispatch("news/getNews", {
        limit,
        offset: this.authorData.loadedNews,
        author: this.$route.params.author,
      });
      this.authorData.remainingNews = Math.max(this.authorData.remainingNews - req.data.length, 0);
      this.authorData.loadedNews += req.data.length;
      this.authorData.authorNewsList.push(...req.data);
    },

    async fetchMoreAuthorTutorials() {
      const limit = 6;
      const req: TutorialsResponse = await this.$store.dispatch("tutorials/getTutorials", {
        limit,
        offset: this.authorData.loadedTutorials,
        author: this.$route.params.author,
      });
      this.authorData.remainingTutorials = Math.max(this.authorData.remainingTutorials - req.data.length, 0);
      this.authorData.loadedTutorials += req.data.length;
      this.authorData.authorTutorialsList.push(...req.data);
    },

    async fetchMoreTutorials() {
      const limit = this.$route.params.author || this.$route.params.tagname ? 12 : 6;
      const req: TutorialsResponse = await this.$store.dispatch("tutorials/getTutorials", {
        ...(this.$route.params.articleId && { topic: this.$route.params.articleId }),
        ...(this.$route.params.tagname && { tag: this.$route.params.tagname }),
        ...(this.$route.query.q && { searchWords: tokenizeQuery(this.$route.query.q as string).words }),
        limit,
        offset: this.loadedNews,
      });
      this.remainingNews = Math.max(this.remainingNews - req.data.length, 0);
      this.loadedNews += req.data.length;
      this.mainFetchData.newTutorialsList.push(...req.data);
    },
  },
});
</script>

<style lang="scss" scoped>
.nlp__wrapper {
  display: grid;
  grid-gap: 24px;
  margin-bottom: 28px;

  @media (min-width: $tablet) {
    grid-template-columns: 1fr 250px;
    grid-gap: 24px;
    margin-bottom: 40px;
  }
}

.nlp__nav {
  @media (max-width: $tablet) {
    order: -1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
