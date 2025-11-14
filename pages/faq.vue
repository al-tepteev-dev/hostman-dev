<template>
  <main class="layout-content">
    <section :class="$style.core">
      <LazyHydrate when-idle="when-idle">
        <NewBlockTop
          v-model="searchQuery"
          :breadcrumb="breadcrumb"
          :header="mainSection.header"
          :image="mainSection.image"
          has-search
          paddings-size="compact"
          :has-mobile-image="false"
          width="996"
        />
      </LazyHydrate>

      <NewLoader v-if="isLoading" />

      <div v-else-if="isFilledFaqContent" :class="$style.core" itemscope itemtype="https://schema.org/FAQPage">
        <LazyHydrate v-for="(items, key, idx) in filteredFaqContent" :key="idx" :when-visible="whenVisibleOpt">
          <NewFaq
            :add-faq-page-mark="false"
            :header="getFaqHeader(key)"
            :items="items"
            header-justify="space-between"
          />
        </LazyHydrate>
      </div>

      <NewContent v-else :header="nothingFoundSection.header" />
    </section>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { whenVisibleOpt } from "@/utils/lazyHydrate";

interface FaqMicrodata {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

const og = "https://hostman.com/img/og/faq.png";

export default {
  name: "FaqPage",

  components: {
    LazyHydrate,
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewContent: () => import("@/components/New/Content/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
    NewLoader: () => import("@/elements/New/Loader/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      isLoading: true,
      breadcrumb: [{ name: "FAQ" }],
      nothingFoundSection: {
        header: {
          title: "Nothing found :(",
        },
      },
      whenVisibleOpt,
      searchQuery: "",
      questions: [],
      mainSection: {
        header: {
          title: "Frequently <br/>Asked Questions",
        },
        image: "top-block-page-faq",
      },
      seoData: {
        title: "Hostman FAQ - Frequently Asked Questions",
        description:
          "Hostman provides a comprehensive FAQ section that offers answers to common queries. Users can find valuable information about our cloud services and solutions in this neutral and informative resource.",
      } as ProductSeoData,
    };
  },

  async fetch() {
    this.questions = await this.$store.dispatch("productPages/getFilteredQuestions");
    this.isLoading = false;
  },

  head() {
    return this.getPageMeta({
      title: this.seoData.title,
      description: this.seoData.description,
      imageURL: og,
      ldData: this.ldMicrodata,
    });
  },

  computed: {
    ldMicrodata() {
      const ldMicrodata = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [] as FaqMicrodata[],
      };

      ldMicrodata.mainEntity = Object.values(this.questions).flatMap((faqs) =>
        faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        }))
      );
      return ldMicrodata;
    },
    filteredFaqContent() {
      return Object.entries(this.questions).reduce((acc, [topic, list]) => {
        const filteredList = list.filter((el) => {
          return (
            el.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            el.answer.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
        if (filteredList.length) {
          acc[topic] = filteredList;
        }
        return acc;
      }, {});
    },
    isFilledFaqContent() {
      return Object.keys(this.filteredFaqContent).length !== 0;
    },
  },

  methods: {
    getFaqHeader(key: string) {
      const title = this.$store.state.productPages.pages[key].faq_page_title;
      return {
        title,
      };
    },
  },
};
</script>
<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: 56px;

  @include desktop {
    gap: 64px;
  }
}
</style>
