<template>
  <div>
    <Transition name="fade" mode="out-in" :class="$style.newsContent">
      <div v-if="article" key="article" :class="$style.pageWrapper">
        <div :class="$style.pageHeader">
          <BreadCrumbs :class="$style.docsBreadcrumbs" :items="breadCrumbsItems" is-page-header="is-page-header" />
          <TwButton
            v-if="$isMobile"
            :class="[$style.docsMobileNavButton]"
            type="is-gray"
            expanded
            @click="$emit('toggle-menu')"
          >
            {{ article?.menu_title }}
            <SvgIcon
              icon-path="icons/navbar-burger.svg"
              color="is-black"
              width="24"
              height="24"
              :class="$style.navButtonIcon"
            />
          </TwButton>
          <h1 :class="$style.articleHeader" itemprop="name">{{ article?.article_title || article?.menu_title }}</h1>
          <div :class="$style.generatedDate">{{ newsCreated }}</div>
        </div>
        <div>
          <news-text
            :news-text="article.article_text"
            is-inter-font
            @update-anchors="updateAnchors"
            @update-active-section="onActiveAnchorUpdate"
          ></news-text>
          <VotedDocsBlock :article-title="article.article_title || article.menu_title" />
          <SocialNetworksShareButtons :title="article?.article_title || article?.menu_title" />
        </div>
        <div id="docs-right-affix-base" :class="$style.rightNav">
          <docs-right-nav
            v-if="!$isMobile && anchors.length"
            :anchors="anchors"
            :active-anchor="activeAnchor"
            :auto-hide="false"
            is-docs-menu
          ></docs-right-nav>
        </div>
      </div>
      <div v-else-if="!isIndex" key="loader" :class="$style.loaderContainer">
        <TwRingLoader />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import PageHeader from "@/components/PageHeader/index.vue";
import NewsText from "@/components/NewsText/index.vue";
import DocsRightNav from "@/components/DocsRightNav/index.vue";
import TwRingLoader from "@/elements/TwRingLoader/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import TwButton from "@/elements/TwButton/index.vue";
import VotedDocsBlock from "@/components/VotedDocsBlock/index.vue";
import SocialNetworksShareButtons from "@/components/SocialNetworksShareButtons/index.vue";
import getPageMeta from "@/mixins/getPageMeta";

async function fetchArticle(ctx, path) {
  if (path === "/docs/") {
    return;
  }
  const data = await ctx.store.dispatch("docsContents/getDocArticle", path);
  if (data?.length === 0) {
    const redirect = await ctx.store.dispatch("docsContents/getRedirect", path);
    if (redirect) {
      ctx.redirect(301, redirect);
    } else {
      ctx.error({
        statusCode: 404,
        message: "Article not found",
      });
    }
  } else {
    return data[0];
  }
}

export default {
  name: "DocsPage",
  components: {
    SocialNetworksShareButtons,
    VotedDocsBlock,
    TwButton,
    SvgIcon,
    TwRingLoader,
    DocsRightNav,
    NewsText,
    PageHeader,
    BreadCrumbs,
  },

  mixins: [getPageMeta],
  scrollToTop: true,
  props: {
    docsList: {
      type: Array,
      required: true,
    },
    openedRoute: {
      type: Array,
      required: true,
    },
  },
  async asyncData(ctx) {
    // хук asyncData() используется только на сервере, для обеспечения отправки корректного status code
    if (process.server) {
      const data = await fetchArticle(ctx, ctx.route.path);
      return {
        asyncDataArticle: data,
      };
    }
  },
  data() {
    return {
      article: null,
      asyncDataArticle: null,
      anchors: [],
      activeAnchor: null,
    };
  },
  async fetch() {
    // хук fetch() используется только на клиенте, для обеспечения отправки корректного status code
    if (process.client) {
      this.article = null;

      this.article = await fetchArticle(this.$nuxt.context, this.$route.path);
      this.$emit("title-change", this.article.menu_title);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  },
  head() {
    if (this.article) {
      const articleTitle = this.article?.article_title || this.article?.menu_title;
      const docsTitleDirectus = this.article?.seo_title;
      const docsDescriptionDirectus = this.article?.seo_description;
      const defaultTitle = `${articleTitle} | Hostman Docs`;
      const defaultDescription = `${articleTitle}. Guides and documentation for managing the IT infrastructure`;

      const title = docsTitleDirectus || defaultTitle;
      const description = docsDescriptionDirectus || defaultDescription;

      return this.getPageMeta({
        title,
        description,
      });
    }
  },
  computed: {
    breadCrumbsItems() {
      if (this.docsList.length === 0) {
        return [];
      }
      let currentPath = "/docs";
      let currentDocsList = this.docsList;
      return [
        { name: "Hostman", path: "/" },
        {
          name: "Docs",
          path: "/docs/",
        },
        ...this.openedRoute.map((route) => {
          currentPath = currentPath + "/" + route;
          const currentDoc = currentDocsList.find((docsListItem) => docsListItem.path === route);
          currentDocsList = currentDoc?.children;
          return {
            name: currentDoc.menu_title,
            path: currentPath,
          };
        }),
      ];
    },
    isIndex() {
      return this.$route.path === "/docs/";
    },
    newsCreated() {
      const date = new Date(this.article.date_created);
      const formattedDate = date
        .toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
        .split(" ");
      const day = formattedDate[1].slice(0, -1); // Удаление запятой после дня

      return `Updated on ${day} ${formattedDate[0]} ${formattedDate[2]}`;
    },
  },
  watch: {
    "$route.path"() {
      this.$fetch();
    },
  },
  created() {
    this.article = this.asyncDataArticle;
  },
  mounted() {
    document.getElementById("footer").style.backgroundColor = "#FFFFFF";
    if (this.article) {
      this.$emit("title-change", this.article.menu_title);
    }
  },
  methods: {
    isStatic() {
      return process.env.NUXT_TARGET === "static";
    },
    updateAnchors(anchors) {
      this.anchors = anchors;
    },
    onActiveAnchorUpdate($event) {
      this.activeAnchor = $event?.id;
    },
  },
};
</script>

<style lang="scss" module>
.pageWrapper {
  margin: 144px 0 0;
  display: grid;
  grid-template-columns: 548px 240px;
  column-gap: 50px;

  @media (max-width: $mb-mobile) {
    margin-top: 112px;
    display: block;
    grid-template-columns: 1fr;
  }
}

.pageHeader {
  display: grid;
  margin-bottom: 36px;
  grid-column-start: 1;
  grid-column-end: 3;
}

.docsBreadcrumbs {
  margin-bottom: 0 !important;
}

.articleHeader {
  font-size: 48px;
  font-weight: 700;
  line-height: 64px;
  margin: 20px 0 4px !important;
}

.generatedDate {
  color: #777991;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}

.rightNav {
  grid-row-start: 2;
  grid-row-end: 5;
  grid-column-start: 2;
}

.loaderContainer {
  width: 100%;
  padding-top: 200px;
  max-width: max-content;
  margin: auto;
}

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

.docsMobileNavButton {
  margin-top: 28px;
  background-color: $white !important;
  border-radius: 15px !important;
  box-shadow: $shadow-small;
  color: $black;
}

.navButtonIcon {
  margin-left: auto;
}
</style>
