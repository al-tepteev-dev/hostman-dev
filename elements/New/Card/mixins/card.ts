import mixins from "vue-typed-mixins";
import type { CardHrefType } from "@/types/CardNew";
import type { ColorSubtitle, SizeTitle } from "@/types/Typography";
import type { Header } from "@/types/Header";

type BackgroundType = "primary" | "secondary";
type ImageType = "background" | "absolute-bottom";
type SizeSubtitle = "body2";

export default mixins({
  props: {
    background: {
      type: String as () => BackgroundType,
      default: "primary",
    },
    classCard: {
      type: String,
      default: "",
    },
    classContent: {
      type: String,
      default: "",
    },
    classImage: {
      type: String,
      default: "",
    },
    classImageBackground: {
      type: String,
      default: "",
    },
    classSlot: {
      type: String,
      default: "",
    },
    classTextContent: {
      type: String,
      default: "",
    },
    colorSubtitle: {
      type: String as () => ColorSubtitle,
      default: "secondary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Object as () => Header,
      default: () => undefined,
    },
    hasMobileImage: {
      type: Boolean,
      default: true,
    },
    href: {
      type: String,
      default: "",
    },
    hrefAsButtonOnHover: {
      type: Boolean,
      default: false,
    },
    hrefTarget: {
      type: String,
      default: "_self",
    },
    hrefTitle: {
      type: String,
      default: "",
    },
    hrefTitleOnHover: {
      type: String,
      default: "",
    },
    hrefType: {
      type: String as () => CardHrefType,
      default: "link",
    },
    hoverable: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    isAbsolutePathImage: {
      type: Boolean,
      default: false,
    },
    imageHeight: {
      type: String,
      default: "",
    },
    imageType: {
      type: String as () => ImageType,
      default: "background",
    },
    isFixedWidth: {
      type: Boolean,
      default: false,
    },
    isOverflowHidden: {
      type: Boolean,
      default: true,
    },
    sizeTitle: {
      type: String as () => SizeTitle,
      default: "h2",
    },
    sizeSubtitle: {
      type: String as () => SizeSubtitle,
      default: "body2",
    },
    weightTitle: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      hovered: false,
    };
  },

  computed: {
    classBackground() {
      return this.background === "primary" ? `${this.$style.backgroundPrimary}` : `${this.$style.backgroundSecondary}`;
    },
    currentHrefTitle() {
      return (this.hovered && !this.isHrefTypeButtonOnHover && this.hrefTitleOnHover) || this.hrefTitle;
    },
    classSubtitle() {
      return this.colorSubtitle === "primary" ? "nd-text-primary" : "nd-text-secondary";
    },
    isCardDisabled() {
      return this.disabled || (this.hrefTitle && !this.href);
    },
    isHoverable() {
      return this.hoverable || !!this.href;
    },
    isHrefTypeButtonOnHover() {
      return this.hrefType === "button-on-hover";
    },
    isHrefTypeButton() {
      return this.hovered && this.isHrefTypeButtonOnHover;
    },
    isImageAbsoluteBottom() {
      return this.image && this.imageType === "absolute-bottom";
    },
    isImageBackground() {
      return this.image && this.imageType === "background";
    },
  },

  methods: {
    onClick(event: MouseEvent) {
      this.$emit("click-card", event, this.id);
    },
  },
});
