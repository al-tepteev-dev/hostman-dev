<template>
  <div :class="$style.btns">
    <NewButton @click="openSignUpModal"> Sign Up for Free</NewButton>

    <NewButtonLink theme="primary" :href="contactsHref"> Contact Sales </NewButtonLink>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import Base from "@/components/New/Modals/SignUp/index.vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewButtonLink from "@/elements/New/Button/Link/index.vue";
import { contactsHref } from "@/utils/links/common";

export default Vue.extend({
  name: "NewBlockTopActions",

  components: { NewButton, NewButtonLink },

  extends: Base,

  data() {
    return {
      contactsHref,
    };
  },
  methods: {
    ...mapMutations("modal", ["openSignUpModal"]),
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.btns {
  display: flex;
  gap: 8px;

  @include mobile {
    flex-direction: column;
  }
}
</style>
