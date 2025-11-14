<template>
  <NewCard
    :class-content="$style.cardContentWrapper"
    :class-slot="$style.cardContent"
    :disabled="disabled"
    :href="href"
    href-target="_blank"
    is-fixed-width
    is-overflow-hidden
  >
    <div>
      <NewTag :class="$style.tag"> #Tutorials </NewTag>

      <h3 :class="$style.title">{{ item.title }}</h3>

      <div class="body2 nd-text-secondary" :class="$style.description" v-html="descriptionPreview" />
    </div>

    <div class="body4 nd-text-secondary" :class="$style.info" v-html="info" />
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import NewCard from "@/elements/New/Card/index.vue";
import NewTag from "@/elements/New/Tag/index.vue";
import stripHTML from "@/mixins/stripHTML";

const DESCRIPTION_PREVIEW_SYMBOLS = 70;

export default Vue.extend({
  name: "NewPreviewNewsCard",

  components: { NewCard, NewTag },

  mixins: [stripHTML],

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    descriptionPreview() {
      let stringWithoutTags = this.item.text.replace(/<[^>]*>/g, "");

      if (stringWithoutTags.length > DESCRIPTION_PREVIEW_SYMBOLS) {
        stringWithoutTags = stringWithoutTags.substring(0, DESCRIPTION_PREVIEW_SYMBOLS);
      }
      return `${stringWithoutTags}...`;
    },
    href() {
      return `/tutorials/${this.item.path}/`;
    },
    publishedAt() {
      return this.$dayjs(this.item.date_created).format("DD MMMM YYYY");
    },
    readingTime() {
      const CPM_AVERAGE = 1300; // CPM = Characters Per Minute
      const newsText = this.stripHTML(this.item.text);
      return Math.ceil(newsText.length / CPM_AVERAGE);
    },
    info() {
      return `${this.publishedAt}  ·  ${this.readingTime} min to read`;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/variables";

.cardContentWrapper {
  display: flex;
}
.cardContent {
  flex: 1;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
}
.tag {
  margin-bottom: 16px;
}
.title {
  margin-bottom: 12px;
}
.info {
  flex: 1;
  align-content: end;
}
</style>
