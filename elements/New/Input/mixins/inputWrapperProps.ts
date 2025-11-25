import mixins from "vue-typed-mixins";

export default mixins({
  props: {
    label: {
      type: String,
      default: null,
    },
    errors: {
      type: Array as () => string[],
      default: () => [],
    },
  },
});
