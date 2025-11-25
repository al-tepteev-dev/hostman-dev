<template>
  <div :class="$style.inputWrapper">
    <label v-if="label" class="body4 nd-text-secondary">
      {{ label }}
    </label>

    <slot />

    <NewErrorMessage v-if="!!errors?.length" :message="errors[0]" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewErrorMessage from "@/elements/New/ErrorMessage/index.vue";
import inputWrapperProps from "../mixins/inputWrapperProps";

export default Vue.extend({
  name: "NewInputWrapper",

  components: {
    NewErrorMessage,
  },

  mixins: [inputWrapperProps],
});
</script>

<style lang="scss" module>
.inputWrapper {
  display: grid;
  gap: 8px;
  width: 100%;
}
</style>
