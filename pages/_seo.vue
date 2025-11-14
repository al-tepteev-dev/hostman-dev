<template>
  <main class="layout-content" :class="$style.seoPage">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop :breadcrumb="breadcrumb" :header="topBlock.header" image="top-block-page-seo">
        <NewButton @click="openSignUpModal" v-text="page.blocks.top.button" />
      </NewBlockTop>
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBenefits
        v-if="page.blocks.features"
        :class-text-content="$style.textContent"
        :cards="benefitsFirst.cards"
        :cols="4"
        :header="benefitsFirst.header"
        header-justify="center"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBenefits
        v-if="page.blocks.textBlock"
        :header="products.header"
        header-justify="center"
        :cards="products.cards"
        :cols="products.cols"
        :width="products.width"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCard v-if="isDbPage && !products.cards" :header="products.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewTariffs :header="tariffs.header" :product-seo-data="seoData" :service-page="tariffs.service" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPartners />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBenefits
        :class-text-content="$style.textContent"
        :cards="benefitsSecond.cards"
        :header="benefitsSecond.header"
        header-justify="center"
        width="894"
      />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockMarketplace v-if="!isDbPage" :header="marketplace.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBenefitsHorizontal />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewPreviewReviews v-if="page.blocks.reviews" :has-partners="false" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCard v-if="page.blocks.textBlock2" :header="benefitsThird.header" :class-content="$style.cardContent">
        <div :class="$style.gridBenefitsContent" class="body2">
          <div :class="$style.gridBenefitsItems">
            <div v-for="(item, idx) in benefitsThird.items" :key="idx">
              <div class="semibold" v-text="item.header.title" />
              <div class="nd-text-secondary" v-text="item.header.subtitle" />
            </div>
          </div>

          <NewButton :class="$style.btn" @click="openSignUpModal" v-text="page.blocks.textBlock2.button" />
        </div>
      </NewBlockCard>
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleContent">
      <NewLocationsMap :header="mapSection.header" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockCallToAction :header="сtaSection.header" :image="сtaSection.image" weight-title="medium" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewFaq :items="faq.items" :header="faq.header" header-justify="space-between">
        <template #action>
          <NewButtonLink alternative :href="faq.href" icon="bubble" icon-placement="left" theme="primary">
            Have a question?
          </NewButtonLink>
        </template>
      </NewFaq>
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import { contactsHref } from "@/utils/links/common";
import type { CardNew } from "@/types/CardNew";
import { mapMutations } from "vuex";
import seoPages from "@/utils/seo-pages";
import { whenVisibleContentWithFullHeader, whenVisibleOpt } from "@/utils/lazyHydrate";
import type { Header } from "@/types/Header";

