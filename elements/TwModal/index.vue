<template lang="pug">
portal(v-if="isPortalActive", selector="body")
  transition(name="fade", appear, @afterLeave="isPortalActive = false")
    div(v-if="isModalActive", ref="overlay", :class="$style.modalOverlay", @mousedown.self="isClickOnOverlay = true")
      div(
        v-if="!isCustom",
        :class="[$style.modal, backgroundColor === 'black' && $style.isBlackBackground]",
        data-test-id="dialog"
      )
        tw-modal-close-icon(:class="$style.cross", :is-white="backgroundColor === 'black'", @click.native="closeModal")
        slot
      slot(v-else)
</template>

<script lang="ts">
import Vue from "vue";
import TwModalCloseIcon from "@/elements/TwModal/TwModalCloseIcon/index.vue";
import { Portal } from "@linusborg/vue-simple-portal";

type backgroundColor = "white" | "black";

export default Vue.extend({
  name: "BaseModal",

  components: {
    TwModalCloseIcon,
    Portal,
  },

  props: {
    isModalActive: {
      type: Boolean,
      required: true,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String as () => backgroundColor,
      default: "white",
    },
  },

  data() {
    return {
      isClickOnOverlay: false,
      previousOverflow: null,
      htmlElement: null,
      isPortalActive: this.isModalActive,
    };
  },

  watch: {
    isModalActive(value) {
      if (value) {
        this.previousOverflow = this.htmlElement!.style.overflow;
        this.htmlElement!.style.overflow = "hidden";
        this.isPortalActive = true;
      } else {
        this.htmlElement!.style.overflow = this.previousOverflow;
      }
    },
  },

  mounted() {
    this.htmlElement = document.querySelector("html");
    document.addEventListener("mouseup", this.onMouseUp, { passive: true });
  },

  destroyed() {
    document.removeEventListener("mouseup", this.onMouseUp);
  },

  methods: {
    closeModal() {
      this.$emit("update:isModalActive", false);
      this.$emit("close");
    },
    onMouseUp(event) {
      if (this.isClickOnOverlay && event.target === this.$refs.overlay) {
        this.closeModal();
      }
      this.isClickOnOverlay = false;
    },
  },
});
</script>

<style lang="scss" module>
.modalOverlay {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: rgba(5, 12, 38, 0.86);

  @media (min-width: $tablet) {
    overflow-y: auto;
    scrollbar-gutter: stable;
  }
}

.modal {
  background: white;
  padding: 76px 24px 24px;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: $tablet) {
    padding: 48px;
    height: fit-content;
    border-radius: 20px;
    overflow-y: initial;
    overflow-x: initial;
    width: 496px;
    margin: auto;
  }
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.cross {
  position: absolute;
  top: 16px;
  right: 24px;
}

.isBlackBackground {
  background-color: #050c26;
}
</style>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
