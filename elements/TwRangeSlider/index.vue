<template>
  <tw-field :label="label" label-color="is-gray">
    <div :class="$style.sliderWrapper">
      <!-- eslint-disable vue/no-v-html -->
      <p :class="['body-1-medium', $style.rangeTitle]" v-html="rangeTitle" />
      <!--eslint-enable-->
      <vue-slider
        v-model="model"
        :dot-size="12"
        :adsorb="true"
        :included="true"
        :duration="0"
        :data="filters"
        :marks="true"
        :min="min"
        :max="max"
        :hide-label="true"
        tooltip="always"
        :step-style="{
          backgroundColor: '#fff',
          borderRadius: 'initial',
        }"
        :process-style="{
          height: '1px',
          backgroundColor: '#454ceeff',
          borderRadius: 'initial',
        }"
        :rail-style="{
          backgroundColor: '#777991ff',
        }"
        :class="$style.slider"
        @change="emitModel"
      >
        <template #dot>
          <div :class="[$style.customDot]" />
        </template>
        <template #mark="{ pos }">
          <div :class="$style.customMark" :style="{ left: `${pos}%` }" />
        </template>
        <template #tooltip="{ value }">
          <div :class="[$style.customTooltip]">
            {{ value }}
          </div>
        </template>
      </vue-slider>
    </div>
  </tw-field>
</template>

<script lang="ts">
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
import TwField from "@/elements/TwField/index.vue";

export default {
  name: "TwRangeSlider",

  components: {
    TwField,
    VueSlider,
  },

  props: {
    label: {
      type: String,
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
    filters: {
      type: Array as () => Array<Number>,
      required: true,
    },
    isReset: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      model: [],
    };
  },

  computed: {
    rangeTitle() {
      return `${this.model[0]}—${this.model[1]}`;
    },
  },

  watch: {
    isReset(value: boolean) {
      value && (this.model = [this.min, this.max]);
    },
  },

  mounted() {
    this.model = [this.min, this.max];
    this.emitModel(this.model);
  },

  methods: {
    emitModel(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" module>
@import "elements/TwRangeSlider/index";
</style>