export default {
  name: "TemplatePage",

  components: {
    LazyHydrate,
    NewBlockCard: () => import("@/components/New/Block/Card/index.vue"),
    NewBlockCallToAction: () => import("@/components/New/Block/CallToAction/index.vue"),
    NewButton: () => import("@/elements/New/Button/index.vue"),
    NewButtonLink: () => import("@/elements/New/Button/Link/index.vue"),
    NewBlockBenefits: () => import("@/components/New/Block/Benefits/index.vue"),
    NewBlockBenefitsHorizontal: () => import("@/components/New/Block/Benefits/Horizontal/index.vue"),
    NewBlockMarketplace: () => import("@/components/New/Block/Marketplace/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewPartners: () => import("@/components/New/Partners/index.vue"),
    NewTariffs: () => import("@/components/New/Tariffs/index.vue"),
    NewLocationsMap: () => import("@/components/New/Locations/Map/index.vue"),

    NewPreviewReviews: () => import("@/components/New/Preview/Reviews/index.vue"),
    NewFaq: () => import("@/components/New/Faq/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  asyncData({ params, error }) {
    const page = seoPages.find((page) => page.route === params.seo);
    if (!page) {
      error({
        statusCode: 404,
        message: "No such page",
      });
    }
    return { page };
  },

  data() {
    return {
      page: null,
      mapSection: {
        header: {
          title: "High-Performance Edge",
          subtitle:
            "The premium network for production, high-performance applications. Experience 30-50% faster <br/>response time and more global POPs, backed by a 99.9% uptime SLA",
        },
      },
      сtaSection: {
        header: {
          title: "Get started in seconds",
          subtitle: "Hostman reduces costs to DevOps teams, making it the <br/>ultimate product for your business",
        },
        image: "cta-block-page-seo",
      },
      whenVisibleContent: whenVisibleContentWithFullHeader(this.$isMobile),
      whenVisibleOpt,
    };
  },

  head() {
    const pageHead = this.getPageMeta({
      title: this.seoData.title,
      host: this.seoData.host,
    });
    pageHead.meta.push(...this.seoData.meta);
    return pageHead;
  },

  computed: {
    breadcrumb() {
      return [
        {
          name: this.page?.meta,
        },
      ];
    },
    isDbPage() {
      return this.page?.isDb;
    },
    seoData() {
      return {
        title: this.page.title,
        description: this.page.description,
        host: `${process.env.domain}${this.page.route}/`,
        meta: [
          {
            name: "title",
            hid: "title",
            content: this.page.title,
          },
          // FACEBOOK
          {
            property: "og:site_name",
            hid: "og:site_name",
            content: "Hostman",
          },
          {
            property: "og:type",
            hid: "og:type",
            content: `article`,
          },
          {
            property: "og:locale",
            content: "en_US",
          },
          // TWITTER
          {
            hid: "twitter:card",
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:creator",
            hid: "twitter:creator",
            content: `@hostman_com`,
          },
          {
            name: "twitter:description",
            hid: "twitter:description",
            content: this.page.description,
          },
        ],
      };
    },
    topBlock() {
      return {
        header: this.createHeader(this.page.blocks.top),
      };
    },
    benefitsFirst() {
      return {
        header: this.createHeader(this.page.blocks.features),
        cards: this.transferToCardNewType(this.page.blocks.features.items),
      };
    },
    products() {
      return {
        header: this.createHeader(this.page.blocks.textBlock),
        cards: this.page.blocks.textBlock.cards,
        cols: this.page.blocks.textBlock.layoutParams?.cols,
        width: this.page.blocks.textBlock.layoutParams?.width,
      };
    },
    tariffs() {
      return {
        header: this.createHeader(this.page.blocks.pricing),
        service: this.page.service,
      };
    },
    benefitsSecond() {
      return {
        header: this.createHeader(this.page.blocks.advantages),
        cards: this.transferToCardNewType(this.page.blocks.advantages.items),
      };
    },
    benefitsThird() {
      return {
        header: this.createHeader(this.page.blocks.textBlock2),
        items: this.page.blocks.textBlock2.items,
      };
    },
    marketplace() {
      return {
        header: this.createHeader(this.page.blocks.os),
      };
    },
    faq() {
      return {
        header: {
          title: "Frequently Asked Questions",
        },
        items: this.page.blocks.faq.general,
        href: contactsHref,
      };
    },
  },

  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
    transferToCardNewType(items) {
      const cards: CardNew[] = [];
      items.forEach((el) => {
        cards.push({
          header: this.createHeader(el),
          icon: el.icon,
        });
      });
      return cards;
    },
    createHeader(item) {
      return {
        title: item.title,
        subtitle: item.subtitle,
      } as Header;
    },
  },
};
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.btn {
  display: inline-block;

  @include desktop {
    align-self: start;
    width: max-content;
  }
}

.gridBenefitsContent {
  display: grid;
  gap: 20px;

  @include desktop {
    gap: 32px;
  }
}

.seoPage {
  .textContent {
    display: grid;
    gap: 16px;

    @include desktop {
      gap: 12px;
    }
  }

  .cardContent {
    display: grid;
    gap: 12px;

    @include desktop {
      gap: 24px;
    }
  }
}

.gridBenefitsItems {
  display: grid;
  gap: 16px;

  @include desktop {
    gap: 24px;
  }
}
</style>
