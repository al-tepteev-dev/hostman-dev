<template>
  <div :class="$style.core">
    <form :class="$style.form" @submit.prevent="startRegistration">
      <NewInput
        v-model="authForm.email"
        :errors="emailErrors"
        type="text"
        placeholder="Type your Email"
        autocomplete="on"
        name="email"
      />

      <NewButton :class="$style.submit" :disabled="isLoading" :loading="disabled">Sign Up</NewButton>

      <NewRegistrationProviders
        :class="$style.providers"
        :is-expanded="$isMobile"
        :is-loading="isLoading"
        @click="onProviderClick"
      />
    </form>

    <NewUserAgreement context="quickReg" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Base from "@/components/New/Modals/SignUp/index.vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewInput from "@/elements/New/Input/index.vue";
import NewUserAgreement from "@/components/New/User/Agreement/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default Vue.extend({
  name: "NewRegistrationQuick",

  components: { NewButton, NewInput, NewUserAgreement, SvgIcon },

  extends: Base,

  data() {
    return {
      regType: "mainpage",
    };
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: 24px;

  @include desktop {
    gap: 32px;
  }

  .form {
    display: grid;
    gap: 8px;

    @include desktop {
      display: flex;
      gap: 12px;
      max-width: 482px;
    }
  }
}
.submit {
  width: 100%;
  @include desktop {
    flex: none;
    width: 106px;
  }
}
.providers {
  @include mobile {
    margin-top: 16px;
  }
}
</style>
