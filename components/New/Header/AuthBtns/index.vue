<template>
  <div :class="$style.core">
    <NewButtonLink size="md" :theme="$isMobile ? 'primary' : 'secondary'" :href="panelLoginLink">
      Sign In
    </NewButtonLink>

    <NewButton size="md" data-test-id="sign-up-btn" @click="openSignUpModal()"> Sign Up</NewButton>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import NewButton from "@/elements/New/Button/index.vue";
import NewButtonLink from "@/elements/New/Button/Link/index.vue";

export default Vue.extend({
  name: "AuthBtns",

  components: {
    NewButton,
    NewButtonLink,
  },

  computed: {
    panelLoginLink() {
      return `${process.env.APP_DOMAIN}/my/login/`;
    },
  },

  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
  },
});
</script>

<style lang="scss" module>
.core {
  display: flex;
  gap: 4px;
}
</style>
