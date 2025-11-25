<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <div :class="[$style.inputWrapper, isDanger && $style.danger]">
      <textarea
        :class="[$style.input, $style.textarea]"
        :value="value"
        :cols="$attrs.cols"
        :rows="$attrs.rows"
        @input="onInput"
        @change="onChange"
      />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TwTextarea",

  props: {
    label: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      required: true,
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput(event: Event) {
      this.$emit("input", (event.target as HTMLInputElement).value);
    },

    onChange(event: Event) {
      this.$emit("change", (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/TwInput/index";

.textarea {
  height: initial;
}
</style>
