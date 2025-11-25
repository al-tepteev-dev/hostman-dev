<template>
  <NewInputWrapper :label="label" :errors="errors">
    <div :class="[$style.inputWrapper, $style[`size-${size}`], inputClass]">
      <div v-if="iconPrefix" :class="$style.iconPrefix">
        <SvgIcon color="is-inherit" :icon-path="iconPrefix" />
      </div>
      <input
        ref="input"
        class="body2 semibold"
        :class="inputInnerClasses"
        :disabled="disabled"
        :value="value"
        :placeholder="placeholder"
        :type="$attrs.type"
        :maxlength="$attrs.maxlength"
        :min="$attrs.min"
        :max="$attrs.max"
        :step="$attrs.step"
        :pattern="$attrs.pattern"
        :name="$attrs.name"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div v-if="iconSuffix" :class="$style.iconSuffix" @click="$emit('click-suffix')">
        <SvgIcon color="is-inherit" :icon-path="iconSuffix" />
      </div>
    </div>
  </NewInputWrapper>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import input from "./mixins/input";
import NewInputWrapper from "@/elements/New/Input/Wrapper/index.vue";

export type inputSize = "lg" | "md";

export default Vue.extend({
  name: "NewInput",

  components: {
    SvgIcon,
    NewInputWrapper,
  },

  mixins: [input],

  props: {
    bgFilled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as () => inputSize,
      default: "lg",
    },
    textCenter: {
      type: Boolean,
      default: false,
    },
    iconPrefix: {
      type: String,
      default: "",
    },
    iconSuffix: {
      type: String,
      default: "",
    },
  },

  computed: {
    inputInnerClasses() {
      return [
        this.$style.input,
        this.bgFilled && this.$style.bgFilled,
        this.disabled && this.$style.disabled,
        this.iconPrefix && this.$style.hasPrefix,
        this.iconSuffix && this.$style.hasSuffix,
        this.textCenter && this.$style.textCenter,
        this.errors?.length && this.$style.invalid,
      ];
    },
  },
});
</script>

<style lang="scss" module>
@import "./index";
</style>
