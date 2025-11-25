<template>
  <div class="body4" :class="$style.errorMessage" v-html="message" />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NewErrorMessage",

  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.errorMessage {
  color: var(--status-error) !important;
}
</style>
