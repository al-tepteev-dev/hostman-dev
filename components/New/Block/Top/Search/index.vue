<template>
  <NewInput
    :value="value"
    icon-prefix="icons/search.svg"
    type="text"
    placeholder="Search"
    autocomplete="on"
    name="search"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from "vue";
import NewInput from "@/elements/New/Input/index.vue";

export default Vue.extend({
  name: "NewBlockTopSearch",

  components: { NewInput },

  props: {
    value: {
      type: String,
      default: "",
    },
  },
});
</script>
