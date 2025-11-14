<script lang="ts">
import Vue from "vue";
import { Context } from "@nuxt/types";

export default Vue.extend({
  name: "R",

  asyncData(ctx: Context) {
    const accountId = ctx.params.id;
    if (accountId) {
      ctx.redirect(
        301,
        `/?utm_source=${encodeURIComponent(accountId)}&utm_medium=hostman&utm_campaign=hostman-bring-a-friend`
      );
    } else {
      ctx.redirect(301, "/");
    }
  },
});
</script>
