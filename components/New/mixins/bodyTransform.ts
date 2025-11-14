import mixins from "vue-typed-mixins";

const CLASS_BODY = "bodyOverflowHidden";
const ID_BACKDROP = "backdrop";

export default mixins({
  methods: {
    toggleBodyBackdrop(active = false) {
      if (!document || !document.body) {
        return;
      }
      const backdrop = document.getElementById(ID_BACKDROP);
      if (active && !backdrop) {
        // add backdrop
        const backdrop = document.createElement("div");
        backdrop.id = ID_BACKDROP;
        document.body.appendChild(backdrop);
      } else if (!active && backdrop) {
        // remove backdrop
        document.body.removeChild(backdrop);
      }
    },
    toggleBodyScroll(active = false) {
      if (!document || !document.body) {
        return;
      }
      if (active && document.body.classList.contains(CLASS_BODY)) {
        document.body.classList.remove(CLASS_BODY);
      } else if (!active && !document.body.classList.contains(CLASS_BODY)) {
        document.body.classList.add(CLASS_BODY);
      }
    },
  },
});
