<template>
  <div>
    <page-header title="Topics" :breadcrumb="breadcrumbs" />
    <div class="section">
      <div class="content">
        <div :class="$style.topicsGrid">
          <nuxt-link
            v-for="topic of sortedTopics"
            :key="topic.path"
            :to="`/tutorials/${topic.path}`"
            :class="$style.topicItem"
          >
            {{ topic.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import getPageMeta from "@/mixins/getPageMeta";
import { NewsMeta } from "@/types/News";
import { TutorialsTopic } from "@/types/Tutorials";
import PageHeader from "@/components/PageHeader";

export default Vue.extend({
  name: "TopicsIndex",

  components: {
    PageHeader,
    // TutorialsList,
  },

  mixins: [getPageMeta],
  scrollToTop: true,

  props: {
    mainFetchData: {
      type: Object as () => {
        popularTutorialsList: NewsMeta[];
        newTutorialsList: NewsMeta[];
        topics: TutorialsTopic[];
      },
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    remainingNews: {
      type: Number,
      default: 0,
    },
  },

  head() {
    return this.getPageMeta({
      title: "Topics | Tutorials Hostman",
      description: "Topics tutorials hostman",
      host: process.env.BASE_URL_SITE + this.$route.path,
    });
  },

  computed: {
    breadcrumbs() {
      return [
        {
          name: "Tutorials",
          path: "/tutorials/",
        },
        {
          name: "Topics",
        },
      ];
    },
    sortedTopics() {
      return [...this.mainFetchData.topics].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
});
</script>
<style lang="scss" module>
.topicsGrid {
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;

  @media (max-width: $mobile) {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}
.topicItem {
  display: block;
  color: $black;
  line-height: 32px;
  font-size: 18px;

  &:hover {
    color: $primary;
  }
}
</style>
