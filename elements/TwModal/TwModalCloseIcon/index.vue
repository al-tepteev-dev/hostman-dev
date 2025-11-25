<template lang="pug">
.tw-mci(:class="[isWhite && 'isWhiteBackground']")
  svg-icon.tw-mci__icon(
    :class="[isWhite && 'isWhiteIcon']",
    icon-path="icons/modal-close.svg",
    width="24",
    height="24",
    color="is-gray",
    data-test-id="close-btn"
  )
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "TwModalCloseIcon",

  components: {
    SvgIcon,
  },

  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.tw-mci {
  border-radius: 50px;
  padding: 8px;
  cursor: pointer;
  transition: $transition-default;

  @media (min-width: $tablet) {
    width: 24px;
    height: 24px;
    padding: 0;
  }

  &:hover > &__icon {
    color: $black;
  }
}

.isWhiteBackground {
  background-color: transparentize($white, 0.9);
}

.isWhiteIcon {
  color: $white;
}
</style>
