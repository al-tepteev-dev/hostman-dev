<template>
  <section class="section">
    123
    <!--    <div class="content">-->
    <!--      <div :class="$style.authorCardsList">-->
    <!--        <div :class="[$style.authorCard, $style.becomeAuthor]" @mouseover="becomeAuthorImg = becomeAuthorImgHover">-->
    <!--          <div :class="[$style.authorCardInner, $style.becomeAuthorInner]">-->
    <!--            <img :src="getDynamicAsset(becomeAuthorImg)" alt="Become an Author" :class="$style.becomeAuthorAvatar" />-->
    <!--            <div>-->
    <!--              <p :class="$style.becomeAuthorDetails"></p>-->
    <!--              <nuxt-link-->
    <!--                :class="$style.becomeAuthorLink"-->
    <!--                to="/blog/pishi-pomogaj-poluchaj-dengi-prihodite-k-nam-pisat-gajdy-po-devopsu-i-razrabotke"-->
    <!--              >-->
    <!--              </nuxt-link>-->
    <!--              <tw-button :class="$style.becomeAuthorButton" expanded @click="$refs.modal.isModalActive = true"-->
    <!--                >Стать автором-->
    <!--              </tw-button>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div-->
    <!--          v-for="author in authorsWithArticles"-->
    <!--          :key="author.id"-->
    <!--          :class="$style.authorCard"-->
    <!--          @click="$router.push('/tutorials/authors/' + author.path)"-->
    <!--          @auxclick="onAuxClick($event, '/tutorials/authors/' + author.path)"-->
    <!--          @mousedown="onMouseDown"-->
    <!--        >-->
    <!--          <div :class="$style.authorCardInner">-->
    <!--            <img :src="getAvatar(author.avatar)" :alt="author.name" :class="$style.authorAvatar" />-->
    <!--            <div>-->
    <!--              <p :class="$style.authorName">{{ author.name }}</p>-->
    <!--              <p :class="$style.authorDetails">{{ author.details }}</p>-->
    <!--              <div :class="$style.authorArticles">-->
    <!--                {{-->
    <!--                  author.tutorials.length +-->
    <!--                  author.news.length +-->
    <!--                  " · " +-->
    <!--                  getDeclension(author.tutorials.length + author.news.length, ["Статья", "Cтатьи", "Статей"])-->
    <!--                }}-->
    <!--              </div>-->
    <!--            </div>-->

    <!--            <nuxt-link :class="$style.authorLink" :to="'/tutorials/authors/' + author.path"-->
    <!--              >Читать статьи автора-->
    <!--            </nuxt-link>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <modal-form-author ref="modal"></modal-form-author>-->
    <!--    </div>-->
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthorsApiService } from "@/services/authors/authorsApi";
import TwButton from "@/elements/TwButton/index.vue";
import getDeclension from "@/mixins/getDeclension";
import ModalFormAuthor from "@/components/ModalFormAuthor/index.vue";
import { ProductPages } from "@/types/ProductPage";
import getPageMeta from "@/mixins/getPageMeta";
import getDynamicAsset from "@/mixins/getDynamicAsset";

export default Vue.extend({
  name: "AuthorIndex",
  components: { ModalFormAuthor, TwButton },
  mixins: [getDeclension, getPageMeta, getDynamicAsset],

  data: () => ({
    authorsList: [],
    isLoading: true,
    becomeAuthorImg: "images/become-author.png",
    becomeAuthorImgHover: "images/become-author-hover.png",
  }),
  async fetch() {
    this.authorsList = await AuthorsApiService.getAuthorsList();
  },
  head() {
    return {
      ...this.getPageMeta({
        title: this.$store.state.productPages.pages[ProductPages.AUTHORS_PAGE].seo_title || "Hostman Authors",
        description:
          this.$store.state.productPages.pages[ProductPages.AUTHORS_PAGE].seo_description || "Hostman Authors.",
        keywords: this.$store.state.productPages.pages[ProductPages.AUTHORS_PAGE].seo_keywords,
        host: process.env.BASE_URL_SITE + this.$route.path,
      }),
    };
  },
  computed: {
    authorsWithArticles() {
      return this.authorsList
        .filter((author) => author.news.length > 0 || author.tutorials.length > 0)
        .sort((a, b) => b.news.length + b.tutorials.length - (a.news.length + a.tutorials.length));
    },
  },
  methods: {
    getAvatar(assetUrl) {
      const params = "fit=cover&width=200&height=200";
      return `${process.env.BASE_URL_CONTENT}/assets/${assetUrl}?${params}`;
    },
    onAuxClick(event, link) {
      if (event.button === 1 && event.target.closest("a") === null) {
        window.open(link, "_blank");
      }
    },
    onMouseDown(event) {
      if (event.button === 1) {
        event.preventDefault();
      }
    },
  },
});
</script>

<style lang="scss" module>
.authorCardsList {
  display: grid;
  grid-template-columns: 320px 320px 320px;
  grid-gap: 24px;

  @media (max-width: $mobile) {
    grid-template-columns: auto;
    grid-gap: 16px;
  }
}

.authorArticles {
  width: fit-content;
  font-family: $font-family-regular;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #f5f6f8;
  color: $gray;
  margin: 0 auto 32px;

  @media (max-width: $mobile) {
    font-size: 12px;
    line-height: 20px;
    padding: 4px 10px;
    margin: 0;
  }
}

.authorCard {
  text-align: center;
  cursor: pointer;
  padding: 64px 0 48px;
  border-radius: 8px;
  border: 1px solid #ebedf0;

  @media (max-width: $mobile) {
    text-align: left;
    padding: 24px;
  }

  &:hover {
    background: $background-light-color;

    .authorArticles {
      background: white;
    }
  }
}

.becomeAuthor {
  cursor: initial;
  grid-column-start: 3;
  grid-row-start: 1;
  padding: 64px 32px 32px 32px;

  @media (max-width: $mobile) {
    grid-column-start: 1;
    grid-row-start: 3;
    padding: 24px;
  }
}

.becomeAuthorAvatar {
  width: 120px;
  height: 120px;
  margin-bottom: 32px;

  @media (max-width: $mobile) {
    width: 88px;
    height: 88px;
    margin-bottom: 16px;
  }
}

.becomeAuthorDetails {
  font-family: $font-family-regular;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 12px !important;
  color: $gray;

  @media (max-width: $mobile) {
    margin-bottom: 8px;
  }
}

.becomeAuthorButton {
  margin-top: 35px;
  border-radius: 8px;

  @media (max-width: $mobile) {
    margin-top: 16px;
  }
}

.authorCardInner {
  display: grid;
  justify-items: center;
  align-items: center;

  @media (max-width: $mobile) {
    grid-template-columns: min-content max-content;
    grid-gap: 16px;
    align-items: start;
  }
}

.becomeAuthorInner {
  @media (max-width: $mobile) {
    display: block;
  }
}

.authorAvatar {
  width: 120px;
  height: 120px;
  border-radius: 1000px;
  margin-bottom: 32px;

  @media (max-width: $mobile) {
    width: 88px;
    height: 88px;
    margin-bottom: 0;
  }
}

.authorName {
  font-family: $font-family-medium;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-bottom: 7px !important;

  @media (max-width: $mobile) {
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 2px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 180px;
  }
}

.authorDetails {
  font-family: $font-family-regular;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 24px !important;
  color: $gray;

  @media (max-width: $mobile) {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 10px !important;
  }
}

.authorLink {
  @media (max-width: $mobile) {
    grid-column: 1/3;
    justify-self: start;
  }
}
</style>
