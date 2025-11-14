<template>
  <NewCardGrid :cards="cards" :cols-desktop="1" size-title="h3" />
</template>

<script lang="ts">
import Vue from "vue";
import NewCardGrid from "@/elements/New/Card/Grid/index.vue";

export default Vue.extend({
  name: "NewBlockContactUsInfo",

  components: { NewCardGrid },

  data() {
    return {
      cards: [
        {
          icon: "mail-check",
          header: {
            title: "info@hostman.com",
            subtitle: "Our team is here to help",
          },
          href: "mailto:info@hostman.com",
        },
        {
          icon: "phone",
          header: {
            title: "+357 22 090221",
            subtitle: "Mon-Fri from 9am to 6pm",
          },
          href: "tel:+35722090221",
        },
      ],
    };
  },
});
</script>
