<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <div
      :class="[
        $style.inputWrapper,
        isDanger && $style.danger,
        isSearch && !isMobileSearch && $style.searchBackground,
        isMobileSearch && $style.mobileSearchWrapper,
      ]"
    >
      <svg-icon v-if="isSearch" icon-path="icons/search.svg" :class="$style.searchIcon" color="is-black" />
      <input
        ref="input"
        :class="[$style.input, className, isMobileSearch && $style.mobileSearchInput]"
        :value="value"
        :placeholder="$attrs.placeholder"
        :type="$attrs.type"
        :maxlength="$attrs.maxlength"
        :autocomplete="$attrs.autocomplete"
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

      <svg-icon
        v-if="isMobileSearch || (isSearch && value)"
        :class="$style.clearInputIcon"
        icon-path="icons/cross.svg"
        height="20"
        width="20"
        color="is-gray"
        @click.native="onClearInput"
      />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "TwInput",

  components: { SvgIcon },

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
    isSearch: {
      type: Boolean,
      default: false,
    },
    isAutoFocus: {
      type: Boolean,
      default: false,
    },
    isMobileSearch: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
  },

  mounted() {
    if (this.isAutoFocus) {
      this.$refs.input.focus();
    }
  },

  methods: {
    onInput(event: Event) {
      this.$emit("input", (event.target as HTMLInputElement).value);
    },

    onChange(event: Event) {
      this.$emit("change", (event.target as HTMLInputElement).value);
    },
    onFocus(event: Event) {
      this.$emit("focus", (event.target as HTMLInputElement).value);
    },
    onClearInput() {
      if (this.$refs.input.value) {
        this.$refs.input.value = "";
        this.$emit("input", "");
        this.$refs.input.focus();
      } else {
        this.$emit("close");
      }
    },
    onBlur(event: Event) {
      this.$emit("blur", event.target as HTMLInputElement);
    },
  },
});
</script>

<style lang="scss" module>
@import "elements/TwInput/index";

.searchIcon {
  margin-left: 16px;
  opacity: 0.25;
}

.searchBackground {
  background-color: $white;
  border-radius: 20px;

  & input {
    background-color: $white;
    border-radius: 20px;
  }

  &:focus-within {
    box-shadow: 0 0 0 2px $primary;
  }

  &:focus-within,
  &:focus-within input {
    background-color: $white;
  }
}

.clearInputIcon {
  cursor: pointer;
  margin-right: 16px;
}
</style>
