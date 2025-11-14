<template>
  <section :class="$style.core" data-test-id="partners-container">
    <h3 :class="$style.title">Trusted by 500+ companies and developers worldwide</h3>

    <InfiniteSlideBar duration="45s">
      <div :class="$style.slider">
        <SvgIcon
          v-for="img in partners"
          :key="img.name"
          :class="$style.slide"
          :icon-path="`icons/new/partners/${img.name}.svg`"
          :width="img.width"
          height="36"
        />
      </div>
    </InfiniteSlideBar>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import InfiniteSlideBar from "vue-infinite-slide-bar";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewPartners",

  components: { InfiniteSlideBar, SvgIcon },

  data() {
    return {
      partners: [
        { name: "hubspot", width: "107" },
        { name: "clickup", width: "125" },
        { name: "elastic-email", width: "174" },
        { name: "metabase", width: "154" },
        { name: "hotjar", width: "122" },
      ],
    };
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  max-width: 934px;
  margin: 0 auto;
  display: grid;
  gap: 24px;

  @include desktop {
    gap: 40px;
  }

  :global(.vifnslb-container) {
    overflow: hidden;
  }
  :global(.vifnslb-element) {
    // prevent duplication partners
    display: flex;
  }
}
.title {
  text-align: center;
}
.slider {
  display: flex;
  align-items: center;
}
.slide {
  margin-right: 32px;

  @include desktop {
    margin-right: 64px;
  }
}
</style>
