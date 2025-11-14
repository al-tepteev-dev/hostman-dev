<template>
  <div :class="$style.core">
    <NewButton
      v-for="provider in providers"
      :key="provider"
      :class="$style.btn"
      :disabled="isLoading"
      :expanded="isExpanded"
      :data-test-id="`providers-btn-${provider}`"
      is-icon
      theme="secondary"
      @click="$emit('click', provider)"
    >
      <div :class="$style.iconWrapper">
        <SvgIcon color="is-inherit" :icon-path="`icons/new/${provider}.svg`" />
      </div>
    </NewButton>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewButton from "@/elements/New/Button/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewRegistrationProviders",

  components: { NewButton, SvgIcon },

  props: {
    isExpanded: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      providers: ["google", "github"],
    };
  },
});
</script>

<style lang="scss" module>
.core {
  display: flex;
  gap: 8px;
}
.btn {
  &:hover {
    .iconWrapper {
      color: var(--icon-accent);
    }
  }
}
</style>
