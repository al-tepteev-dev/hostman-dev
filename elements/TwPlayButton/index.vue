<template lang="pug">
.tw-play-button
  svg-icon(icon-path="icons/play.svg", :width="$isMobile ? '20' : '32'", :height="$isMobile ? '20' : '32'")
</template>
<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "TwPlayButton",

  components: { SvgIcon },
});
</script>

<style lang="scss" scoped>
.tw-play-button {
  background-color: $white;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  box-shadow: $box-shadow-default;
  transition: transform $transition-duration;

  @media (max-width: $tablet) {
    height: 40px;
    width: 40px;
    top: 18px;
    left: unset;
    right: 18px;
  }
}
</style>
