<template>
  <main>
    <div v-if="isLoading" :class="$style.apiDocsLoader">
      <TwRingLoader />
    </div>
    <div v-show="!isLoading" id="redocContainer" ref="redocContainer" :class="$style.apiDocsContainer" />
  </main>
</template>

<script lang="ts">
import getPageMeta from "@/mixins/getPageMeta";
import TwRingLoader from "@/elements/TwRingLoader/index.vue";
import loadScript from "@/mixins/loadScript";
import { perfectScrollStyles } from "@/utils/perfectScrollStyles";

export default {
  name: "ApiDocsWrapper",

  components: {
    TwRingLoader,
  },

  mixins: [getPageMeta, loadScript],

  layout: "new-design",

  data: () => ({
    isLoading: true,
  }),

  head() {
    return this.getPageMeta({
      title: "API Documentation | Hostman",
      description:
        "Use the API to automate operations with our cloud infrastructure" +
        " and integrate Hostman products into your solutions.",
      // imageURL: "https://st.timeweb.com/cloud-static/og/api.png", нужна картинка для hm
    });
  },

  beforeDestroy() {
    document.querySelector("html")!.style.overflow = null;

    // Костыль для переопределения стилей бутстрапа, после отказа от него это можно выпилить
    document.documentElement.style.scrollBehavior = "smooth";
  },

  async mounted() {
    document.querySelector("html")!.style.overflow = "initial";

    // Костыль для переопределения стилей бутстрапа, после отказа от него это можно выпилить
    document.documentElement.style.scrollBehavior = "unset";
    //

    const shadowRoot = this.$refs.redocContainer.attachShadow({ mode: "open" });
    const redocRoot = document.createElement("div");
    redocRoot.id = "redocContainerShadow";
    shadowRoot.appendChild(redocRoot);
    this.loadPerfectScrollStyles(shadowRoot);

    const redocBaseUrl = process.env.SITE_API;
    const [openapi] = await Promise.all([
      this.$axios.get(`${redocBaseUrl}/api-docs-data/bundle.json`),
      this.loadScript(`${redocBaseUrl}/api-docs-data/redoc.standalone.js`),
      this.loadScript(`${redocBaseUrl}/api-docs-data/try-it-out.min.js`),
    ]);

    await RedocTryItOut.init(
      openapi.data,
      {
        shadowRootId: "redocContainer",
        tryItOutEnabled: true,
        disableSearch: true,
      },
      redocRoot
    );

    this.isLoading = false;
  },

  methods: {
    loadPerfectScrollStyles(shadowRoot) {
      const styleSheet = document.createElement("style");
      styleSheet.innerHTML = perfectScrollStyles;
      shadowRoot.appendChild(styleSheet);
    },
  },
};
</script>

<style lang="scss" module>
.apiDocsContainer {
  margin-top: 124px;
  padding-left: 12px;
  width: 100vw;
}
.apiDocsLoader {
  min-height: 400px;
  margin-top: 300px;
}
</style>
