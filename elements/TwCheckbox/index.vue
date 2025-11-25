<template>
  <div>
    <validation-provider v-slot="{ errors }" :vid="vid" :name="$attrs.name" :rules="rules">
      <label :class="[$style.checkboxLabel, 'body-2-regular']">
        <input
          :id="$attrs.id"
          ref="checkbox"
          :name="$attrs.name"
          :class="[$style.checkbox, !!errors.length && $style.validationError]"
          :checked="value"
          :value="value"
          type="checkbox"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
        />
        <span :class="[$style.checkboxLabelText, !!errors.length && $style.validationErrorLabel]">
          <slot />
        </span>
      </label>
      <tw-input-help v-if="errors.length" :class="$style.validationErrorMessage" :message="errors" />
    </validation-provider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TwInputHelp from "@/elements/TwInputWithValidation/TwInputHelp";
import { ValidationProvider } from "vee-validate";

export default Vue.extend({
  name: "TwCheckbox",

  components: {
    TwInputHelp,
    ValidationProvider,
  },

  props: {
    value: {
      type: [String, Boolean],
      required: true,
    },
    vid: {
      type: String,
      default: "checkbox",
    },
    rules: {
      type: String,
      default: "required-check",
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
    isAutoFocus: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    if (this.isAutoFocus) {
      this.$refs.checkbox.focus();
    }
  },

  methods: {
    onInput(event: Event) {
      this.$emit("input", (event.target as HTMLInputElement).checked);
    },

    onChange(event: Event) {
      this.$emit("change", (event.target as HTMLInputElement).checked);
    },
    onFocus(event: Event) {
      this.$emit("focus", (event.target as HTMLInputElement).checked);
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/TwInput/index";

.checkboxLabel {
  display: flex;
  align-items: center;
}

.checkboxLabelText {
  margin-left: 16px;
}

.checkbox {
  appearance: none;
  -webkit-appearance: none;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid #dddde3;
  background-repeat: no-repeat;
  background-position: center;
  transition: none;

  &:checked {
    background-color: $primary !important;
    border-color: $primary !important;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.3 5.7C2.7 6.1 3.3 6.1 3.7 5.7L7.7 1.7C8.1 1.3 8.1 0.7 7.7 0.3C7.3 -0.1 6.7 -0.1 6.3 0.3L3 3.5L1.7 2.2C1.3 1.8 0.7 1.8 0.3 2.2C-0.1 2.6 -0.1 3.2 0.3 3.6L2.3 5.7Z' fill='white'/%3E%3C/svg%3E");
  }

  &:focus,
  &:focus-visible {
    border: 2px solid rgba($primary, 0.5);
    box-shadow: 0 0 0 3px rgba($primary, 0.2);
    outline: none;
  }
}

.validationError {
  border: 2px solid $danger !important;
}

.validationErrorLabel {
  color: $danger;
}

.validationErrorMessage {
  margin-top: 8px;
}
</style>
