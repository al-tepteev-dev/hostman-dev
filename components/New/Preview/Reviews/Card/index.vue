<template>
  <NewCard
    :class-content="$style.cardContentWrapper"
    :class-slot="$style.cardContent"
    :disabled="disabled"
    :href="item.href"
    href-target="_blank"
    href-title="Read more"
    is-fixed-width
  >
    <div :class="$style.userPreview">
      <img :class="$style.avatar" :src="item.avatar" />
      <div :class="$style.userName">
        <div class="body4 semibold">
          {{ item.author }}
        </div>
        <div v-if="item.description" class="caption nd-text-secondary">
          {{ item.description }}
        </div>
      </div>
    </div>

    <div :class="$style.rating">
      <div :class="$style.stars">
        <SvgIcon
          v-for="(n, idx) in item.rate"
          :key="idx"
          color="is-inherit"
          icon-path="icons/new/star.svg"
          width="20"
          height="20"
        />
      </div>
      <div class="caption medium">{{ rateFormatted }} out of 5</div>
    </div>

    <h3 :class="$style.title">"{{ item.title }}"</h3>

    <div class="body2 nd-text-secondary" :class="$style.description" v-html="item.text" />
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import NewCard from "@/elements/New/Card/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import getPageMeta from "@/mixins/getPageMeta";

export type ReviewItem = {
  id: number;
  title: string;
  author: string;
  avatar: string;
  description: string;
  rate: number;
  text: string;
  date: string;
  href: string;
};

export default Vue.extend({
  name: "NewPreviewReviewsCard",

  components: { NewCard, SvgIcon },
  mixins: [getPageMeta],

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object as () => ReviewItem,
      required: true,
    },
  },

  data() {
    return {
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "Organization",
          name: "Hostman",
          alternateName: "Hostman Cloud Service Provider",
          url: "https://hostman.com",
        },
        author: {
          "@type": "Person",
          name: this.item.author,
        },
        datePublished: this.item.date,
        description: this.item.title,
        reviewRating: {
          "@type": "Rating",
          ratingValue: this.item.rate,
          bestRating: 5,
        },
      },
    };
  },
  head() {
    return {
      ...this.getPageMeta({ ldData: this.ldMicrodata }),
    };
  },

  computed: {
    rateFormatted() {
      return new Intl.NumberFormat("en", { minimumFractionDigits: 1 }).format(this.item.rate);
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/variables";

.cardContentWrapper {
  gap: 16px;

  @include desktop {
    gap: 24px;
  }
}
.cardContent {
  display: flex;
  flex-direction: column;
}
.userPreview {
  display: flex;
  gap: 10px;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  width: 36px;
  height: 36px;

  @include desktop {
    width: 48px;
    height: 48px;
  }
}
.userName {
  display: grid;
  gap: 4px;
}
.rating {
  margin: 16px 0;
  display: flex;
  gap: 12px;
  align-items: center;
}
.stars {
  color: var(--status-attention);
  width: 116px;
  display: flex;
  gap: 4px;
}
.title {
  margin-bottom: 12px;
}
.info {
  flex: 1;
  align-content: end;
  margin-top: 16px;
}
</style>
