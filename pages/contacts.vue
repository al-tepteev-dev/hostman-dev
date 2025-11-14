<template>
  <main class="layout-content">
    <LazyHydrate when-idle="when-idle">
      <NewBlockTop :breadcrumb="breadcrumb" :header="mainSection.header" :image="mainSection.image">
        <template #default>
          <NewButton :expanded="$isMobile" @click="toForm">Contact us Now</NewButton>
        </template>
        <template #bottom>
          <NewPartners />
        </template>
      </NewBlockTop>
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockContactUs />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockMap width="996" />
    </LazyHydrate>

    <LazyHydrate :when-visible="whenVisibleOpt">
      <NewBlockBanefits
        :header="banefitsBlock.header"
        header-justify="center"
        :cards="banefitsBlock.cards"
        width="996"
      />
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import getPageMeta from "@/mixins/getPageMeta";
import type { ProductSeoData } from "@/types/ProductSeoData";
import { whenVisibleOpt } from "@/utils/lazyHydrate";

const og = "https://hostman.com/img/og/contacts.png";

export default {
  name: "ContactsPage",

  components: {
    LazyHydrate,
    NewBlockBanefits: () => import("@/components/New/Block/Benefits/index.vue"),
    NewBlockContactUs: () => import("@/components/New/Block/Contact/Us/index.vue"),
    NewBlockMap: () => import("@/components/New/Block/Map/index.vue"),
    NewBlockTop: () => import("@/components/New/Block/Top/index.vue"),
    NewButton: () => import("@/elements/New/Button/index.vue"),
    NewPartners: () => import("@/components/New/Partners/index.vue"),
  },

  mixins: [getPageMeta],

  layout: "new-design",

  data() {
    return {
      breadcrumb: [{ name: "Contact Sales" }],
      mainSection: {
        header: {
          title: "Get in Touch",
          subtitle:
            "We appreciate each customer and we are proud that 80% of clients <br/>come back to work with us again",
        },
        image: "ambassador-dbaas",
      },
      banefitsBlock: {
        header: {
          title: "Always happy to help",
        },
        cards: [
          {
            icon: "mail-check",
            header: {
              title: "Contact Our Sales",
              subtitle:
                "Are you considering deploying on Hostman? Our team of reliable consultants is ready to assist.For a personalized experience, please send an email to sales@hostman.com or fill in the form below",
            },
          },
          {
            icon: "bell",
            header: {
              title: "Reach out to Our <br/>24/7 Support",
              subtitle:
                "Our live chat is accessible to our customers 24/7 throughout the year via our Control Panel. Alternatively, you can reach out to support@hostman.com via email. For matters related to abuse, please contact abuse@hostman.com",
            },
          },
          {
            icon: "chat-dots",
            header: {
              title: "General Questions <br/>or Feedback",
              subtitle:
                "Additional information about our company can be found on our About Us, Media, FAQ, and Documentation pages. Feel free to send us an email at hello@hostman.com to provide feedback or simply say hello",
            },
          },
        ],
      },
      seoData: {
        title: "Hostman Contact Us - Get in Touch with Us",
        description:
          "Hostman offers a wide range of solutions to meet diverse business needs. You can easily reach us via email or our convenient contact form. Our team processes inquiries during regular business hours, ensuring prompt and efficient assistance.",
      } as ProductSeoData,
      whenVisibleOpt,
    };
  },

  head() {
    return this.getPageMeta({
      title: this.seoData.title,
      description: this.seoData.description,
      imageURL: og,
      ldData: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Hostman",
        image: og,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Limassol, Cyprus",
          postalCode: "3107",
          streetAddress: "28 Oktovriou, 367, Mediterranean Court, Floor 1, Office A5",
        },
        email: "info(at)hostman.com",
        telephone: "+357 22 090221",
      },
    });
  },

  methods: {
    toForm() {
      this.$scrollTo("#contact-us", 100);
    },
  },
};
</script>
