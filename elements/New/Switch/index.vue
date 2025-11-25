<template>
  <div class="body2 semibold" :class="[$style.core, backgroundClass, value && $style.on]">
    <div v-if="textBefore" :class="$style.textBefore">{{ textBefore }}</div>

    <div class="noselect" :class="$style.switch" @click="toggleValue">
      <div :class="$style.dot" />
    </div>

    <div v-if="textAfter" :class="$style.textAfter">{{ textAfter }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { gtmAnalytics } from "@/utils/GTMAnalytics";

export default Vue.extend({
  name: "NewSwitch",

  props: {
    bg: {
      type: String as () => "primary" | "secondary",
      default: "primary",
    },
    value: {
      required: true,
      type: Boolean,
    },
    sendGtmOnChange: {
      type: String,
      default: "",
    },
    sendGtmOnFalse: {
      type: String,
      default: "",
    },
    sendGtmOnTrue: {
      type: String,
      default: "",
    },
    textAfter: {
      type: String,
      default: "",
    },
    textBefore: {
      type: String,
      default: "",
    },
  },

  computed: {
    backgroundClass() {
      return this.$style[`bg-${this.bg}`];
    },
  },

  methods: {
    toggleValue() {
      if (this.sendGtmOnChange) {
        gtmAnalytics.send(this.sendGtmOnChange, { val: this.value ? this.sendGtmOnFalse : this.sendGtmOnTrue });
      }
      this.$emit("input", !this.value);
    },
  },
});
</script>

<style lang="scss" module>
.core {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bg-primary {
  .switch {
    background: var(--surface-primary);
  }
}
.bg-secondary {
  .switch {
    background: var(--surface-secondary);
  }
}
.textBefore,
.textAfter {
  transition: var(--transition-color);
}
.textBefore {
  color: var(--text-primary);
}
.textAfter {
  color: var(--text-secondary);
}
.switch {
  border-radius: 32px;
  cursor: pointer;
  width: 40px;
  height: 24px;
}
.dot {
  background: var(--icon-secondary);
  border-radius: 50%;
  transition: var(--transition-all);
  position: relative;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
}
.on {
  .switch {
    background: var(--surface-accent);
  }
  .dot {
    left: 20px;
  }
  .textBefore {
    color: var(--text-secondary);
  }
  .textAfter {
    color: var(--text-primary);
  }
}
</style>
