<template>
  <NewContent :class="$style.core">
    <NewCardWide
      data-test-id="support-container"
      :header="cardHeader"
      :image="imagePath"
      image-type="absolute-bottom"
      image-height="464"
      :is-overflow-hidden="false"
      weight-title="medium"
    >
      <div :class="$style.linkBtns">
        <NewButtonLink :gtm-event="emailEvent" :href="mailHref">Email us</NewButtonLink>
        <NewButton :gtm-event="chatEvent" theme="primary" @click="openChat">Chat with us</NewButton>
      </div>
    </NewCardWide>

    <footer :class="$style.footer" data-test-id="footer">
      <NewFooterLinks />

      <NewFooterSocials />
    </footer>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewButtonLink from "@/elements/New/Button/Link/index.vue";
import NewCardWide from "@/elements/New/Card/Wide/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewFooterLinks from "@/components/New/Footer/Links/index.vue";
import NewFooterSocials from "@/components/New/Footer/Socials/index.vue";
import gtmEventFactory from "@/mixins/gtmEventFactory";
import { mailHref } from "@/utils/links/footer";
import {
  contactsHref,
  cloudServer,
  databaseHref,
  databaseSqlCloudHref,
  psqlHref,
  vpsServersHref,
} from "@/utils/links/common";

export default Vue.extend({
  name: "NewFooter",

  components: {
    NewButton,
    NewButtonLink,
    NewCardWide,
    NewContent,
    NewFooterLinks,
    NewFooterSocials,
  },

  mixins: [gtmEventFactory],

  data() {
    return {
      cardHeader: {
        title: "Do you have questions, <br/>comments, or concerns?",
        subtitle:
          "Our professionals are available to assist you at any moment, <br/>whether you need help or are just unsure of where to start",
      },
      mailHref,
    };
  },

  computed: {
    imagePath() {
      if (this.path === cloudServer || this.path === psqlHref || this.path === contactsHref) {
        return "ambassador-cloud-servers";
      }
      if (this.path === databaseHref || this.path === databaseSqlCloudHref) {
        return "ambassador-dbaas";
      }
      if (this.path === vpsServersHref) {
        return "ambassador-vps";
      }
      return "ambassador";
    },
    path() {
      return this.$route.path;
    },
    emailEvent() {
      return this.makeEventWithPagePrefix(this.path, "email_click");
    },
    chatEvent() {
      return this.makeEventWithPagePrefix(this.path, "chat_click");
    },
  },

  methods: {
    async openChat() {
      await window.$crisp.push(["do", "chat:open"]);
      if (window.$crisp.is("chat:hidden")) {
        await window.$crisp.push(["do", "chat:show"]);
      }
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: var(--gap-content-x);
  margin-top: var(--gap-content-x);
  padding-bottom: 24px;

  @include desktop {
    gap: 75px;
    padding-bottom: 64px;
  }
}
.linkBtns {
  display: flex;
  gap: 8px;

  @include mobile {
    flex-direction: column;
  }
}
.footer {
  @include mobile {
    padding: 0 20px;
    display: grid;
    gap: 32px;
  }

  @include desktop {
    padding: 0 102px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
