<template>
  <div :class="$style.core">
    <NewButton :disabled="disabledPrev" is-icon is-rounded size="md" theme="primary" @click="$emit('prev')">
      <SvgIcon icon-path="icons/new/arrow-left.svg" />
    </NewButton>

    <NewButton :disabled="disabledNext" is-icon is-rounded size="md" theme="primary" @click="$emit('next')">
      <SvgIcon icon-path="icons/new/arrow-right.svg" />
    </NewButton>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewButton from "@/elements/New/Button/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewSliderControlsSteps",

  components: { NewButton, SvgIcon },

  props: {
    disabledPrev: {
      type: Boolean,
      default: false,
    },
    disabledNext: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: flex;
  gap: 4px;

  @include mobile {
    display: none;
  }
}
</style>
