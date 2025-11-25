<template>
  <div :class="$style.slideContainer">
    <div :class="$style.header">
      <div class="body2 semibold" :class="$style.caption">
        <div :class="$style.title">
          {{ caption.title }}
        </div>
        <div v-if="caption.subtitle" class="nd-text-secondary" :class="$style.subtitle">
          {{ caption.subtitle }}
        </div>
      </div>
      <input
        v-model="currentValue"
        class="body2 semibold"
        :class="$style.sliderInput"
        :min="min"
        :max="max"
        type="number"
        @change="onChangeNumberInput"
      />
    </div>
    <input
      ref="input"
      v-model="currentValue"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :class="$style.slider"
      :style="{ background: gradient }"
      @change="onChange"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewInputSlider",

  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      default: 1,
    },
    caption: {
      type: Object as () => Header,
      required: true,
    },
  },

  data() {
    return {
      currentValue: this.value,
      gradient: "",
    };
  },

  watch: {
    value(value: number) {
      this.currentValue = value;
      this.gradient = this.buildGradient();
    },
  },

  mounted() {
    this.gradient = this.buildGradient(Number((this.$refs.input as HTMLInputElement)?.value));
  },

  methods: {
    // закрашиваем левую часть слайдера в синий
    buildGradient(value?: number) {
      const primaryColor = "var(--surface-accent)";
      const grayColor = "var(--surface-line)";
      const leftRange = (((value || this.value) - this.min) / (this.max - this.min)) * 100;
      return `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${leftRange}%, ${grayColor} ${leftRange}%, ${grayColor} 100%)`;
    },
    onInput() {
      this.gradient = this.buildGradient(Number((this.$refs.input as HTMLInputElement)?.value));
      this.$emit("input", parseInt(String(this.currentValue)));
    },

    onChangeNumberInput(event: Event) {
      const value = Number((event.target as HTMLInputElement).value);
      if (value <= this.max && value >= this.min) {
        this.currentValue = value;
      } else if (value > this.max) {
        this.currentValue = this.max;
      } else {
        this.currentValue = this.min;
      }

      this.onInput();
      this.onChange();
    },

    onChange() {
      this.$emit("change");
    },
  },
});
</script>

<style lang="scss" module>
.slideContainer {
  height: 48px;
  position: relative;
  background-color: var(--surface-secondary);
  border-radius: var(--border-control);
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.caption {
  display: flex;
  gap: 4px;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  width: calc(100% - 40px);
  height: 1px;
  border-radius: 1px;
  transition: var(--transition-all);
  position: absolute;
  bottom: 0;
  left: 20px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: var(--surface-accent);
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--surface-primary);
  position: relative;
  z-index: 999;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background-color: var(--surface-accent);
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid var(--surface-primary);
  position: relative;
  z-index: 999;
}

.sliderInput {
  outline: none;
  resize: none;
  background: none;
  border: none;
  width: 44px;
  text-align: right;
}

.sliderInput::-webkit-outer-spin-button,
.sliderInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.sliderInput[type="number"] {
  -moz-appearance: textfield;
}
</style>
