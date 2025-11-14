<template>
  <NewContentScroll data-test-id="feedback-container" :header="header" :slide-step="408">
    <template #action>
      <div :class="$style.actions">
        <NewButtonLink
          alternative
          :gtm-event="g2Event"
          size="md"
          icon="reviews/g2"
          theme="primary"
          :href="hrefG2"
          href-target="_blank"
          >G2 Rating 4.7</NewButtonLink
        >
        <NewButtonLink
          alternative
          :gtm-event="trustpilotEvent"
          size="md"
          icon="reviews/trustpilot"
          theme="primary"
          :href="hrefTrustpilot"
          href-target="_blank"
          >Trustpilot Rating 4.4</NewButtonLink
        >
      </div>
    </template>

    <template #default="{ isDrag }">
      <div
        :class="$style.core"
        :style="{
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        }"
      >
        <NewPreviewReviewsCard v-for="item in items" :key="item.id" :disabled="isDrag" :item="item" />
      </div>
    </template>

    <template v-if="hasPartners" #bottom>
      <NewPartners :class="$style.partners" />
    </template>
  </NewContentScroll>
</template>

<script lang="ts">
import Vue from "vue";
import NewButtonLink from "@/elements/New/Button/Link/index.vue";
import NewContentScroll from "@/components/New/Content/Scroll/index.vue";
import NewPartners from "@/components/New/Partners/index.vue";
import NewPreviewReviewsCard from "@/components/New/Preview/Reviews/Card/index.vue";
import gtmEventFactory from "@/mixins/gtmEventFactory";
import type { ReviewItem } from "./Card/index.vue";
import getPageMeta from "@/mixins/getPageMeta";

