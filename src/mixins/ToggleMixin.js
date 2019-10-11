export const ToggleMixin = {
  data() {
    return {
      updateForm: true,
    };
  },
  methods: {
    toggleVar(varName) {
      this[varName] = !this[varName];
    },
  },
};
