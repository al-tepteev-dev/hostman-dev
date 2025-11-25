<template lang="pug">
label(:class="[$style.twLabel, $style.fieldWrapper, labelColor === 'is-gray' && $style.isGray]") {{ label }}
  slot
</template>

<script lang="ts">
import Vue from "vue";

type labelColor = "is-gray" | "is-black";

export default Vue.extend({
  name: "TwField",

  props: {
    label: {
      type: String,
      default: null,
    },
    labelColor: {
      type: String as () => labelColor,
      default: "is-black",
    },
  },
});
</script>

<style lang="scss" module>
.fieldWrapper {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 8px;
  align-content: center;
}

.twLabel {
  font-size: 14px;
  line-height: 18px;
  //font-weight: 600;
  color: $black;
}

.isGray {
  color: $gray;
}
</style>