export default Vue.extend({
  name: "NewPreviewReviews",

  components: { NewButtonLink, NewContentScroll, NewPartners, NewPreviewReviewsCard },

  mixins: [getPageMeta, gtmEventFactory],

  props: {
    hasPartners: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      header: {
        title: "Hear it from our users",
      },
      hrefG2: "https://www.g2.com/products/hostman/reviews",
      hrefTrustpilot: "https://www.trustpilot.com/review/hostman.com",
      items: [
        {
          id: 0,
          title: "Hostman Comprehensive Review of Simplicity and Potential",
          author: "Anup k.",
          avatar:
            "https://images.g2crowd.com/uploads/avatar/image/210481/thumb_square_13b249b787cef5b24739407b62bffc9c.jpeg",
          description: "Associate Cloud Engineer",
          rate: 5,
          text: "It been few years that I have been working on Cloud and most of the cloud service...",
          date: "2024-04-03",
          href: "https://www.g2.com/products/hostman/reviews/hostman-review-9491573",
        },
        {
          id: 1,
          title: "A perfect fit for everything cloud services!",
          author: "Mansur H.",
          avatar:
            "https://images.g2crowd.com/uploads/avatar/image/2013375/thumb_square_44c8b026f41c22bff638de288468daec.jpeg",
          description: "Security Researcher",
          rate: 5,
          text: "Hostman's seemless integration, user-friendly interface and its robust features (backups, etc) makes it much easier...",
          date: "2024-02-14",
          href: "https://www.g2.com/products/hostman/reviews/hostman-review-9231378",
        },
        {
          id: 2,
          title: "Superb User Experience",
          author: "Adedeji E.",
          avatar:
            "https://images.g2crowd.com/uploads/avatar/image/2041440/thumb_square_750a03c21e90820fc486fe1379950304.png",
          description: "DevOps Engineer",
          rate: 5,
          text: "For me, Hostman is exceptional because of it's flexibility and user-friendliness. The platform's ability to offer dedicated computing resources acr...",
          date: "2024-04-01",
          href: "https://www.g2.com/products/hostman/reviews/hostman-review-9494793",
        },
        {
          id: 3,
          title: "Streamlined Cloud Excellence!",
          author: "Yudhistira H.",
          avatar:
            "https://images.g2crowd.com/uploads/avatar/image/2041214/thumb_square_ce410bc3db50f174d4cad55cd5fab1a4.jpeg",
          description: "Mid-Market(51-1000 emp.)",
          rate: 5,
          text: "What I like best about Hostman is their exceptional speed of deployment, scalability, and robust security features. Their...",
          date: "2024-03-31",
          href: "https://www.g2.com/products/hostman/reviews/hostman-review-9492804",
        },
        {
          id: 4,
          title: "Seamless and easy to use Hosting Solution for Web Applications",
          author: "Mohammad Waqas S.",
          avatar:
            "https://images.g2crowd.com/uploads/avatar/image/2041375/thumb_square_1a52feeded52b06e699dcc782f3ae3df.png",
          description: "Biotechnologist and programmer",
          rate: 5,
          text: "From the moment I signed up, the process has been seamless and straightforward...",
          date: "2024-04-01",
          href: "https://www.g2.com/products/hostman/reviews/hostman-review-9494355",
        },
        {
          id: 5,
          title: "Availing Different DB Engine Services Provided by Hostman is Convenient for my Organization usecases",
          author: "Mohana R.",
          avatar:
            "https://images.g2crowd.com/uploads/avatar/image/587235/thumb_square_a4b926a2c3d4d86d40989190a327ed16.jpeg",
          description: "Senior Software Engineer",
          rate: 5,
          text: "Hostman manages the cloud operations...",
          date: "2022-03-08",
          href: "https://www.g2.com/products/hostman/reviews/hostman-review-5405247",
        },
        {
          id: 6,
          title: "Hostman is a great fit for me",
          author: "Faizan A.",
          avatar: "https://user-images.trustpilot.com/660a4ec517cfe20012d2d8ca/73x73.png",
          description: "",
          rate: 5,
          text: "Hostman is a great fit for me. What do you like best about Hostman? It was very easy to deploy my application and create database, I didn't have ",
          date: "2024-04-01",
          href: "https://www.trustpilot.com/reviews/660a4ece012220691dc4b57f",
        },
        {
          id: 7,
          title: "Perfect website",
          author: "Adam M.",
          avatar: "https://user-images.trustpilot.com/6606c5952ee8c60011f08d5b/73x73.png",
          description: "",
          rate: 5,
          text: "This website is extremely user friendly and easy to use. I had no problems so didn't have to contact customer support. Really good website and would recommend to others.",
          date: "2024-03-29",
          href: "https://www.trustpilot.com/reviews/6606c59d8f1f746f2a8b3abb",
        },
        {
          id: 8,
          title: "Simplifying Cloud Deployment with Strengths and Areas for Growth",
          author: "Anup K.",
          avatar: "https://user-images.trustpilot.com/66327e077458ce0013d93447/73x73.png",
          description: "",
          rate: 4,
          text: "What I like best about Hostman is its unwavering commitment to simplicity...",
          date: "2024-03-30",
          href: "https://www.trustpilot.com/users/5f046a6ecd38704d3ce85795",
        },
        {
          id: 9,
          title: "Streamlined Deployment with Room for Improvement",
          author: "Naila J.",
          avatar: "https://user-images.trustpilot.com/660a4e8c17cfe20012d2d8bc/73x73.png",
          description: "",
          rate: 5,
          text: "Hostman impresses with its user-friendly interface and seamless deployment process, simplifying web application hosting...",
          date: "2024-04-01",
          href: "https://www.trustpilot.com/users/660a4e8c17cfe20012d2d8bc",
        },
      ] as ReviewItem[],
      ldMicrodata: {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        reviewCount: 20,
        ratingValue: 4.6,
        bestRating: 5,
        worstRating: 4,
        itemReviewed: {
          "@type": "Organization",
          name: "Hostman",
          alternateName: "Hostman Cloud Service Provider",
          url: "https://hostman.com",
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
    path() {
      return this.$route.path;
    },
    g2Event() {
      return this.makeEventWithPagePrefix(this.path, "g2_click");
    },
    trustpilotEvent() {
      return this.makeEventWithPagePrefix(this.path, "trustpilot_click");
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: var(--gap-card);
}
.actions {
  display: flex;
  gap: 8px;

  @include mobile {
    flex-direction: column;
  }
}
</style>
