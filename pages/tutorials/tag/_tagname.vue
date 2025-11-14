<template>
  <div class="section">
    <div class="content">
      <nuxt-link to="/tutorials">
        <svg-icon :class="$style.backArrow" icon-path="icons/chevron-down.svg" color="is-gray" width="24" height="24" />
      </nuxt-link>
      <tutorials-list
        :columns="3"
        :news-list="newsList"
        :remaining-news="remainingNews"
        :filter-tag="tagName"
        :is-loading="isLoading"
        @fetch-more="$emit('fetch-more-tutorials')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TutorialsList from "@/components/TutorialsList/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import getPageMeta from "@/mixins/getPageMeta";

export default Vue.extend({
  name: "TutorialsListTagView",

  components: {
    SvgIcon,
    TutorialsList,
  },

  mixins: [getPageMeta],
  scrollToTop: true,

  props: {
    newsList: {
      type: Array,
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
    tagName: {
      type: String,
      default: "",
    },
  },

  head() {
    if (this.$route.params.tagname) {
      return this.getPageMeta({
        title: this.tagName + " | Tutorials Hostman",
        description: this.$route.params.tagname + "Tutorials Hostman",
        host: process.env.BASE_URL_SITE + this.$route.path,
      });
    }
  },
});
</script>
<style lang="scss" module>
.backArrow {
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
</style>
