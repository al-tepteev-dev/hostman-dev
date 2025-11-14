<template>
  <main :class="['modern', $style.wrapper]">
    <div v-if="categories.length" :class="$style.docsWrapper">
      <DocsSideMenu
        :class="[
          $style.docsSideMenuWrapper,
          isMobileMenuOpened && $style.docsMenuOpened,
          $isMobile && $style.docsMenuRetracted,
        ]"
        :categories="categories"
        :docs-list="docsList"
        :opened-route="openedRoute"
        @close-menu="isMobileMenuOpened = false"
      />
      <div :class="[$style.docsMain, $isMobile && $style.docsMainExpanded]">
        <div id="docs-left-affix-base">
          <NuxtChild
            :opened-route="openedRoute"
            :docs-list="docsList"
            @title-change="articleTitle = $event"
            @toggle-menu="toggleMenu"
          />
          <DocsIndex
            v-if="isIndex"
            :docs-list="docsList"
            :categories="categories"
            :product-docs="mostViewedArticles"
            @toggle-menu="toggleMenu"
          />
        </div>
      </div>
    </div>
    <div v-else key="loader" :class="$style.loaderContainer">
      <TwRingLoader />
    </div>
  </main>
</template>

<script lang="ts">
import PageHeader from "@/components/PageHeader/index.vue";
import AdvantagesBlock from "@/components/AdvantagesBlock/index.vue";
import MostViewedBlock from "@/components/DocsIndex/MostViewedBlock/index.vue";
import DocsIndex from "@/components/DocsIndex/index.vue";
import DocsSideMenu from "@/components/DocsIndex/DocsSideMenu/index.vue";
import TwButton from "@/elements/TwButton/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import TwRingLoader from "@/elements/TwRingLoader/index.vue";
import getPageMeta from "@/mixins/getPageMeta";

export default {
  name: "HelpWrapper",
  components: {
    TwRingLoader,
    SvgIcon,
    TwButton,
    DocsSideMenu,
    DocsIndex,
    MostViewedBlock,
    AdvantagesBlock,
    PageHeader,
  },
  mixins: [getPageMeta],
  scrollToTop: true,
  data() {
    return {
      isMobileMenuOpened: false,
      docsList: [],
      mostViewedArticles: [],
      categories: [],
      articleTitle: null,
      advantages: {
        label: "Getting Started with Hostman",
        list: [
          {
            title: "How to Create a Server",
            description:
              "Effortlessly Launch Your Server: A Quick Guide to Setting Up, Configuring, and Running Your New Server with Maximum Speed.",
            link: "/",
          },
          {
            title: "PaaS",
            description:
              "Simplify Your Development Journey: Effortlessly Create Your PaaS Service for Streamlined Operations and Enhanced Efficiency.",
            link: "/",
          },
          {
            title: "Unix",
            description:
              "Unlock Limitless Possibilities: Subscribe to our Unix Service for Seamless Performance and Unparalleled Flexibility in Your Operations.",
            link: "/",
          },
          {
            title: "DBaaS",
            description:
              "Unlock Limitless Possibilities: Subscribe to our Unix Service for Seamless Performance and Unparalleled Flexibility in Your Operations.",
            link: "/",
          },
        ],
      },
    };
  },
  async fetch() {
    this.docsList = await this.$store.dispatch("docsContents/getDocsList");
    const categories = [];
    this.docsList.forEach((rootArticle) => {
      if (!categories.find((category) => category.name === rootArticle.category.name)) {
        categories.push(rootArticle.category);
      }
    });
    const mostViewedArticles = this.showOnMain(this.docsList);
    this.categories = categories.sort((a, b) => a.order - b.order);
    this.mostViewedArticles = mostViewedArticles.sort((a, b) => a.order - b.order);
  },
  head() {
    return {
      ...this.getPageMeta({
        title: "Hostman Documentation",
        description:
          "Guidelines and documentation for overseeing the IT infrastructure of Hostman, a cloud service provider.",
      }),
    };
  },
  computed: {
    isIndex() {
      return this.$route.path === "/docs/";
    },
    openedRoute() {
      return this.$route.path
        .toLowerCase()
        .split("/")
        .slice(2)
        .filter((element) => element !== "");
    },
  },
  watch: {
    "$route.path"() {
      this.isMobileMenuOpened = false;
    },
    isMobileMenuOpened(value) {
      if (value) {
        document.body.classList.add(this.$style.noScroll);
      } else {
        document.body.classList.remove(this.$style.noScroll);
      }
    },
  },
  methods: {
    toggleMenu() {
      this.isMobileMenuOpened = !this.isMobileMenuOpened;
    },
    showOnMain(docsList) {
      let result = [];
      docsList.forEach((element) => {
        if (element.show_on_main) {
          const path = this.makePath(element);
          const title = element.article_title ? element.article_title : element.menu_title;
          result.push({
            title,
            path,
            order: element.show_on_main,
          });
        }
        if (element.children) {
          result = result.concat(this.showOnMain(element.children));
        }
      });
      return result;
    },
    makePath(docArticle) {
      let path = docArticle.path;
      if (docArticle.parent) {
        path = this.makePath(docArticle.parent) + "/" + path;
      }
      return path;
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  max-width: 1192px;
  padding-left: 32px;
  padding-right: 32px;
  margin: 0 auto;
  @media (max-width: $mb-mobile) {
    padding: 34px;
  }
}

.docsWrapper {
  display: grid;
  column-gap: 50px;
  grid-template-columns: 250px 828px;
  margin-bottom: 90px;

  @media (max-width: $mb-mobile) {
    grid-template-columns: 1fr;
    margin-bottom: 40px;
    margin-left: -40px;
  }
}

.docsMain {
  @media (max-width: $mb-mobile) {
    width: 100%;
    overflow-wrap: break-word;
    padding-left: 34px;
  }
}

.docsSideMenuWrapper {
  margin-top: 144px;
  padding-bottom: 24px;
  width: 250px;
  flex-shrink: 0;
  transition: $transition-default;

  @media (max-width: $mb-mobile) {
    margin-top: -34px;
    position: fixed;
    width: 100%;
    min-height: 100%;
    margin-left: -100%;
    padding-top: 0;
    z-index: 1001;
  }
}

.docsMainExpanded {
  @media (max-width: $mb-mobile) {
    margin-bottom: 56px;
  }
}

.docsSideMenuWrapper.docsMenuOpened {
  margin-left: 0;
}

.docsSideMenuWrapper.docsMenuRetracted {
  @media (min-width: $mobile) {
    padding-left: 0;
    margin-left: -296px;
  }
}

.mainPart {
  display: grid;
  row-gap: 48px;
}

.mostViewedContainer {
  background-color: $white;
  border-radius: 15px;
  padding: 57px 32px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.mostViewedHeader {
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  text-transform: uppercase;
}

.articleContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 18px;
  font-weight: 500;
}

.article {
  color: $black;
  padding: 6px 12px;
  border-radius: 10px;
  border-bottom: 1px solid $black;

  &:hover {
    color: $primary;
  }
}

.unwrapped {
  padding: 0;
  gap: 28px;
}

.docsMobileNavButton {
  margin-bottom: 24px;
  background-color: $white !important; // почему-то на проде этот стиль улетает вниз
  border-radius: 15px;
}

.navButtonIcon {
  margin-left: auto;
}

.noScroll {
  overflow-y: hidden !important;
}

.loaderContainer {
  width: 100%;
  padding-top: 200px;
  max-width: max-content;
  margin: auto;
}
</style>
