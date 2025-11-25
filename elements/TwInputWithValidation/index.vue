<template lang="pug">
validation-provider(v-slot="{ errors }", :vid="vid", :name="$attrs.name || $attrs.label", :rules="rules", :mode="mode")
  tw-field(v-if="$attrs.label", :label="$attrs.label", label-color="is-gray")
    tw-input(
      v-model="innerValue",
      :maxlength="maxlength",
      :autocomplete="autocomplete",
      :type="type",
      :pattern="$attrs.pattern",
      :is-danger="!!errors.length",
      :is-auto-focus="isAutoFocus",
      :placeholder="placeholder",
      :class-name="$props.className",
      :name="$attrs.name || $attrs.label",
      @focus="onFocus",
      @blur="onBlur"
    )
      slot
    tw-input-help(:message="errors")
  div(v-else, :class="$style.fieldWrapper")
    tw-input(
      v-model="innerValue",
      :maxlength="maxlength",
      :autocomplete="autocomplete",
      :type="type",
      :pattern="$attrs.pattern",
      :is-danger="!!errors.length",
      :is-auto-focus="isAutoFocus",
      :placeholder="placeholder",
      :class-name="$props.className",
      :name="$attrs.name || $attrs.label",
      @focus="onFocus",
      @blur="onBlur"
    )
      slot
    tw-input-help(:message="errors")
</template>

<script lang="ts">
import { ValidationProvider } from "vee-validate";
import Vue from "vue";
import type { PropType } from "vue";
import TwInput from "@/elements/TwInput/index.vue";
import TwField from "@/elements/TwField/index.vue";
import TwInputHelp from "@/elements/TwInputWithValidation/TwInputHelp/index.vue";
import { VeeValidateModes } from "@/types/veeValidate";

export default Vue.extend({
  name: "TwInputWithValidation",

  components: {
    TwField,
    TwInputHelp,
    TwInput,
    ValidationProvider,
  },

  props: {
    vid: {
      type: String,
      default: "text",
    },
    rules: {
      type: String,
      default: "required",
    },
    value: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    customClass: {
      type: String,
      default: "secondary",
    },
    maxlength: {
      type: Number,
      default: null,
    },
    hasCounter: {
      type: Boolean,
      default: false,
    },
    isAutoFocus: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    className: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: String,
      default: "on",
    },
    mode: {
      type: String as PropType<VeeValidateModes>,
      default: VeeValidateModes.PASSIVE,
    },
  },

  data: () => ({
    innerValue: "",
  }),

  watch: {
    innerValue(newVal: string | number) {
      this.$emit("input", newVal);
    },
    value(newVal: string | number) {
      this.innerValue = newVal;
    },
  },

  created() {
    this.innerValue = this.value;
  },
  methods: {
    onFocus(event: Event) {
      this.$emit("focus", event.target as HTMLInputElement);
    },
    onBlur(event: Event) {
      this.$emit("blur", event as HTMLInputElement);
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
</style>
