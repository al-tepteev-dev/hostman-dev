<template>
  <transition name="fade" mode="out-in" class="newsContent">
    <div v-if="blogEntry" class="container">
      <news-wrapper :blog-entry="blogEntry" />
      <related-articles
        v-if="blogEntry?.similar_news.length"
        :is-loading="isLoading"
        :news-list="blogEntry?.similar_news"
        :load-initial="3"
        :columns="3"
      />
      <news-participate-banner />
    </div>
    <div v-else class="newsContent" />
  </transition>
</template>

<script>
import { mapState } from "vuex";
import getPageMeta from "@/mixins/getPageMeta";
import NewsWrapper from "@/components/NewsWrapper/index.vue";
import { fetchController } from "@/utils/fetchBlog";
import NewsParticipateBanner from "@/components/NewsParticipateBanner/index.vue";
import NewsListPage from "@/components/NewsListPage/index.vue";
import RelatedArticles from "@/components/RelatedArticles/index.vue";

export default {
  components: {
    RelatedArticles,
    NewsListPage,
    NewsParticipateBanner,
    NewsWrapper,
  },
  mixins: [getPageMeta],
  data() {
    return {
      isLoading: true,
      blogEntry: null,
    };
  },
  async fetch() {
    this.isLoading = true;
    const data = await fetchController(this.$nuxt.context);
    this.blogEntry = data.blogEntry[0];
    this.isLoading = false;
  },
  computed: {
    ...mapState("blog", ["currentArticle", "htmlToRender"]),
  },
  mounted() {
    document.getElementById("footer").style.backgroundColor = "#FFFFFF";
  },
};
</script>

<style scoped lang="scss">
.newsContent {
  min-height: 100vh;
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
