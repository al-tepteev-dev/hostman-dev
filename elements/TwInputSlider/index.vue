<template>
  <div :class="$style.slideContainer">
    <div :class="$style.header">
      <div :class="[$style.caption, 'body-1-medium']">
        <p :class="$style.title">
          {{ caption.title }}
        </p>
        <p v-if="caption.subtitle" :class="$style.subtitle">
          {{ caption.subtitle }}
        </p>
      </div>
      <tw-ring-loader v-if="isLoading" loader-type="button" :is-centered="false" />
      <input
        v-else
        v-model="currentValue"
        :min="min"
        :max="max"
        :class="$style.sliderInput"
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
      @change="onChange"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import scssVariables from "assets/styles/variables.scss";
import TwRingLoader from "../TwRingLoader/index.vue";

export type Caption = {
  title: string;
  subtitle?: string;
};

export default Vue.extend({
  name: "TwInputSlider",

  components: { TwRingLoader },

  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
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
      type: Object as () => Caption,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentValue: this.value,
    };
  },

  watch: {
    value(value: number) {
      this.currentValue = value;
    },
  },

  mounted() {
    const primaryColor = scssVariables.COLOR_PRIMARY;
    const grayColor = scssVariables.COLOR_GRAY;

    // закрашиваем левую часть слайдера в синий
    this.$refs.input.oninput = function () {
      const leftRange = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${leftRange}%, ${grayColor} ${leftRange}%, ${grayColor} 100%)`;
    };
  },

  methods: {
    onInput() {
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
.slider {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background: $gray;
  transition: $transition-default;
}

.slideContainer {
  height: 48px;
  position: relative;
  background-color: white;
  border-radius: $border-radius-input;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 12px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: $primary;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white;
  position: relative;
  z-index: 999;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background-color: $primary;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white;
  position: relative;
  z-index: 999;
}

.sliderInput {
  outline: none;
  resize: none;
  background: none;
  color: $black;
  border: none;
  width: 150px;
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

.caption {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-gap: 4px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.title {
  color: $gray;
}
</style>
