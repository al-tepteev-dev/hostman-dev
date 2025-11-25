import mixins from "vue-typed-mixins";
import inputWrapperProps from "./inputWrapperProps";

export default mixins(inputWrapperProps).extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: "",
    },
    isAutoFocus: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Boolean],
      required: true,
    },
  },
  mounted() {
    if (this.isAutoFocus && this.$refs.input) {
      this.$refs.input.focus();
    }
  },
  methods: {
    onInput(event: Event) {
      this.$emit("input", (event.target as HTMLInputElement).value);
    },
    onChange(event: Event) {
      this.$emit("change", (event.target as HTMLInputElement).value);
    },
    onFocus(event: Event) {
      this.$emit("focus", (event.target as HTMLInputElement).value);
    },
    onBlur(event: Event) {
      this.$emit("blur", event.target as HTMLInputElement);
    },
  },
});
