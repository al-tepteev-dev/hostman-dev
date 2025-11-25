<template>
  <tw-field :label="label" label-color="is-gray">
    <div :class="[$style.sliderWrapper]" :style="$props.sliderStyle">
      <!-- eslint-disable vue/no-v-html -->
      <p v-if="$props.isTitleNeed" :class="['body-1-medium', $style.rangeTitle]" v-html="model" />
      <!--eslint-enable-->
      <vue-slider
        v-model="model"
        :dot-size="$props.dotSize"
        :adsorb="$props.adsorb"
        :included="true"
        :duration="0"
        :data="ticks.map((elem) => elem.primary)"
        :marks="$props.marks"
        :lazy="$props.lazy"
        :min="min.primary"
        :max="max.primary"
        :hide-label="true"
        tooltip="none"
        :step-style="{
          backgroundColor: '#fff',
          borderRadius: 'initial',
        }"
        :process-style="$props.processStyle"
        :rail-style="$props.railStyle"
        :style="$props.vueSliderStyle"
        :class="$style.slider"
        @change="emitModel"
      >
        <template #dot>
          <div :class="[$style.customDot]" />
        </template>
        <template #mark="{ pos }">
          <div :class="$style.customMark" :style="{ left: `${pos}%` }" />
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

type Tick = {
  id: number;
  primary: number | string;
};

export default {
  name: "TwSlider",

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
      type: Object as () => Tick,
      required: true,
    },
    max: {
      type: Object as () => Tick,
      required: true,
    },
    initial: {
      type: Object as () => Tick,
      default: null,
    },
    ticks: {
      type: Array as () => Array<Tick>,
      required: true,
    },
    marks: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    adsorb: {
      type: Boolean,
      default: true,
    },
    isTitleNeed: {
      type: Boolean,
      default: true,
    },
    sliderStyle: {
      type: Object,
      default: () => {},
    },
    vueSliderStyle: {
      type: Object,
      default: () => {},
    },
    railStyle: {
      type: Object,
      default: () => ({
        backgroundColor: "#777991ff",
      }),
    },
    processStyle: {
      type: Object,
      default: () => ({
        height: "1px",
        backgroundColor: "#454ceeff",
        borderRadius: "initial",
      }),
    },
    dotSize: {
      type: Number,
      default: 12,
    },
  },

  data() {
    return {
      model: "",
    };
  },

  watch: {
    min(value) {
      this.model = value.primary;
    },
  },

  mounted() {
    this.model = this.initial ? this.initial.primary : this.min.primary;
    this.emitModel(this.model);
  },

  methods: {
    emitModel(value) {
      const tickIndex = this.ticks.findIndex((elem) => elem.primary === value);
      this.$emit("input", tickIndex);
    },
  },
};
</script>

<style lang="scss" module>
@import "elements/TwRangeSlider/index";
</style>
