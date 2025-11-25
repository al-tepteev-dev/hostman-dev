<template>
  <NewInputWrapper :label="label" :errors="errors">
    <textarea
      ref="input"
      :class="inputInnerClasses"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      :cols="cols"
      :rows="rows"
      :name="$attrs.name"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </NewInputWrapper>
</template>

<script lang="ts">
import Vue from "vue";
import NewInput from "@/elements/New/Input/index.vue";

export default Vue.extend({
  name: "NewTextarea",

  extends: NewInput,

  props: {
    rows: {
      type: [Number, String],
      default: 3,
    },
    cols: {
      type: [Number, String],
      default: undefined,
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/New/Input/index";
.input {
  resize: none;
}
</style>
