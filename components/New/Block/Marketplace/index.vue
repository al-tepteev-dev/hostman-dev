<template>
  <NewContent data-test-id="marketplace-container" :header="header" header-justify="center">
    <template #tabs>
      <NewTabs v-model="currentTab" inside-content-slot :items="tabs" />
    </template>

    <template #default>
      <div :class="$style.core">
        <div :class="$style.grid">
          <NewBlockMarketplaceItem
            v-for="item in activeItems"
            :key="item.title"
            :item="item"
            @select-item="registerAccount"
          />
        </div>

        <div :class="$style.btnWraper">
          <NewButton
            alternative
            :class="$style.btn"
            icon="arrow-right"
            icon-placement="right"
            theme="primary"
            @click="registerAccount"
          >
            Explore Options
          </NewButton>
        </div>
      </div>
    </template>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import NewButton from "@/elements/New/Button/index.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewTabs, { TabItem } from "@/elements/New/Tabs/index.vue";
import NewBlockMarketplaceItem, { MarketplaceItem } from "@/components/New/Block/Marketplace/Item/index.vue";
import type { Header } from "@/types/Header";
import { Locations } from "@/types/Locations";
import { ServiceType } from "@/types/Service";

const OsUbuntu22 = 79;
const OsDebian = 95;
const typeFE = "0";
const typeBE = "1";
export default Vue.extend({
  name: "NewBlockMarketplace",

  components: { NewBlockMarketplaceItem, NewButton, NewContent, NewTabs },

  props: {
    header: {
      type: Object as () => Header,
      required: true,
    },
    initialTab: {
      type: Number,
      default: 0,
    },
    servicePage: {
      type: String as () => ServiceType,
      default: "vds",
    },
  },

  data() {
    return {
      currentTab: this.initialTab,
    };
  },

  computed: {
    ...mapState("servicesTariffs", ["vdsTariffs"]),
    activeItems(): MarketplaceItem[] {
      const appsItems: { [id: number]: MarketplaceItem[] } = {
        0: [
          {
            icon: "react",
            title: "React",
            type: typeFE,
            framework: "react",
          },
          {
            icon: "angular",
            title: "Angular",
            type: typeFE,
            framework: "angular",
          },
          {
            icon: "vue",
            title: "Vue",
            type: typeFE,
            framework: "vue",
          },
          {
            icon: "nuxt",
            title: "Nuxt",
            type: typeFE,
            framework: "nuxt",
          },
          {
            icon: "svelte",
            title: "Svelte",
            type: typeFE,
            framework: "svelte",
          },
          {
            icon: "next",
            title: "Next",
            type: typeFE,
            framework: "next.js",
          },
        ],
        1: [
          {
            icon: "express",
            title: "Express",
            type: typeBE,
            framework: "express",
          },
          {
            icon: "beego",
            title: "Beego",
            type: typeBE,
            framework: "beego",
          },
          {
            icon: "celery",
            title: "Celery",
            type: typeBE,
            framework: "celery",
          },
          {
            icon: "django",
            title: "Django",
            type: typeBE,
            framework: "django",
          },
          {
            icon: "flask",
            title: "Flask",
            type: typeBE,
            framework: "flask",
          },
          {
            icon: "phoenix",
            title: "Phoenix",
            type: typeBE,
            framework: "phoenix",
          },
        ],
      };
      const vdsItems: { [id: number]: MarketplaceItem[] } = {
        0: [
          {
            icon: "ubuntu",
            title: "Ubuntu",
            os: OsUbuntu22,
          },
          {
            icon: "debian",
            title: "Debian",
            os: OsDebian,
          },
          // {
          //   icon: "arch",
          //   title: "Arch Linux",
          //   os: 81,
          // },
          {
            icon: "centos",
            title: "CentOS",
            os: 97,
          },
        ],
        1: [
          {
            icon: "docker",
            title: "Docker",
            os: OsUbuntu22,
            software: 25,
          },
          {
            icon: "lamp",
            title: "LAMP",
            os: OsUbuntu22,
            software: 17,
          },
          {
            icon: "nodejs",
            title: "Node.JS",
            os: OsUbuntu22,
            software: 28,
          },
          {
            icon: "gitlab",
            title: "GitLab",
            os: OsUbuntu22,
            software: 18,
          },
          {
            icon: "minecraft",
            title: "Minecraft JE",
            os: 61,
            software: 37,
          },
          {
            icon: "nextcloud",
            title: "NextCloud",
            os: OsUbuntu22,
            software: 91,
          },
        ],
        2: [
          {
            icon: "iso",
            title: "ISO",
          },
          {
            icon: "qcow2",
            title: "QCOW2",
          },
          {
            icon: "vmdk",
            title: "VMDK",
          },
          {
            icon: "vhd",
            title: "VHD",
          },
          {
            icon: "raw",
            title: "RAW",
          },
          {
            icon: "img",
            title: "IMG",
          },
        ],
      };
      const currItems = this.isVds ? vdsItems : appsItems;
      return currItems[this.currentTab];
    },
    tabs() {
      const appsTabs: TabItem[] = [
        {
          id: 0,
          title: "Frontend",
        },
        {
          id: 1,
          title: "Backend",
        },
      ];
      const vdsTabs: TabItem[] = [
        {
          id: 0,
          title: "OS Distributions",
        },
        {
          id: 1,
          title: "Pre-installed Apps",
        },
        {
          id: 2,
          title: "Custom Images",
        },
      ];
      return this.isVds ? vdsTabs : appsTabs;
    },
    isVds() {
      return this.servicePage === ServiceType.Vds;
    },
  },

  watch: {
    initialTab(val) {
      this.currentTab = val;
    },
  },

  methods: {
    makeRedirectUrl(item?: MarketplaceItem) {
      const props: string[] = [];
      if (this.isVds) {
        if (!item) {
          return "/servers/create";
        }
        if (this.currentTab === 2) {
          return "/images";
        }
        const tariff = this.vdsTariffs.find((t: any) => t.location === Locations.US);
        props.push("zone=nyc-1");
        props.push(`preset=${tariff.id}`);

        if (item.os) {
          props.push(`os=${item.os}`);
        }
        if (item.software) {
          props.push(`software=${item.software}`);
        }
        return `/servers/create?${props.join("&")}`;
      } else {
        if (!item) {
          return "/apps/create";
        }
        if (item.type) {
          props.push(`type=${item.type}`);
        }
        if (item.framework) {
          props.push(`framework=${item.framework}`);
        }

        return `/apps/create?${props.join("&")}`;
      }
    },
    registerAccount(item?: MarketplaceItem) {
      this.$store.commit("modal/openSignUpModal", {
        redirectUrl: this.makeRedirectUrl(item),
      });
    },
  },
});
</script>
<style lang="scss" module>
@import "assets/styles/new/mixins";

.core {
  display: grid;
  gap: 20px;

  @include desktop {
    gap: 32px;
  }
}
.grid {
  display: flex;
  row-gap: 24px;
  column-gap: 40px;
  justify-content: center;
  flex-wrap: wrap;

  @include desktop {
    column-gap: 24px;
  }
}
.btnWraper {
  justify-self: center;

  @include mobile {
    padding: 0 20px;
    width: 100%;
  }
}
.btn {
  @include mobile {
    width: 100%;
  }
}
</style>
