<template>
  <tw-field :label="label" label-color="is-gray" class="labelWrapper">
    <div class="selectWrapper">
      <div
        :class="[
          'custom-select',
          (isDisabled || isLoading) && 'selectDisabled',
          isHidden && 'selectHidden',
          isGrayBackground && 'customSelectGray',
        ]"
        :tabindex="tabindex"
        @blur="open = false"
      >
        <div
          :class="[
            'selected',
            open && 'open',
            (isDisabled || isLoading) && 'selectItemDisabled',
            isHidden && 'selectItemHidden',
            isGrayBackground && 'customSelectGray',
          ]"
          @click="open = !open"
        >
          <span :class="['selectedItem', 'body-1-medium']">
            <template v-if="!selected">
              <span class="selectedItemPrimary">
                {{ placeholder }}
              </span>
            </template>
            <template v-else>
              <span class="selectedItemPrimary">
                {{ selected.primary }}
              </span>
              <span class="selectedItemSecondary">
                {{ selected.secondary }}
              </span>
            </template>
          </span>
          <tw-ring-loader v-if="isLoading" loader-type="button" />
          <svg-icon
            v-else
            icon-path="icons/chevron-down.svg"
            height="24"
            width="24"
            color="is-black"
            :class="['arrowDown', open && 'arrowUp']"
          />
        </div>
        <div class="items" :class="{ selectHide: !open }">
          <span
            v-for="(option, i) of options"
            :key="i"
            :class="['item', 'body-1-medium', isSelectedItem(option) && 'itemSelected']"
            @click="updateModel(option)"
          >
            <span class="selectedItemPrimary" :title="option.primary">
              {{ option.primary }}
            </span>
            <span class="selectedItemSecondary">
              {{ option.secondary }}
            </span>
          </span>
        </div>
      </div>
      <div v-if="isDeleteButton && selected !== null" class="deleteButton" @click="$emit('delete-select')">
        <svg-icon icon-path="icons/modal-close.svg" width="24" height="24" color="is-gray" />
      </div>
    </div>
  </tw-field>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import TwField from "@/elements/TwField/index.vue";
import TwRingLoader from "@/elements/TwRingLoader/index.vue";

export type SelectOption = {
  id: number;
  primary: string;
  secondary?: string;
};

interface Data {
  open: boolean;
}

export default Vue.extend({
  name: "TwSelect",

  components: {
    TwRingLoader,
    TwField,
    SvgIcon,
  },

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array as () => Array<SelectOption>,
      required: true,
    },
    default: {
      type: Object as () => SelectOption,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    isGrayBackground: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDeleteButton: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Выбрать",
    },
  },

  data(): Data {
    return {
      // selected: this.default,
      open: false,
    };
  },

  computed: {
    selected() {
      return this.options.find((option) => option.id === this.value);
    },
  },

  methods: {
    updateModel(option: SelectOption) {
      // this.selected = option
      this.open = false;
      if (option.id !== this.value) {
        this.$emit("input", option.id);
      }
    },

    isSelectedItem(option: SelectOption) {
      return this.selected ? option.id === this.selected.id : false;
    },
  },
});
</script>

<style scoped lang="scss">
.labelWrapper {
  max-width: inherit;
}

.selectWrapper {
  display: flex;
  max-width: inherit;
}

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  transition: $transition-default;
  border-radius: $border-radius-input;
  box-shadow: 0 0 0 1px $border-color;
  max-width: inherit;

  &:hover:not(.selectDisabled):not(.customSelectGray) {
    box-shadow: 0 0 0 1px $black;
  }
}

.customSelectGray {
  background-color: rgba(235, 237, 240, 0.5) !important;
}

.selectDisabled {
  cursor: not-allowed !important;
}

.selectItemDisabled {
  pointer-events: none;
}

.selectHidden {
  box-shadow: none !important;
}

.selectItemHidden {
  opacity: 0;
}

.selectedItem {
  display: flex;
  flex-wrap: nowrap;
  column-gap: 4px;
  padding-left: 10px;
  width: 94%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: $tablet) {
    display: flex;
  }
}

.itemsList {
  line-height: 16px !important;
  padding-left: 10px;
}

.selectedItemPrimary {
  overflow: hidden;
  text-overflow: ellipsis;
  color: $black;
}

.selectedItemSecondary {
  color: $gray;
  margin-left: 2px;
  flex-shrink: 0;

  @media (max-width: $tablet) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.custom-select .selected {
  border-radius: $border-radius-input;
  color: rgba($line-color, 0.5);
  padding: 12px;
  cursor: pointer;
  transition: $transition-default;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-select .selected::after {
  position: absolute;
  width: 0;
  height: 0;
}

.open {
  box-shadow: 0 0 0 2px $black;
  transition: $transition-default;
  background-color: white !important;
}

.custom-select .items {
  border-radius: 8px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px $white;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 10px 12px 10px 10px;
  max-height: 160px;
  overflow: auto;
  overflow: overlay;
  margin-top: 12px;
  display: grid;
  transition: $transition-default;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $black;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    background-clip: content-box;
    border: 4px solid transparent;
  }
}

.custom-select .items .item {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  column-gap: 4px;
  cursor: pointer;
  padding: 10px;
  transition: $transition-default;
  border-radius: 8px;

  &:hover {
    background-color: rgba($line-color, 0.5);
  }
}

.custom-select .items .itemSelected {
  background-color: rgba($line-color, 0.5);
}

.custom-select .items div {
  color: $line-color;
  cursor: pointer;
  border-radius: $border-radius-input;
  transition: $transition-default;
}

.custom-select .items div:hover {
  background-color: rgba($line-color, 0.5);
}

.selectHide {
  display: none !important;
  transition: $transition-default;
}

.arrowDown {
  transition: $transition-default;
}

.arrowUp {
  transform: rotate(-180deg);
}

.deleteButton {
  min-width: 48px;
  height: 48px;
  cursor: pointer;
  background-color: $input-background-color;
  transition: $transition-default;
  margin-left: 8px;
  border-radius: $border-radius-input;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover > ::v-deep .wrapper {
    color: $black;
  }
}
</style>
