<template>
  <ul :class="$style.list">
    <li
      v-for="item in list"
      :key="item.id"
      class="body3 medium"
      :class="[$style.item, selectedValue === item.id && $style.isSelected]"
      @click="selectedValue = item.id"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "NewListToggle",

  props: {
    list: {
      type: Array,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    selectedValue: {
      get() {
        return this.value;
      },
      set(id: Number) {
        this.$emit("input", id);
      },
    },
  },
};
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.list {
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
}

.item {
  cursor: pointer;
  border-radius: var(--border-control);
  padding: 12px 16px;
  transition: var(--transition-all);
}

.isSelected {
  background: var(--surface-primary);
}
</style>
