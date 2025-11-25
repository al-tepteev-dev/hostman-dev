<template>
  <div :class="[$style.core, isAccent && $style.accent]">
    <div :class="[$style.dot]" />
    <div :class="[$style.dot]" />
    <div :class="[$style.dot]" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NewLoader",
  props: {
    isAccent: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" module>
.core {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  height: 20px;
  width: auto;
}

.dot {
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  background: var(--text-primary);
  border-radius: 50%;
  height: 8px;
  width: 8px;
  &:nth-child(1) {
    animation: lds-ellipsis 0.6s infinite alternate-reverse;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation: lds-ellipsis 0.6s infinite alternate-reverse;
    animation-delay: 0.3s;
  }
  &:nth-child(3) {
    animation: lds-ellipsis 0.6s infinite alternate-reverse;
    animation-delay: 0.6s;
  }
}

.accent {
  .dot {
    background: var(--text-accent);
  }
}

@keyframes lds-ellipsis {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
