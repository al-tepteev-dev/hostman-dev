<template>
  <div class="body4 nd-text-secondary" :class="[$style.core, insideModal && $style.textCenter]">
    By signing up you agree to the <br v-if="insideModal" class="force" />
    <a :class="linkClass" href="https://st.hostman.com/cloud-static/hostman/legal/TOS.pdf" target="_blank"
      >Terms of Service</a
    >
    and
    <a :class="linkClass" href="https://st.hostman.com/cloud-static/hostman/legal/Privacy%20Policy.pdf" target="_blank">
      Privacy Policy
    </a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
type UserAgreementContenxt = "modal" | "quckReg";

export default Vue.extend({
  name: "NewUserAgreement",

  props: {
    context: {
      type: String as () => UserAgreementContenxt,
      default: "modal",
    },
  },

  computed: {
    insideModal() {
      return this.context === "modal";
    },
    linkClass() {
      return ["underline", this.insideModal ? "nd-link-primary" : "nd-link-secondary"];
    },
  },
});
</script>

<style lang="scss" module>
.core {
  text-align: left;
}
.textCenter {
  text-align: center;
}
</style>
