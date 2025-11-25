<template lang="pug">
.tooltipBox(@mouseenter="updateTooltip")
  div(ref="slotRef")
    slot
  .tooltip(ref="tooltip")
    span.text(v-html="text")
    .tooltipArrow(ref="tooltipArrow")
</template>

<script lang="ts">
import Vue, { nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default Vue.extend({
  name: "TwLabelTooltip",

  props: {
    text: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      popperInstance: null,
    };
  },

  updated() {
    this.updateTooltip();
  },

  destroyed() {
    this.popperInstance.destroy();
  },

  async mounted() {
    await nextTick();
    const topLinerOffset = this.$store.state.topLiner.isTopLinerOpened ? 56 : 0;
    this.popperInstance = createPopper(this.$refs.slotRef, this.$refs.tooltip, {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 12],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: {
              top: 68 + topLinerOffset,
              bottom: 52,
              left: 24,
              right: 24,
            },
          },
        },
        {
          name: "flip",
          options: {
            padding: {
              top: 68 + topLinerOffset,
              bottom: 52,
            },
          },
        },
        {
          name: "arrow",
          options: {
            element: this.$refs.tooltipArrow,
          },
        },
      ],
    });
  },

  methods: {
    updateTooltip() {
      this.popperInstance.update?.();
    },
  },
});
</script>

<style lang="scss" scoped>
.tooltipBox {
  position: relative;
  display: grid;
  justify-items: center;
  cursor: pointer;
}

.tooltip {
  visibility: hidden;
  color: white;
  text-align: center;
  padding: 12px 16px;
  border-radius: $border-radius-input;
  width: max-content;
  max-width: 220px;
  bottom: calc(100% + 5px);
  opacity: 0;
  position: absolute;
  z-index: 1;
  background: $black;
  transition: $transition-default;
  transition-property: visibility, opacity;

  &[data-popper-placement^="top"] > .tooltipArrow {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > .tooltipArrow {
    top: -4px;
  }

  &[data-popper-placement^="left"] > .tooltipArrow {
    right: -4px;
  }

  &[data-popper-placement^="right"] > .tooltipArrow {
    left: -4px;
  }
}

.tooltipBox:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltipArrow {
  position: absolute;
  width: 10px;
  height: 10px;

  &::before {
    position: absolute;
    width: 10px;
    height: 10px;
    content: "";
    transform: rotate(45deg);
    background: $black;
    top: 0;
    left: 0;
  }
}
</style>
