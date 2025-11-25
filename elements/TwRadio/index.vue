<template lang="pug">
.tw-radio(:class="radioClass", @click="$emit('input', model)")
  .tw-radio__wrapper.body-2-medium(data-test-id="radio-btn")
    svg-icon.tw-radio__status-icon(:icon-path="icon", width="24", height="24")
    svg-icon.tw-radio__status-icon-hover(
      v-show="!isSelect",
      icon-path="icons/radio-uncheck-hover.svg",
      width="24",
      height="24"
    )

    span.tw-radio__primary {{ data.primary }}
    span.tw-radio__secondary {{ data.secondary }}

  span.tw-radio__price(
    v-if="selectItemsPrice || data.price",
    :class="['body-2-medium', isSelect && 'tw-radio__price-select']"
  ) {{ selectItemsPrice || data.price }}
</template>

<script lang="ts">
import Vue from "vue";

export type TwRadioItem = {
  id: number;
  primary: string;
  secondary?: string;
  price?: string;
};

type State = {
  model: number | string;
  selectItemsPrice: string;
};

export default Vue.extend({
  name: "TwRadio",

  components: {
    SvgIcon: () => import("@/components/SvgIcon/index.vue"),
  },

  props: {
    data: {
      type: Object as () => TwRadioItem,
      required: true,
    },
    selectId: {
      type: [Number, String],
      required: true,
    },
    type: {
      type: String as "small" | "large",
      default: "large",
    },
  },

  data(): State {
    return {
      model: this.data.id,
      selectItemsPrice: "",
    };
  },

  computed: {
    icon(): string {
      return this.isSelect ? "icons/radio-check.svg" : "icons/radio-uncheck.svg";
    },
    isSelect(): boolean {
      return this.selectId === this.model;
    },
    radioClass(): "tw-radio--small" | "tw-radio--large" {
      return this.type === "small" ? "tw-radio--small" : "tw-radio--large";
    },
  },

  watch: {
    model: {
      immediate: true,
      handler(value) {
        const { selectItems } = this.data;

        if (selectItems) {
          this.selectItemsPrice = selectItems.find(({ id }) => id === value).secondary;
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.tw-radio {
  position: relative;
  cursor: pointer;
  padding: 6px 0;

  @media (min-width: $tablet) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--large {
    padding: 16px 0;
    border-bottom: $line-default;

    &:first-of-type {
      border-top: $line-default;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__secondary {
    margin-left: 4px;
    color: $gray;
  }

  &__price {
    color: $gray;

    @media (max-width: $mobile) {
      margin-left: 36px;
    }

    @media (min-width: $tablet) {
      &-select {
        color: $black;
      }
    }
  }

  &__status-icon {
    margin-right: 12px !important;

    &-hover {
      @extend .tw-radio__status-icon;

      position: absolute;
      opacity: 0;
      transition: $transition-default;
    }
  }

  &:hover {
    .tw-radio__status-icon-hover {
      opacity: 1;
    }
  }
}
</style>
