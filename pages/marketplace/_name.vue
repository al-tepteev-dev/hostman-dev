<template>
  <main class="layout-content">
    <NewLoader v-if="isLoading" />
    <section v-else :class="$style.core">
      <LazyHydrate when-idle="when-idle">
        <NewBlockTop
          :breadcrumb="breadcrumb"
          :class-image="$style.img"
          :class-text-content="$style.textContent"
          :has-mobile-image="false"
          :header="header"
          :is-absolute-path-image="true"
          :image="imageSrc"
          image-type="absolute-bottom"
          image-height="320"
          :paddings-size="paddingsSize"
          width="996"
        >
          <div :class="$style.btns">
            <NewButton size="md" @click="handleSignUpButton"> Launch {{ app.name }} now</NewButton>
            <NewButtonLink size="md" target="_blank" theme="primary" :href="app.website"> {{ linkName }}</NewButtonLink>
          </div>
        </NewBlockTop>
      </LazyHydrate>

      <LazyHydrate when-idle="when-idle">
        <NewContent width="996">
          <div class="body2" :class="$style.pageContent" v-html="pageContent"></div>
        </NewContent>
      </LazyHydrate>
    </section>
  </main>
</template>

<script lang="ts">
import { marketplaceSeoFormulas } from "@/utils/seo-formulas/marketplace";
import { marketplaceApi } from "../../services/marketplace/marketplaceApi";
import { MarketplaceItemBaseModel } from "@/services/marketplace/models/MarketplaceItemBaseModel";
import {
  getImagesSrc,
  getParsedLongDescription,
  MarketplaceItemModel,
} from "../../services/marketplace/models/MarketplaceItemModel";

import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import registrationAccount from "@/mixins/registrationAccount.ts";
import { marketplaceHref } from "@/utils/links/common";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { ServiceType } from "~/types/Service";

export default {
  name: "MarketplaceItem",

  components: {
    LazyHydrate,
    NewContent: () => import("@/components/New/Content/index.vue"),
    NewButton: () => import("@/elements/New/Button/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewButtonLink: () => import("@/elements/New/Button/Link/index.vue"),
    NewLoader: () => import("@/elements/New/Loader/index.vue"),
  },

  mixins: [getPageMeta, registrationAccount],

  layout: "new-design",

  data() {
    return {
      isLoading: true,
      app: {} as MarketplaceItemModel,
    };
  },

  async fetch() {
    if (this.$store.state.marketplaceApps.length === 0) {
      await this.$store.dispatch("fetchMarketplaceApps");
    }

    const currentApp = this.$store.state.marketplaceApps.find(
      (app: MarketplaceItemBaseModel) => app.path === this.$route.params.name
    );

    if (!currentApp) {
      this.$nuxt.error({
        statusCode: 404,
        message: "Page not found",
      });
      return;
    }

    this.app = await marketplaceApi.fetchMarketplaceItem(currentApp.id);
    this.isLoading = false;
  },

  head() {
    return this.getPageMeta({
      title: this.seoData.title,
      description: this.seoData.description,
    });
  },

  computed: {
    breadcrumb() {
      return this.$isMobile
        ? [{ name: "Marketplace", href: marketplaceHref }]
        : [
            { name: "Marketplace", href: marketplaceHref },
            { name: `${this.app.name} ${this.app.version}`, href: marketplaceHref },
          ];
    },
    imageSrc() {
      return getImagesSrc(this.app.images)[0];
    },
    header() {
      return {
        title: this.app.name,
        subtitle: this.app.overview || this.app.description,
      };
    },
    pageContent() {
      return getParsedLongDescription(this.app.pageContent || "");
    },
    linkName() {
      try {
        return new URL(this.app.website).hostname;
      } catch {
        return this.app.website;
      }
    },
    paddingsSize() {
      return this.$isMobile ? "std" : "compact";
    },
    seoData() {
      const appSeoData = marketplaceSeoFormulas.find((doc) => doc.name === this.$route.params.name);
      const defaultSeoData = {
        title: "Hostman - cloud platform that deploys and scales your web applications",
        description: "Cloud hosting for startups and developers",
      } as ProductSeoData;

      return {
        ...defaultSeoData,
        ...(appSeoData
          ? {
              title: appSeoData.title,
              description: appSeoData.description,
            }
          : {}),
      };
    },
  },

  methods: {
    handleSignUpButton() {
      const compatiblePreset = this.app.requirements
        ? this.$store.state.servicesTariffs.vdsTariffs.find(
            (tariff: any) =>
              tariff.cpu >= this.app.requirements.cpuMin &&
              tariff.ram * 1024 >= this.app.requirements.ramMin &&
              tariff.disk * 1024 >= this.app.requirements.diskMin
          )
        : this.$store.state.servicesTariffs.vdsTariffs[0];

      const availabilityZone = this.getPreparedLocation(compatiblePreset.location);
      this.openRegistrationModalWithTariff(
        ServiceType.Vds,
        {
          id: compatiblePreset.id,
          bandwidth: compatiblePreset.bandwidth,
          publicIp: true,
          osId: this.app.osId,
          softwareId: this.app.softwareId,
        },
        availabilityZone
      );
    },
  },
};
</script>

<style lang="scss" module>
@import "assets/styles/new/typography";

.btns {
  display: flex;
  gap: 8px;

  @include mobile {
    flex-direction: column;
  }
}
.core {
  display: grid;
  gap: 56px;

  @include desktop {
    gap: 64px;
  }
}
.img {
  border-radius: 16px 0 0 0;
  min-width: 408px;
  left: calc(100% - 408px);
}
.textContent {
  @include desktop {
    max-width: 441px;
  }
}

.pageContent {
  margin-top: -24px;
  padding-left: 20px;

  h2,
  h3,
  p {
    margin: 24px 0;
  }

  @include desktop {
    max-width: 768px;
    padding-left: 24px;
  }

  ul,
  ol {
    padding-left: 20px;

    @include desktop {
      padding-left: 24px;
    }
  }

  a {
    @include link(var(--link-primary), var(--link-primary-hover));
    text-decoration: underline;
  }
}
</style>
