<template>
  <div>
    <!--    <NuxtLink v-if="!isIndex" to="/docs/" :class="['body-2-regular', $style.navBackLink]">-->
    <!--      <SvgIcon icon-path="icons/chevron-down.svg" width="24" height="24" color="is-gray" :class="$style.chevronBack" />-->
    <!--      <p>Back</p>-->
    <!--    </NuxtLink>-->
    <div :class="$style.list">
      <div v-for="element in categories" :key="element.name" :class="$style.listItems">
        <div :class="$style.elementTitle" @click="toggle(element.name)">
          <svg-icon
            icon-path="icons/arrow-doc.svg"
            width="24"
            height="24"
            color="is-black"
            :class="[$style.arrowTitle, isOpen[element.name] && $style.arrowOpened]"
          />
          <div :class="['body-1-medium', $style.category]">
            {{ element.name }}
          </div>
        </div>
        <ul v-show="isOpen[element.name]" :class="$style.tree">
          <TwTreeItem
            v-for="(treeItem, index) in sortedTreeData(element.name)"
            :key="index"
            :item="treeItem"
            path-prefix="/docs"
            :opened-route="treeItem.path === openedRoute[0] ? openedRoute.slice(1) : null"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TwTreeItem from "@/elements/TwTree/TwTreeItem";
import SvgIcon from "../../components/SvgIcon/index.vue";

export default Vue.extend({
  name: "TwTree",

  components: {
    SvgIcon,
    TwTreeItem,
  },

  props: {
    openedRoute: {
      type: Array,
      default: null,
    },
    categories: {
      type: Array,
      required: true,
    },
    docsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: {},
    };
  },

  computed: {
    isIndex() {
      return this.$route.path === "/docs/";
    },
  },
  created() {
    this.categories.forEach((category) => {
      this.isOpen[category.name] = true;
    });
  },

  methods: {
    toggle(category: string) {
      this.isOpen = { ...this.isOpen, [category]: !this.isOpen[category] };
    },
    isOpenList(category: string) {
      return this.isOpen[category];
    },
    sortedTreeData(category: string) {
      const treeData = this.getArticlesByCategory(category);
      return [...treeData].sort((a, b) => a.sort - b.sort);
    },
    getArticlesByCategory(category: string) {
      return this.docsList.filter((article) => article.category.name === category);
    },
    getIconPath(id) {
      return `${process.env.BASE_URL_CONTENT}/assets/${id}`;
    },
  },
});
</script>

<style lang="scss" module>
.tree {
  list-style-type: none;
  font-size: 14px;
  line-height: 22px !important;
  padding-left: 0 !important;
  margin-bottom: 0 !important;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: $mobile) {
    margin-right: 0;
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 42px;
}

.elementTitle {
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: $transition-default;
  &:hover {
    color: $primary;

    .arrowTitle {
      color: $primary;
    }
  }
}

.listItems {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.navBackLink {
  display: flex;
  justify-items: center;
  color: $gray;
  margin-bottom: 24px;

  & p {
    line-height: 24px;
  }
  &:hover {
    color: $primary;

    .chevronBack {
      color: $primary;
    }
  }

  @media (max-width: $mobile) {
    margin-bottom: 36px;
  }
}

.chevronBack {
  transform: rotate(90deg);
}

.category {
  display: flex;
  align-items: center;
  font-size: 23px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: -0.46px;

  & img {
    margin-right: 12px;
    opacity: 0;
    transition: $transition-default;
  }
}

.arrowOpened {
  transform: rotate(90deg);
}
</style>
