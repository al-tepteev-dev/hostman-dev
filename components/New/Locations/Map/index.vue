<template>
  <NewContent
    data-test-id="locations-map-container"
    :header="header"
    header-margin-size="48"
    header-justify="center"
    :width="contentWidth"
  >
    <div :class="$style.core">
      <div :class="$style.map">
        <img v-lazy-load :data-not-lazy="dataNotLazy" :class="$style.mapImage" :src="imageSrc" />
        <NewLocationsMapPoint v-for="(point, idx) in sortedPoints" :key="idx" :class="$style.location" :point="point" />
      </div>
    </div>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import NewContent from "@/components/New/Content/index.vue";
import NewLocationsMapPoint, { LocationsMapPoint } from "@/components/New/Locations/Map/Point/index.vue";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewLocationsMap",

  components: { NewContent, NewLocationsMapPoint },

  props: {
    header: {
      type: Object as () => Header,
      default: () => ({
        title: "Code locally, launch worldwide",
        subtitle:
          "Our servers, certified with ISO/IEC 27001, are located in Tier 3 data <br/>centers across the US, Europe, and Asia",
      }),
    },
  },

  data() {
    return {
      points: [
        { title: "🇺🇸 San Francisco", opacity: 0, posx: 14, posy: 34 },
        { title: "🇺🇸 Texas", opacity: 0, posx: 19, posy: 36 },
        { title: "🇺🇸 New York", opacity: 0, posx: 28, posy: 25 },
        { title: "🇳🇬 Lagos", opacity: 0, posx: 48.5, posy: 45 },
        { title: "🇦🇪 Dubai", opacity: 0, posx: 64, posy: 35 },
        { title: "🇳🇱 Amsterdam", opacity: 0, posx: 48, posy: 12 },
        { title: "🇩🇪 Frankfurt", opacity: 0, posx: 49.8, posy: 14.6 },
        { title: "🇵🇱 Gdansk", opacity: 0, posx: 50, posy: 10 },
        { title: "🇸🇬 Singapore", opacity: 0, posx: 80.5, posy: 47 },
      ] as LocationsMapPoint[],
    };
  },

  computed: {
    ...mapState(["isAutoTest"]),
    contentWidth() {
      return this.$isMobile ? "full" : "1055";
    },
    dataNotLazy() {
      return this.isAutoTest ? "data-not-lazy" : undefined;
    },
    imageSrc() {
      const props: any = {};
      if (!process.client || window.devicePixelRatio === 1 || this.$isMobile) {
        props.width = "1055px";
      }
      return this.$img("/img/new/world-map.png", props, { preset: "webp" });
    },
    sortedPoints() {
      return [...this.points].sort((p1, p2) => p1.posx - p2.posx);
    },
  },

  async mounted() {
    for (const point of this.sortedPoints) {
      await this.sleep(150);
      point.opacity = 1;
    }
  },

  methods: {
    sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  @include hideScrollbar();
  overflow-x: scroll;

  @include desktop {
    overflow: visible !important;
  }
}
.map {
  background-repeat: no-repeat;
  background-size: contain;
  // padding-bottom: 39%;
  position: relative;
  min-width: 540px;
  min-height: 210px;
  width: 100%;

  @include desktop {
    min-height: 411px;
  }
}
.mapImage {
  width: 100%;
  height: auto;
}
</style>
