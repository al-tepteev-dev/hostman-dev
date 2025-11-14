<template>
  <NewContent data-test-id="cp-preview-container">
    <div :class="$style.core">
      <div
        :class="[$style.imgWrapper, $style[`bg-position-${imgPosition}`]]"
        :style="{
          backgroundImage: bg,
        }"
      />
      <div :class="$style.content">
        <div :class="$style.textWrapper">
          <h2 class="medium" v-html="title" />

          <div class="body2 nd-text-secondary" v-html="subtitle" />
        </div>

        <NewSliderControls v-model="currentIdx" :class="$style.sliderSteps" :count="cards.length" />
      </div>
    </div>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewContent from "@/components/New/Content/index.vue";
import NewSliderControls from "@/components/New/SliderControls/index.vue";
import type { CardNew } from "@/types/CardNew";

export default Vue.extend({
  name: "NewPreviewControlPanel",

  components: {
    NewContent,
    NewSliderControls,
  },

  props: {
    cards: {
      type: Array as () => CardNew[],
      default: () => {
        const titleContolPanel = "Deploy a cloud server <br/>in just a few clicks";
        return [
          {
            header: {
              title: titleContolPanel,
              subtitle:
                "Set up your сloud servers at Hostman swiftly and without any fees, customizing them for your business with a quick selection of region, IP range, and details—ensuring seamless integration and data flow",
            },
            image: "pcp-main-1",
          },
          {
            header: {
              title: titleContolPanel,
              subtitle:
                "Elevate your cloud experience with a suite of additional cloud services, including backups, snapshots, private networking, floating IPs, and DNS services to further enhance your infrastructure's performance and reliability",
            },
            image: "pcp-main-2",
          },
        ];
      },
    },
    imgPosition: {
      type: String as () => "center",
      default: "default",
    },
  },

  data() {
    return {
      currentIdx: 0,
    };
  },

  computed: {
    bg() {
      const idx = this.currentIdx;
      const props: any = {};
      if (!process.client || window.devicePixelRatio === 1) {
        props.width = "588px";
      }
      return `url(${this.$img(`/img/new/${this.cards[idx].image}.png`, props, { preset: "webp" })})`;
    },
    title() {
      return this.cards[this.currentIdx].header.title;
    },
    subtitle() {
      return this.cards[this.currentIdx].header.subtitle;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: flex;

  @include mobile {
    background-color: var(--surface-primary);
    border-radius: var(--border-card);
    flex-direction: column;
  }
}
.imgWrapper {
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: var(--border-card);
  flex: none;
  overflow: hidden;
  width: 100%;
  height: 65vw;

  &.bg-position-center {
    background-position: center;
  }
  @include mobile {
    order: 1;
  }

  @include desktop {
    width: 588px;
    height: 431px;
  }
}
.content {
  display: grid;
  align-content: start;
  gap: var(--gap-card);
  padding: 20px 20px 24px 20px;

  @include desktop {
    padding: 84px 72px 0 108px;
  }
}
.textWrapper {
  display: grid;
  align-content: start;
  gap: 12px;
}
.sliderSteps {
  @include mobile {
    margin: 0 auto;
  }
}
</style>
