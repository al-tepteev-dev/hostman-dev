<template lang="pug">
p(v-if="!!message.length", :class="$style.danger") {{ message[0] }}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TwInputHelp",

  props: {
    message: {
      type: Array as () => Array<string>,
      default: null,
    },
  },
});
</script>

<style lang="scss" module>
.danger {
  color: $danger;
  font-size: 13px;
}
</style>
