<template>
  <component
    :is="contentWrapper"
    :class="$style.core"
    data-test-id="main-section-container"
    :has-mobile-image="false"
    :width="$attrs['width']"
  >
    <NewCardWide
      :class-image="$attrs['class-image']"
      color-subtitle="primary"
      :class-text-content="$attrs['class-text-content']"
      :header="header"
      size-title="h1"
      :image="image"
      :is-absolute-path-image="$attrs['is-absolute-path-image']"
      :image-type="$attrs['image-type']"
      :is-overflow-hidden="$attrs['is-overflow-hidden']"
      :image-height="$attrs['image-height']"
      :has-mobile-image="$attrs['has-mobile-image']"
      :paddings-size="$attrs['paddings-size']"
    >
      <template v-if="breadcrumb" #beforeHeader>
        <NewBreadcrumb :breadcrumb="breadcrumb" :class="$style.breadcrumb" />
      </template>
      <slot>
        <NewRegistrationQuick v-if="hasQuickRegistration" :redirect-url="redirectUrl" />
        <div v-else-if="hasSearch" :class="[$style.search, widthClass]">
          <NewBlockTopSearch :value="value" @input="$emit('input', $event)" />
          <slot name="select" />
        </div>
        <NewBlockTopActions v-else />
      </slot>
    </NewCardWide>

    <NewCardGrid v-if="features.length" :cards="features" card-type="light" :class-grid="$style.grid" />

    <slot name="bottom" />
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import NewBlockTopActions from "@/components/New/Block/Top/Actions/index.vue";
import NewBlockTopSearch from "@/components/New/Block/Top/Search/index.vue";
import NewBreadcrumb, { Breadcrumb } from "@/components/New/Breadcrumb/index.vue";
import NewCardGrid from "@/elements/New/Card/Grid/index.vue";
import NewCardWide from "@/elements/New/Card/Wide/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewRegistrationQuick from "@/components/New/Registration/Quick/index.vue";
import type { CardNew } from "@/types/CardNew";
import type { Header } from "@/types/Header";
import getPageMeta from "@/mixins/getPageMeta";

type СontentWidth = "400" | "497";

export default Vue.extend({
  name: "NewBlockTop",

  components: {
    NewBlockTopActions,
    NewBlockTopSearch,
    NewBreadcrumb,
    NewCardGrid,
    NewCardWide,
    NewContent,
    NewRegistrationQuick,
  },

  mixins: [getPageMeta],

  props: {
    breadcrumb: {
      type: Array as () => Breadcrumb,
      default: undefined,
    },
    contentWidth: {
      type: String as () => СontentWidth,
      default: "400",
    },
    header: {
      type: Object as () => Header,
      required: true,
    },
    features: {
      type: Array as () => CardNew[],
      default: () => [],
    },
    hasQuickRegistration: {
      type: Boolean,
      default: false,
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "top-block-page-main",
    },
    redirectUrl: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: "",
    },
    withContent: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Hostman",
        alternateName: "Hostman Cloud Service Provider",
        url: "https://hostman.com/",
      },
    };
  },

  head() {
    return {
      ...this.getPageMeta({ ldData: this.ldMicrodata }),
    };
  },
  computed: {
    contentWrapper() {
      return this.withContent ? "NewContent" : "section";
    },
    widthClass() {
      const w = `content-w-${this.contentWidth}`;
      return this.$style[w];
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: 48px;

  @include desktop {
    gap: 64px;
  }
}
.grid {
  @include mobile {
    gap: 32px !important;
  }
}
.breadcrumb {
  margin-bottom: -12px;

  @include desktop {
    margin-bottom: -20px;
  }
}
.meta {
  height: 0;
  width: 0;
  visibility: hidden;
}
.search {
  display: grid;
  gap: 12px;

  @include desktop {
    gap: 24px;
  }

  &.content-w-400 {
    @include desktop {
      max-width: 400px;
    }
  }
  &.content-w-497 {
    @include desktop {
      max-width: 497px;
    }
  }
}
</style>
