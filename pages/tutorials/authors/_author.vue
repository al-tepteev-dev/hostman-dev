<template>
  <transition name="fade" mode="out-in">
    <div class="wrapper">
      <div key="breadcrumbs" class="top-wrapper">
        <div v-if="authorDetails" class="author-info">
          <page-header :breadcrumb="authorBreadcrumbs">
            <div class="nlp__header-wrapper">
              <AuthorBio v-if="authorDetails" :author="authorDetails" />
            </div>
          </page-header>
        </div>
      </div>
      <!--    <AuthorTags v-if="authorTags" :tags="authorDetails.tags" />-->
      <AuthorArticles
        v-if="authorData.authorNewsList.length"
        key="news"
        :is-loading="isLoading"
        title="Publications"
        :cards="authorData.authorNewsList"
        :remaining-news="authorData.remainingNews"
        @fetch-more="$emit('fetch-more-news')"
      />
      <AuthorArticles
        v-if="authorData.authorTutorialsList.length"
        key="tutorials"
        title="Tutorials"
        :is-loading="isLoading"
        :cards="authorData.authorTutorialsList"
        is-tutorial
        :remaining-news="authorData.remainingTutorials"
        @fetch-more="$emit('fetch-more-tutorials')"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";
import TutorialsList from "@/components/TutorialsList/index.vue";
import getPageMeta from "@/mixins/getPageMeta";
import PageHeader from "@/components/PageHeader";
import NewsAuthor from "@/components/NewsAuthor";
import { Tutorial } from "@/types/Tutorials";
import AuthorBio from "@/components/AuthorInfo/AuthorBio/index.vue";
import AuthorTags from "@/components/AuthorInfo/AuthorTags/index.vue";
import AuthorArticles from "@/components/AuthorInfo/AuthorArticles/index.vue";
import { News } from "@/types/News";

interface IAuthorData {
  authorNewsList: News[];
  authorTutorialsList: Tutorial[];
  remainingTutorials: number;
  loadedTutorials: number;
  remainingNews: number;
  loadedNews: number;
}

export default Vue.extend({
  name: "AuthorView",

  components: {
    AuthorArticles,
    AuthorTags,
    AuthorBio,
    TutorialsList,
    NewsAuthor,
    PageHeader,
  },

  mixins: [getPageMeta],
  scrollToTop: true,

  props: {
    authorData: {
      type: Object as PropType<IAuthorData>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },

  head() {
    return this.getPageMeta({
      title: `Author — ${this.authorDetails?.name || ""} | Hostman`,
      description: `Author — ${
        this.authorDetails?.name || ""
      }. Participate in our content program and contribute to the development of the community.`,
      host: process.env.BASE_URL_SITE + this.$route.path,
    });
  },

  computed: {
    backURL() {
      return this.$nuxt.context.from || "/tutorials/";
    },
    authorBreadcrumbs() {
      return [
        {
          name: "Tutorials",
          path: "/tutorials/",
        },
        {
          name: `${this.authorDetails?.name}` || "",
        },
      ];
    },
    authorDetails() {
      return this.authorData.authorNewsList?.[0]?.author || this.authorData.authorTutorialsList?.[0]?.author;
    },
    authorTags() {
      return this.authorData.authorNewsList?.[0]?.author.tags || this.authorData.authorTutorialsList?.[0]?.author.tags;
    },
  },
});
</script>
<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}

.top-wrapper {
  background: #cdd9ff;
  margin-left: calc((100vw - 1128px) / 2 * -1);
  margin-right: calc((100vw - 1128px) / 2 * -1);
  margin-bottom: 70px;
  padding-bottom: 50px;
  min-height: 800px;

  @media (max-width: $mb-mobile) {
    margin: -34px -36px 50px;
    padding: 0;
  }
}

.author-info {
  max-width: 1192px;
  padding-left: 32px;
  padding-right: 32px;
  margin-left: auto;
  margin-right: auto;
}

.npl__back-arrow {
  transform: rotate(90deg);
  position: absolute;
  top: -87px;
  margin-left: -32px;
  @media (max-width: $tablet) {
    display: none;
  }

  &:hover {
    color: $primary;
  }
}

.nlp__header-icon {
  transform: rotate(90deg);
  margin-right: 8px;
  flex-shrink: 0;

  @media (max-width: $tablet) {
    margin-right: 0;
  }
}

.nlp__section-header {
  margin-bottom: 24px !important;
}

.nlp__header-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: $tablet) {
    margin-top: 34px;
    margin-bottom: -24px;
  }
}
</style>
