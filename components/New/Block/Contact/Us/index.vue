<template>
  <NewContent id="contact-us" :header="header" header-justify="center" header-margin-size="24" width="996">
    <div :class="$style.core">
      <NewBlockContactUsForm />
      <div :class="$style.grid">
        <NewBlockContactUsInfo />
        <NewBlockContactUsSocials />
      </div>
    </div>
  </NewContent>
</template>
<script lang="ts">
import Vue from "vue";
import NewBlockContactUsForm from "@/components/New/Block/Contact/Us/Form/index.vue";
import NewBlockContactUsInfo from "@/components/New/Block/Contact/Us/Info/index.vue";
import NewBlockContactUsSocials from "@/components/New/Block/Contact/Us/Socials/index.vue";
import NewContent from "@/components/New/Content/index.vue";

export default Vue.extend({
  name: "NewBlockContactForm",

  components: {
    NewBlockContactUsForm,
    NewBlockContactUsInfo,
    NewBlockContactUsSocials,
    NewContent,
  },

  data() {
    return {
      header: {
        title: "Drop us a Line",
      },
    };
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";
.core {
  @include desktop {
    grid-template-columns: minmax(auto, 690px) auto;
  }
}
.core,
.grid {
  display: grid;
  gap: var(--gap-card);
}
</style>
