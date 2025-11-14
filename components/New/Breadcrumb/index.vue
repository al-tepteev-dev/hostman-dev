<template>
  <nav v-if="preparedBreadcrumb" :class="$style.core">
    <ul :class="$style.list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li
        v-for="(item, idx) in preparedBreadcrumb"
        :key="idx"
        class="body4 medium"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <template v-if="idx !== preparedBreadcrumb.length - 1 && item.href">
          <NuxtLink
            class="nd-link-secondary"
            :class="[$style.item, item.href && 'nd-link-secondary pointer']"
            :to="item.href"
            itemprop="item"
          >
            <span itemprop="name">{{ item.name }}</span>

            <SvgIcon v-if="item.href" icon-path="icons/new/chevron-right.svg" width="20" height="20" />
          </NuxtLink>
        </template>
        <template v-else>
          <span itemprop="name">{{ item.name }}</span>
        </template>
        <meta itemprop="position" :content="idx + 1" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

export type Breadcrumb = BreadcrumbItem[];

export default Vue.extend({
  name: "NewBreadcrumb",

  components: { SvgIcon },

  props: {
    breadcrumb: {
      type: Array as () => Breadcrumb,
      default: undefined,
    },
  },

  computed: {
    preparedBreadcrumb(): Breadcrumb | undefined {
      if (!this.breadcrumb) {
        return this.breadcrumb;
      }

      const res = this.breadcrumb.slice();
      res.unshift({
        name: "Hostman",
        href: "/",
      });
      return res;
    },
  },
});
</script>

<style lang="scss" module>
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.list,
.item {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
