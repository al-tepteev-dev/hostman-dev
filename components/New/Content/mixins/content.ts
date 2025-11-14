import mixins from "vue-typed-mixins";
import type { Header } from "@/types/Header";
import type { ColorSubtitle, SizeTitle } from "@/types/Typography";

type HeaderMarginSize = "0" | "24" | "32" | "48";

export default mixins({
  props: {
    colorSubtitle: {
      type: String as () => ColorSubtitle,
      default: "secondary",
    },
    header: {
      type: Object as () => Header,
      default: () => ({}),
    },
    headerMarginSize: {
      type: String as () => HeaderMarginSize,
      default: "32",
    },
    headerJustify: {
      type: String as () => "space-between" | "center",
      default: "space-between",
    },
    sizeTitle: {
      type: String as () => SizeTitle,
      default: "h2",
    },
  },

  computed: {
    classSubtitle() {
      return this.colorSubtitle === "primary" ? "nd-text-primary" : "nd-text-secondary";
    },
  },
});
