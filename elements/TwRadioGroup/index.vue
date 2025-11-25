<template lang="pug">
.tw-rg
  .tw-rg__title(:class="titleClasses") {{ title }}
  .tw-rg__subtitle.body-2-regular(v-html="subtitle")

  .tw-rg__buttons
    tw-radio(
      v-for="item in items",
      :key="item.id",
      v-model="model",
      :data="item",
      :select-id="model",
      :type="type",
      @input="clickRadio"
    )
</template>

<script lang="ts">
import Vue from "vue";
import TwRadio, { TwRadioItem } from "@/elements/TwRadio";

type State = {
  model: string | number;
};

export default Vue.extend({
  name: "TwRadioGroup",

  components: {
    TwRadio,
  },

  props: {
    title: {
      type: String as string,
      required: true,
    },
    subtitle: {
      type: String as string,
      default: "",
    },
    items: {
      type: Array as () => TwRadioItem[],
      required: true,
    },
    selectId: {
      type: [Number, String],
      default() {
        return this.items[0].id;
      },
    },
    type: {
      type: String as "small" | "large",
      default: "large",
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    isReset: {
      type: Boolean,
      default: false,
    },
  },

  data(): State {
    return {
      model: this.selectId,
    };
  },

  computed: {
    titleClasses(): "body-2-medium" | "h3 bold" {
      return this.type === "small" ? "body-2-medium" : "h3 bold";
    },
  },

  watch: {
    isReset(value: boolean) {
      if (value) {
        // TODO изменить реализацию сброса значений по умолчанию
        this.model = this.selectId;
      }
    },
    selectId() {
      this.model = this.selectId;
    },
  },

  methods: {
    clickRadio() {
      this.$emit("input", this.model);
    },
  },
});
</script>

<style lang="scss" scoped>
.tw-rg {
  ::v-deep br {
    display: initial;
  }

  &__subtitle {
    margin: 12px 0 28px;
    color: $gray;
  }

  &__title.body-2-medium {
    color: $gray;

    ~ .tw-rg__subtitle {
      margin: 10px 0 0;
    }
  }
}
</style>
