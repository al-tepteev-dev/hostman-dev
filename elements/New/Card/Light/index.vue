<template>
  <div :class="[$style.cardLightCore, classCard]">
    <div :class="[$style.cardLightContent, classContent]">
      <div v-if="header" :class="$style.cardLightTextContent">
        <div class="body1 semibold" v-html="header.title" />

        <div class="body2 nd-text-secondary" v-html="header.subtitle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import card from "../mixins/card";

export default Vue.extend({
  name: "NewCardLight",

  mixins: [card],

  computed: {},
});
</script>

<style lang="scss" module>
.cardLightCore {
  padding: 0;
}

.cardLightContent {
  display: grid;
}

.cardLightTextContent {
  display: grid;
  gap: 16px;
  text-align: center;
}
</style>
