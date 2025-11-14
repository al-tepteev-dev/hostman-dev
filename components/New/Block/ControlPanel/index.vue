<template>
  <NewContent data-test-id="control-panel-container">
    <NewCardWide
      :header="header"
      size-title="h2"
      image-type="absolute-bottom"
      image-height="572"
      :image="currentImage"
      paddings-size="compact"
      weight-title="medium"
    >
      <div :class="$style.content">
        <NewBlockControlPanelItem
          v-for="(item, idx) in advantages"
          :key="idx"
          :item="item"
          :is-active="currentIdx === idx"
          @click.native="currentIdx = idx"
        />
      </div>
    </NewCardWide>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewContent from "@/components/New/Content/index.vue";
import NewCardWide from "@/elements/New/Card/Wide/index.vue";
import NewBlockControlPanelItem from "@/components/New/Block/ControlPanel/Item/index.vue";
import type { CardNew } from "@/types/CardNew";
import type { Header } from "@/types/Header";
import { ServiceType } from "@/types/Service";

export default Vue.extend({
  name: "NewBlockControlPanel",

  components: {
    NewContent,
    NewCardWide,
    NewBlockControlPanelItem,
  },

  props: {
    header: {
      type: Object as () => Header,
      default: () => ({
        title: "One panel to rule them all",
        subtitle:
          "Easily control your database, pricing plan, and additional services </br>through the intuitive Hostman management console",
      }),
    },
    service: {
      type: String as () => ServiceType,
      required: true,
    },
  },

  data() {
    return {
      currentIdx: 0,
    };
  },

  computed: {
    advantages(): CardNew[] {
      if (this.service === ServiceType.Dbaas) {
        return [
          {
            header: {
              title: "Easy set up and management",
              subtitle:
                "Ready-to-deploy cloud database solutions come pre-configured. Choose your setup, launch your database, and begin managing your data with ease",
            },
            image: "cp-dbaas-1",
          },
          {
            header: {
              title: "Saves time and resources",
              subtitle:
                "Forget about configuring hardware and software or manual database management—our service has it all covered for you",
            },
            image: "cp-dbaas-2",
          },
          {
            header: {
              title: "Security",
              subtitle:
                "Deploy databases on an isolated network to maintain private access solely through your own infrastructure",
            },
            image: "cp-dbaas-3",
          },
        ];
      }
      return [
        {
          header: {
            title: "Project management",
            subtitle:
              "Organize your multiple cloud servers and databases into a single, organized project, eliminating confusion and simplifying management",
          },
          image: "cp-cloud-server-1",
        },
        {
          header: {
            title: "Software marketplace",
            subtitle: "24 ready-made assemblies for any tasks: frameworks, e-commerce, analytics tools",
          },
          image: "cp-cloud-server-2",
        },
        {
          header: {
            title: "Mobile responsive",
            subtitle: "Get the optimal user experience across all devices with our mobile-responsive design",
          },
          image: "cp-cloud-server-3",
        },
      ];
    },
    currentImage(): string {
      return this.advantages[this.currentIdx].image!;
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.content {
  display: grid;
  align-content: start;
  width: 510px;
  gap: 8px;

  @include mobile {
    width: 100%;
  }
  @include desktop {
    min-height: 354px;
  }
}
</style>
