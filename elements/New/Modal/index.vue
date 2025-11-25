<template>
  <transition name="fade">
    <div id="backdrop" :class="$style.overlay">
      <div :class="$style.modalWrapper" @click="closeModal">
        <div :class="$style.modal" :data-test-id="dataTestId" @click.stop>
          <div :class="$style.close" @click="closeModal">
            <SvgIcon color="is-inherit" icon-path="icons/new/cross-modal.svg" />
          </div>

          <div :class="$style.title">
            <h3 class="medium">{{ header.title }}</h3>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Portal } from "@linusborg/vue-simple-portal";
import SvgIcon from "@/components/SvgIcon/index.vue";
import TwButton from "@/elements/New/Button/index.vue";
import bodyTransform from "@/components/New/mixins/bodyTransform";
import type { Header } from "@/types/Header";

export default Vue.extend({
  name: "NewModal",

  components: {
    Portal,
    SvgIcon,
    TwButton,
  },

  mixins: [bodyTransform],

  props: {
    dataTestId: {
      type: String,
      default: "",
    },
    defaultBottomBtn: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Object as () => Header,
      default: () => ({}),
    },
    icon: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },

  mounted() {
    document.addEventListener("keydown", this._onKeydown);
    this.toggleBodyScroll(false);
  },

  destroyed() {
    document.addEventListener("keydown", this._onKeydown);
    this.toggleBodyScroll(true);
  },

  methods: {
    _onKeydown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }
      this.closeModal();
    },

    closeModal() {
      this.$emit("close");
    },
  },
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.overlay {
  z-index: 99999;
}

.modalWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.modal {
  transition: all 0.2s ease;
  background: var(--surface-primary);
  padding: 0 40px;
  width: 420px;
  position: relative;

  @include desktop {
    border-radius: var(--border-card);
    padding: 48px;
  }
}
.close {
  color: var(--icon-secondary);
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;

  @include desktop {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
.title {
  margin-bottom: 20px;
  text-align: center;

  @include desktop {
    margin-bottom: 32px;
  }
}
</style>
