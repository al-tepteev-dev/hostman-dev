<template>
  <NewModal
    v-if="isSignUpModalOpen"
    :header="{ title: 'Create Your Account' }"
    data-test-id="dialog"
    @close="closeSignUpModal"
  >
    <div :class="$style.core">
      <form :class="$style.form" @submit.prevent="startRegistration">
        <NewInput
          v-model="authForm.email"
          :errors="emailErrors"
          type="text"
          placeholder="Your email address"
          autocomplete="on"
          name="email"
        />
        <NewButton expanded :disabled="isLoading" :loading="disabled" data-test-id="sign-up-btn">Sign Up</NewButton>
      </form>

      <div :class="$style.providerInfo">
        <div :class="$style.line" />
        <div class="body4 nd-text-secondary">or use social networks</div>
        <div :class="$style.line" />
      </div>

      <NewRegistrationProviders
        :class="$style.providers"
        is-expanded
        :is-loading="isLoading"
        @click="onProviderClick"
      />

      <NewUserAgreement />
    </div>
  </NewModal>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import Base from "@/components/SignUpModal.vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewInput from "@/elements/New/Input/index.vue";
import NewModal from "@/elements/New/Modal/index.vue";
import NewRegistrationProviders from "@/components/New/Registration/Providers/index.vue";
import NewUserAgreement from "@/components/New/User/Agreement/index.vue";

export default Vue.extend({
  name: "NewModalsSignUp",

  components: { NewButton, NewInput, NewModal, NewRegistrationProviders, NewUserAgreement },

  extends: Base,

  computed: {
    ...mapState("modal", ["isSignUpModalOpen"]),
    emailErrors() {
      const errors: string[] = [];
      if (this.isEmailNotBlank) {
        errors.push("Email must not be blank");
      }
      if (this.isEmailValid) {
        errors.push("The field must contain a valid email");
      }
      if (this.isEmailAlreadyExists) {
        errors.push(`
          User with this email already exists<br/>
          Try <a class="nd-link-primary" href="${this.panelLoginLink}">logging in</a> instead
        `);
      }
      return errors;
    },
  },

  methods: {
    ...mapMutations("modal", ["closeSignUpModal"]),
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  .form {
    display: grid;
    gap: 12px;
    max-width: unset;
  }
}
.providerInfo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;

  @include desktop {
    margin: 24px 0;
  }
}
.line {
  background: var(--surface-line);
  flex: 1;
  height: 1px;
}
.providers {
  margin-bottom: 20px;

  @include desktop {
    margin-bottom: 32px;
  }
}
</style>
