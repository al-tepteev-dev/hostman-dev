<template>
  <div>
    <div :class="['headerWrapper', expanded && 'expanded']" @click="growDiv">
      <slot name="header" />
    </div>
    <div ref="growContainer" class="growAnimation">
      <div ref="measuringWrapper">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HostmanCollapse",

  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    expanded: {
      type: Boolean,
      default: true,
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isOpened(newVal) {
      if (newVal) {
        this.expandDiv();
      } else {
        this.collapseDiv();
      }
    },
  },

  methods: {
    growDiv() {
      if (this.isOpened) {
        this.collapseDiv();
      } else {
        this.expandDiv();
      }
      this.$emit("click");
    },
    expandDiv() {
      const growDiv = this.$refs.growContainer;
      const wrapper = this.$refs.measuringWrapper;
      const computedStyle = window.getComputedStyle(wrapper.firstElementChild);
      const topMargin = computedStyle.getPropertyValue("margin-top");
      const bottomMargin = computedStyle.getPropertyValue("margin-bottom");
      growDiv.style.height = `calc(${wrapper.clientHeight}px + ${topMargin} + ${bottomMargin}`;

      setTimeout(() => {
        growDiv.style.overflow = "inherit";
      }, 100);
    },
    collapseDiv() {
      const growDiv = this.$refs.growContainer;
      growDiv.style.overflow = "hidden";
      growDiv.style.height = 0;
    },
  },
});
</script>

<style lang="scss" scoped>
.more-button {
  border-style: none;
  background: none;
  padding: 0;

  &:hover {
    color: black;
  }
}

.growAnimation {
  transition: all 0.3s;
  height: 0;
  overflow: hidden;
}

.headerWrapper {
  width: max-content;
}

.expanded {
  width: 100%;
}
</style>
