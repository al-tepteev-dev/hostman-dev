<template>
  <section :class="$style.core">
    <div :class="$style.pagination">
      <div :class="$style.progressBar">
        <div :class="$style.progress" :style="{ width: `${progress}%` }" />
      </div>

      <div
        v-for="index in count"
        :key="index"
        :class="[$style.dot, index - 1 === value && $style.active]"
        @click="$emit('input', index - 1)"
      />
    </div>

    <NewSliderControlsSteps @prev="prev" @next="next" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import NewSliderControlsSteps from "@/components/New/SliderControls/Steps/index.vue";

export type TabItem = {
  id: number | string;
  title: string;
};

export default Vue.extend({
  name: "NewSliderControls",

  components: { NewSliderControlsSteps },

  props: {
    count: {
      type: Number,
      required: true,
    },
    disabledPrev: {
      type: Boolean,
      default: false,
    },
    disabledNext: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      intervalId: 0,
      progress: 0,
    };
  },

  watch: {
    value: {
      handler() {
        this.stopInterval();
        this.startInterval();
      },
      immediate: true,
    },
  },

  destroyed() {
    this.stopInterval();
  },

  methods: {
    prev() {
      let newVal = this.value - 1;
      if (newVal < 0) {
        newVal = this.count - 1;
      }
      this.$emit("input", newVal);
    },
    next() {
      let newVal = this.value + 1;
      if (newVal >= this.count) {
        newVal = 0;
      }
      this.$emit("input", newVal);
    },
    startInterval() {
      if (!process.client) {
        return;
      }
      this.progress = 0;
      this.intervalId = window.setInterval(() => {
        this.progress += 2;
        if (this.progress >= 100) {
          this.next();
        }
      }, 100);
    },
    stopInterval() {
      if (!this.intervalId) {
        return;
      }
      clearInterval(this.intervalId);
      this.intervalId = 0;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";
$pagination-size: 8px;

.core {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination {
  height: $pagination-size;
  display: flex;
  gap: 12px;
}
.progressBar {
  background-color: var(--surface-secondary);
  border-radius: $pagination-size;
  width: 90px;
  height: $pagination-size;
  @include desktop {
    background-color: var(--surface-primary);
  }
}
.progress {
  background-color: var(--surface-white);
  transition: var(--transition-all);
  border-radius: $pagination-size;
  width: 30%;
  height: $pagination-size;
}
.dot {
  background-color: var(--surface-secondary);
  border-radius: 50%;
  cursor: pointer;
  width: $pagination-size;
  height: $pagination-size;
  transition: var(--transition-all);

  &.active {
    background-color: var(--surface-white);
  }

  @include desktop {
    background-color: var(--surface-primary);
  }
}
</style>
