<template>
  <li :class="$style.listItem">
    <component
      :is="isFolder ? 'div' : 'nuxt-link-fragment-class'"
      :class="[isFolder ? $style.folder : $style.article, $style.listTitle]"
      :to="`${pathPrefix}/${item.path}/`"
      @click="toggle"
    >
      <svg-icon
        v-if="isFolder"
        icon-path="icons/arrow-doc.svg"
        width="24"
        height="24"
        color="is-black"
        :class="[$style.chevron, isOpen && $style.arrowOpened]"
      />
      {{ item.menu_title }}
    </component>
    <ul v-show="isOpen" v-if="isFolder" :class="$style.list">
      <tw-tree-item key="index" :item="indexItem" :path-prefix="pathPrefix" />
      <tw-tree-item
        v-for="(child, index) in sortedChildren"
        :key="index"
        :item="child"
        :path-prefix="`${pathPrefix}/${item.path}`"
        :opened-route="passNextOpenedRoute(child.path)"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import NuxtLinkFragmentClass from "@/components/NuxtLinkFragmentClass";

export default Vue.extend({
  name: "TwTreeItem",

  components: { SvgIcon, NuxtLinkFragmentClass },

  props: {
    item: {
      type: Object,
      required: true,
    },
    pathPrefix: {
      type: String,
      required: true,
    },
    openedRoute: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      isOpen: Boolean(this.openedRoute),
    };
  },

  computed: {
    isFolder() {
      return Boolean(this.item.children && this.item.children.length);
    },
    indexItem() {
      const indexItem = { ...this.item };
      indexItem.children = [];
      indexItem.menu_title = "Overview";
      return indexItem;
    },
    sortedChildren() {
      return [...this.item?.children].sort?.((a, b) => a.sort - b.sort);
    },
  },

  watch: {
    openedRoute() {
      if (this.openedRoute) {
        this.isOpen = true;
      }
    },
  },

  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    passNextOpenedRoute(itemPath) {
      return this.openedRoute?.[0] === itemPath ? this.openedRoute.slice(1) : null;
    },
  },
});
</script>

<style lang="scss" module>
.listItem {
  font-family: $font-primary;
  font-size: 14px;
  line-height: 22px;
  color: $gray;
  transition: $transition-default;
  cursor: pointer;
  user-select: none;
}

.listTitle {
  font-size: 20px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: -0.4px;
  color: $black;
  padding-left: 24px;

  &:hover {
    color: $primary;

    .chevron {
      color: $primary;
    }
  }
}

.folder {
  font-family: $font-primary;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  color: $black;
  user-select: none;
  transition: $transition-default;

  &:hover {
    color: $primary;
  }
}

.article {
  display: block;
  color: $gray;
  font-family: $font-primary;
  margin-left: 24px;
  transition: $transition-default;

  &:global(.nuxt-link-exact-active) {
    color: $black;
  }

  &:hover {
    color: $black;
  }
}

.chevron {
  & svg {
    display: block;
  }
}

.arrowOpened {
  transform: rotate(90deg);
}

.list {
  list-style-type: none;
  padding-left: 12px;
  line-height: 22px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
